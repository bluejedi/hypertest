import './style.css'
import hyperappLogo from './hyperapp.svg'
import { app } from 'hyperapp'
import html from  'hyperlit'

const view = state => html`
    <div id="app">
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
        <img src="${hyperappLogo}" class="logo vanilla" alt="JavaScript logo" />
      </a>
      <h1>Hello Hyperapp</h1>
      <div class="card">
        <h1>${state}</h1>
        <button onclick=${state => state - 1}>-</button>
        <button onclick=${state => state + 1}>+</button>
      </div>
      <p class="read-the-docs">
        Click on the Vite logo to learn more
      </p>      
    </div>
  `
app({
  init: 0,
  view: view,
  node: document.getElementById('app')
})    

//setupCounter(document.querySelector('#counter'))
