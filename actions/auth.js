//import { updateField } from './forms.js';
//import updateField from './forms.js';


//module.exports = {

// export const  login= g_actions => (state, actions) => {
//     actions.updateLoading(true);
//     let data = {
//       username: state.forms.login.username,
//       password: state.forms.login.password,
//     };
//     fetch(g_urls.login, {
//       method: 'POST',
//       body: JSON.stringify(data),
//       headers: {
//         'content-type': 'application/json'
//       }
//     }).then(function (r) { return r.json() }).then(function (j) {
//       if(j.key) {
//         console.log("OK" , j.key, state.forms.login.username )
//         actions.updateLogin({key: j.key, username: state.forms.login.username});
//         g_actions.location.go("/");
//         g_actions.toasts.add({text: "Successfully logged in!", style: "success"} )

//       } else {
//         g_actions.toasts.add({text: "Error while logging in - please try again!", style: "error"})
//       }
//       actions.updateLoading(false)
//     })
//   };

// export const logout= g_actions => (state, actions) => {
//     actions.updateLoading(true)
//     setTimeout(() => fetch(g_urls.logout, {
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json'
//       }
//     }).then(function (r) { return r.json() }).then(function (j) {
//       actions.updateLogin({key: null, username: null});
//       g_actions.location.go("/");
//       actions.updateLoading(false)
//       g_actions.toasts.add({text: "Successfully logged out!", style: "success"})
//     }), 500);
//   };

//   export const updateLoading= loading => state => ({
//     loading
//   });

//   export const updateLogin= ({key, username}) => state => {
//     localStorage.setItem("auth", JSON.stringify({key, username}))
//     return {
//       key,
//       username,
//       forms: {
//         login: {}
//       }
//     }
//   };
//   //updateField
// //}

// export default login;

import updateField from './forms.js';


const auth = {
  login: g_actions => (state, actions) => [
    //actions.updateLoading(true);
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
    }
    // fetch(g_urls.login, {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers: {
    //     'content-type': 'application/json'
    //   }
    // }).then(function (r) { return r.json() }).then(function (j) {
    //   if(j.key) {
    //     console.log("OK" , j.key, state.forms.login.username )
    //     actions.updateLogin({key: j.key, username: state.forms.login.username});
    //     g_actions.location.go("/");
    //     g_actions.toasts.add({text: "Successfully logged in!", style: "success"} )

    //   } else {
    //     g_actions.toasts.add({text: "Error while logging in - please try again!", style: "error"})
    //   }
    //   actions.updateLoading(false)
    // })
  ],

  logout: g_actions => (state, actions) => {
    actions.updateLoading(true)
    setTimeout(() => fetch(g_urls.logout, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }).then(function (r) { return r.json() }).then(function (j) {
      actions.updateLogin({key: null, username: null});
      g_actions.location.go("/");
      actions.updateLoading(false)
      g_actions.toasts.add({text: "Successfully logged out!", style: "success"})
    }), 500);
  },
  
  updateLoading: loading => state => ({
    ...state,
    loading: loading
  }),

  updateLogin: (state, {key, username}) => [{
    ...state,
    loading: false,
    auth: {...state.auth, 
      key,
      username
    }
    
    // forms: {
    //   login: {}
    // }
    //localStorage.setItem("auth", JSON.stringify({key, username}))
    // return {
    //   key,
    //   username,
    //   forms: {
    //     login: {}
    //   }
    // }
    }, 
    localStorage.setItem("auth", JSON.stringify({key, username}))
  ],

  updateField
}

export default auth;
