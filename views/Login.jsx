//import { h } from 'hyperapp';
import Tabs from '../components/Tabs.jsx';
import { FormInput } from '../components/FormInputs.jsx';
import { Spinner } from '../components/Spinners.jsx';
import auth from '../actions/auth.js';
import Viewz from "./Layout.jsx"

const okClick = (_, event) => {
  event.preventDefault(); 
  return [auth.login, auth]
}

const NavBar = (state) => <ul>
  <li><a href="/">Home</a></li>
  <li><a href="/settings">Settings</a></li>
  <li><a href="/about">About</a></li>
</ul>

//const Login = (state, actions, g_actions) => <div key='login'>
const Login = (state, actions, g_actions) => 
<Viewz key={state.auth.key} username={state.auth.username}>
<div className='container grid-xl' key='login'>
  <h2>Login</h2>
  <form onsubmit={okClick}>
    <FormInput
      field={{key:'uname', label:'Username', value: state.auth.forms.login.username, type:'text'}}
      action={value => (state, event) => ({...state,  
        auth:{...state.auth, 
          forms:{...state.auth.forms, 
            login:{...state.auth.forms.login,
             username: value}}}
      })}
      />
    <FormInput
      field={{key:'pass', label:'Password', value: state.auth.forms.login.password, type:'password'}}
      action={value => (state, event) => ({...state,  
        auth:{...state.auth, 
          forms:{...state.auth.forms, 
            login:{...state.auth.forms.login,
             password: value}}}
      })}
    />
    {state.loading == true ? <Spinner /> : <button id='btn' name='btn' className='btn btn-primary'>Ok</button>}
  </form>
</div>
</Viewz>

export default Login;