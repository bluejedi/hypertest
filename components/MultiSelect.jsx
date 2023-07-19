//import { h } from 'hyperapp'
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

// const update = (state, {response}) => { console.log(state); return ({
//     ...state,
//     value: "ooo"
//     //"movies": {...state["movies"], gitems: response.results}}
// })}

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
  return h('input', {
      class: "form-input", type: "text",  
      onfocus: onFocus.bind(this),
      onblur: onBlur.bind(this),
      oninput: props.onInput.bind(this),
      value: this.value
    })
}

// Exposing initial component state
Input.state = { focused: false, value:"" }

const InputBox1 = Stateful(Input, {focused: true, value: ""})

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
              <div class="has-icon-left">
                {h(InputBox1, {focused: true, value:"",
                    onInput: function (state, e) { this.value = e.target.value; return [
                        { ...state,
                            loading: true, //mandatory
                            //gitems: gitems,
                        },
                        load(`http://localhost:5000/api/genres/?name=${e.target.value}`, field.act)
                      ]} 
                })}
                <i class="form-icon loading"></i>
              </div>
        </div>
        {field.gitems && <ul class="menu">
            { field.gitems.map(v => 
              <li class="menu-item" data-id={v.id}><button type="buton" class="btn btn-primary btn-block text-left" onclick = {(_, e) => {
                    e.preventDefault();
                    //console.log(e);
                    let newv = field.value.concat({id: v.id, name: v.name})
                    return action(newv)
                    //e.preventDefault();
                }}>
              <div class="tile tile-centered">
                  <div class="tile-icon"></div>
                  <div class="tile-content">
                      {v.name}
                  </div>
                </div></button></li>
              )}      
        </ul>}
      </div>
    </div>

export default MultiSelect