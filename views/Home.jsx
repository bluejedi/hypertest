import { text } from "hyperapp"
import Viewz from "./Layout.jsx"

const Stateful = (Component, state) => 
 Component.bind(state || Component.state || {})

function onFocus(state){
  console.log('focus')
  this.focused = true
  return { ...state }
}

function onBlur(state){
  console.log('blur')
  this.focused = false
  return { ...state }
}

function Input(props, children){
  return [
    h('input', {
      onFocus: onFocus.bind(this),
      onBlur: onBlur.bind(this)
    }),
    h('div', {}, `Focused ${this.focused}`)
  ]
}

// Exposing initial component state
Input.state = { focused: false }

// USAGE EXAMPLE

// Init stateful component (with default state)
const InputBox1 = Stateful(Input, {})
// or you can override initial component state
const InputBox2 = Stateful(Input, {
  focused: true
})

const apy = () => h('div', {}, [
    h(InputBox1, {}),
    h(InputBox2, {}),
  ])

const Home = (state, props) => 
<Viewz key={state.auth.key} username={state.auth.username}>
    
    <div key='home' class="hero bg-gray">
      <div class="hero-body p-2">
        <h1>Home</h1>
        {h(InputBox2, {})}
        {h(InputBox1, {})}
        <apy>jjj</apy>
        <p>There's no place like localhost</p>
        {state.auth.key?<span>Hello, {state.auth.username}!</span>:<span>Please login to edit things</span>}
      </div>
    </div>
</Viewz>

export default Home
