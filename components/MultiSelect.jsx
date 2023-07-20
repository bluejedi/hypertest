import { text } from 'hyperapp'
/*
<input class="form-input" type="text" placeholder="" value=""
                    //oninput= {(_,e) => load(`http://localhost:5000/api/genres/?name=${e.target.value}`, field.actions)}
    oninput = {(state, e) => { return [
        { ...state,
            loading: true, //mandatory
            //gitems: gitems,
        },
        load(`http://localhost:5000/api/genres/?name=${e.target.value}`, field.act)
      ]}}
/>*/

const load= (url, act) => {
    //console.log(act);
    return dispatch => { 
      fetch(url)
      .then(response => response.json())
      .then(data => dispatch([act, {response: data}]))
    }
};

// from  @sergey-shpak sergey-shpak/hyperapp-stateful-component-example.js
// https://gist.github.com/sergey-shpak/dffb81833fa060ec81d5830a9a039f82

const Stateful = (Component, state) => 
 Component.bind(state || Component.state || {})

// function loadz(url){
//     //console.log(act);
//     //return dispatch => { 
//       fetch(url)
//       .then(response => response.json())
//       .then(data => update({response: data}))
//     //}
// };

function onFocus(state){
  //console.log('focus')
  this.focused = true
  return { ...state }
}

function onBlur(state){
  //console.log('blur')
  this.focused = false
  return { ...state }
}

// function onInput(state, e){
//   console.log('input')
//   this.value =  e.target.value
//   loadz(`http://localhost:5000/api/genres/?name=${e.target.value}`, update)
//   return { ...state }
// }

function Input(props, children){
  return h('div', {class:"has-icon-left"}, [
    h('input', {
      class: "form-input", type: "text",  
      onfocus: onFocus.bind(this),
      onblur: onBlur.bind(this),
      oninput: props.onInput.bind(this),
      //update: update.bind(this),
      value: this.value
    }),
    this.loading && h('i', {class:"form-icon loading"})
  ])
}
let citems = []

function Ilist(props, children) {
    return <ul class="menu">
    { citems.map(v => 
      <li class="menu-item" data-id={v.id}><button type="buton" class="btn btn-block bg-secondary btn-link text-left" onclick = {(_, e) => {
            e.preventDefault();
            //console.log(e);
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

// Exposing initial component state
Input.state = { focused: false, value:"", loading: false, itemz:[] }

const InputBox1 = Stateful(Input, {focused: true, value: "", loading: false, itemz:[{id: 1, name: 'hc'},{id: 2, name: 'gb'}]})

const MultiSelect = ({label, field, action, act}) =>
    <div class="form-group">
      <div class="form-autocomplete">
        <div class="form-autocomplete-input form-input is-focused">
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
              
                {h(InputBox1, {focused: true, value:"",
                    onInput: function (state, e) { this.loading= true; this.value = e.target.value; return [
                        { ...state,
                            loading: true, //mandatory
                            //gitems: gitems,
                        },
                        load(`${field.url}=${e.target.value}`, (state, {response}) => { 
                            //console.log(state);
                            citems = response.results
                            this.loading = false; return ({
                            ...state}
                        )})
                      ]} 
                })}
                
        </div>
        {h(Ilist, {valz: field.value, actionz: action})}
      </div>
    </div>

export default MultiSelect