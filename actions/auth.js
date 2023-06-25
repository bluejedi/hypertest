import updateField from './forms.js';
import { onUrlChange, onUrlRequest, pushUrl } from "@shish2k/hyperapp-navigation";

const auth = {
  login: g_actions => (state, actions) => [
    {...state, loading: true},
    dispatch => {                           // <---
      fetch(g_urls.login, {
        method: 'POST',
        //mode: "no-cors",
        body: JSON.stringify({
          username: state.auth.forms.login.username,
          password: state.auth.forms.login.password,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => dispatch([auth.updateLogin, {key: data.key, username: state.auth.forms.login.username}])) // <---
    }],

  logout: g_actions => (state, actions) => [
    {...state, loading: true},
    dispatch => {
      fetch(g_urls.logout, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => dispatch([auth.updateLogin, {key: null, username: null}]))
    }],

  updateLogin: (state, {key, username}) => [{
    ...state,
    loading: false,
    auth: {...state.auth, 
      key,
      username
    }}, 
    localStorage.setItem("auth", JSON.stringify({key, username})),
    pushUrl('/')
  ],

  updateField
}

export default auth;
