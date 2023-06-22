//import { h } from 'hyperapp';
import Tabs from '../components/Tabs.jsx';
import { FormInput } from '../components/FormInputs.jsx';
import { Spinner } from '../components/Spinners.jsx';

//const okClick = (e, actions, g_actions) => {
const okClick = (_, e) => {
  login;
  console.log(e);
  e.preventDefault();
  return false;
};

//const updateField= ({formname, fieldname, value}) => (state, event) => ({...state, uname: value})
//{
        //console.log("Update ", formname, fieldname, value);
//        ...state,
//        uname: value
        // return {
        //     forms: Object.assign({}, state.auth.forms,  {
        //         [formname]: Object.assign({}, state.auth.forms[formname], {
        //             [fieldname]: value
        //         })
        //     })
        // }
//    };

const NavBar = (state) => <ul>
  <li><a href="/">Home</a></li>
  <li><a href="/settings">Settings</a></li>
  <li><a href="/about">About</a></li>
</ul>

//const oninput= (state, event) => ({...state, uname: event.target.value})

const login= (state) => {
    //actions.updateLoading(true);
    let data = {
      username: state.forms.login.username,
      password: state.forms.login.password,
    };
    fetch(g_urls.login, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      }
    }).then(function (r) { return r.json() }).then(function (j) {
      if(j.key) {
        console.log("OK" , j.key, state.forms.login.username )
        //actions.updateLogin({key: j.key, username: state.forms.login.username});
        //g_actions.location.go("/");
        //g_actions.toasts.add({text: "Successfully logged in!", style: "success"} )

      } else {
        //g_actions.toasts.add({text: "Error while logging in - please try again!", style: "error"})
      }
      //actions.updateLoading(false)
    })
  };

//const Login = (state, actions, g_actions) => <div key='login'>
const Login = (state, actions, g_actions) => <div className='container grid-xl' key='login'>
  <h2>Login</h2>
  <form method='POST'>
    <FormInput
      field={{key:'uname', label:'Username', value: state.uname, type:'text'}}
      action={value => (state, event) => ({...state, uname: value}) }
      />
    <FormInput
      field={{key:'pass', label:'Password', value: state.pass, type:'password'}}
      action={value => (state, event) => ({...state, pass: value}) }
    />
    {state.loading == true ? <Spinner /> : <button id='btn' name='btn' className='btn btn-primary' onclick={(_, event) => {event.preventDefault(); return [okClick, event]}}>Ok</button>}
  </form>
</div>;

export default Login;