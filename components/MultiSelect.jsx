//import { h } from 'hyperapp'

let citems = []
let focused = false

const onFocus = (state) => {
  console.log('focus')
  focused = true
  return { ...state }
}

const onBlur = (state) => {
  console.log('blur')
  focused = false
  return { ...state }
}

const Ilist = (props, children) => {
    return <ul class="menu">
    { citems.map(v => 
      <li class="menu-item" data-id={v.id}>
      <button type="buton" class="btn btn-block bg-secondary btn-link text-left" 
      onclick = {(_, e) => {
            e.preventDefault();
            //console.log(e);
            focused = false
            let newv = props.valz.concat({id: v.id, name: v.name})
            return props.actionz(newv)
            //e.preventDefault();
        }}>
      <div class="tile tile-centered">
          <div class="tile-icon"></div>
          <div class="tile-content">
              {v.name}
          </div>
        </div></button></li>
      )}      
    </ul>   
}

const load= (url, act) => {
    //console.log(act);
    return dispatch => { 
      fetch(url)
      .then(response => response.json())
      .then(data => dispatch([act, {response: data}]))
    }
}

let loading = false
let value = ""

const Input = (props, children) => {
  return h('div', {class:"has-icon-left"}, [
    h('input', {
      class: "form-input", type: "text",
      loading: loading,  
      onfocus: onFocus.bind(this),
      onblur: onBlur.bind(this),
      oninput: props.onInput.bind(this),
      //update: update.bind(this),
      value: value
    }),
    loading && h('i', {class:"form-icon loading"})
  ])
}

const MultiSelect = ({label, field, action}) =>
    <div class="form-group">
    <label class="form-label" for="{field.label}">{field.label}</label>
      <div class="form-autocomplete">
        <div class={`form-autocomplete-input form-input ${focused?'is-focused':''}`}>
            {field.value && field.value.map(v => 
                <span class="chip" data-id={v.id}>{v.name}
                <button type="button" class="btn btn-clear" onclick = {(_, e) => {
                    e.preventDefault();
                    //console.log(e);
                    let newval = field.value.filter(n => n.id != v.id )
                    return action(newval)
                    //e.preventDefault();
                } }
                ></button>
                </span>)}
              
                {h(Input, {value:"",
                    onInput: (state, e) => { focused=true; loading= true; value = e.target.value; 
                    return [
                        { ...state},
                        load(`${field.url}=${e.target.value}`, (state, {response}) => { 
                            //console.log(state);
                            citems = response.results
                            loading = false 
                            return ({...state})})
                      ]} 
                })}
                
        </div>
        {focused && h(Ilist, {valz: field.value, actionz: action})}
      </div>
    </div>

export default MultiSelect