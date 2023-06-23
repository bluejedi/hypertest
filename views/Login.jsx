//import { h } from 'hyperapp';
import Tabs from '../components/Tabs.jsx';
import { FormInput } from '../components/FormInputs.jsx';
import { Spinner } from '../components/Spinners.jsx';

//const okClick = (e, actions, g_actions) => {
const okClick = (_, e, actions, g_actions) => {
  login(g_actions);
  console.log(e);
  e.preventDefault();
  return false;
};
const API_ROOT = "/v1";
//UserSuccess = (state, { token }) => [{ ...state, user: genUser(token) }, SaveUser(genUser(token)), Redirect({ path: HOME })];

const UserSuccess = (state, { token }) => ({...state, pass: state.pass})

function httpEffect(dispatch, props) {
  return fetch(props.url, props.options)
    .then(function(response) {
      if (!response.ok) {
        throw response
      }
      return response
    })
    .then(function(response) {
      return response[props.response]()
    })
    .then(function(result) {
      dispatch(props.action, result);
    })
    .catch(function(error) {
      if (props.errorResponse) {
        console.log(props.errorResponse);
        return error[props.errorResponse]()
          .then(function(result) {
            dispatch(props.error, result);
          })
          .catch(function(error) {
            dispatch(props.error, error);
          })
      } else {
        dispatch(props.error, error);
      }
    })
}

function assign(source, assignments) {
  var result = {},
    i;
  for (i in source) result[i] = source[i];
  for (i in assignments) result[i] = assignments[i];
  return result
}

function Http(props) {
  return [
    httpEffect,
    assign(
      {
        options: {},
        response: "json",
        error: props.action
      },
      props
    )
  ]
}

const Submitting = (state) => ({ ...state, inProgress: true });

const SubmitLogin = (state) => [Submitting(state), login({ email: state.email, password: state.password })];
const login = ({ email, password }) =>
  Http({
    url: "http://localhost:8000/rest-auth/login/",
    options: {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { email, password } }),
    },
    errorResponse: "json",
    action: UserSuccess,
    //error: FormError,
  });

const NavBar = (state) => <ul>
  <li><a href="/">Home</a></li>
  <li><a href="/settings">Settings</a></li>
  <li><a href="/about">About</a></li>
</ul>

//const Login = (state, actions, g_actions) => <div key='login'>
const Login = (state, actions, g_actions) => <div className='container grid-xl' key='login'>
  <h2>Login</h2>
  <form onsubmit={(_, event) => {event.preventDefault(); return SubmitLogin}}>
    <FormInput
      field={{key:'uname', label:'Username', value: state.uname, type:'text'}}
      action={value => (state, event) => ({...state, uname: value}) }
      />
    <FormInput
      field={{key:'pass', label:'Password', value: state.pass, type:'password'}}
      action={value => (state, event) => ({...state, pass: value}) }
    />
    {state.loading == true ? <Spinner /> : <button id='btn' name='btn' className='btn btn-primary'>Ok</button>}
  </form>
</div>;

export default Login;