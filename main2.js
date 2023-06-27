import { h, text, app } from "hyperapp";
import { onUrlChange, onUrlRequest, pushUrl } from "@shish2k/hyperapp-navigation";
import state from './state.js';
//import actions from './actions';
//import updateField from './actions/forms.js';
import Login from './views/Login.jsx'; 
import Home from './views/Home.jsx';
import Movies from './views/Movies.jsx';
import SimpleFilterTableView from './views/SimpleFilterTableView.jsx';
import People from './views/People.jsx';
import DebugContainer from './components/DebugContainer.jsx';
import ToastContainer from './components/ToastContainer.jsx';
import auth from './actions/auth.js';

const okClick = (_, event) => {
  event.preventDefault(); 
  return [auth.logout, auth]
}

// Define the different pages for our app
const NavBar = (props) => (
    h("ul", {class: "tab tab-block"}, [
        h("li", {class: "tab-item"}, h("a", {href: "/"}, text("Home"))),
        h("li", {class: "tab-item"}, h("a", {href: "/movies"}, text("Movies"))),
        h("li", {class: "tab-item"}, h("a", {href: "/genres"}, text("Genres"))),
        h("li", {class: "tab-item"}, h("a", {href: "/people"}, text("People"))),
        h("li", {class: "tab-item"}, h("a", {href: "/jobs"}, text("Jobs"))),
        //h("li", {class: "tab-item"}, h("a", {href: "/login"}, text("Login"))),
        state.auth.key ? (h("div", {}, [
            h("span", {class: "chip"}, text(state.auth.username)),
            h("button", {class: "btn", onclick: props.onlogout}, text("Logout"))]))
            : h("li", {class: "tab-item"}, h("a", {href: "/login"}, text("Login")))
        
        //h("li", {class: "tab-item"}, h("a", {href: "https://shish.io"}, text("External links are still external"))),
    ])
);

const FourOhFour = ({key, title}) => (state) => (
    h("main", {}, [
        h("h1", {}, text(`This is the default page, because there is no handler for "${state.url.pathname}"`)),
        NavBar(),
    ])
);

const updateEdit= (state, items) => ({
  ...state,
  [key]: {...state[key],
    forms: {...state[key].forms,
  //forms: Object.assign({}, state['forms'], {
    edit: items
  }}
  //})
});

// This 1:1 mapping of paths to pages is a super-simple approach, where our
// onUrlChange handler simply sets state.url to the url. You could do more
// complicated pattern matching and variable extraction in onUrlChange, but
// this is just a demo.
const routes = {
    "/": Home,
    "/movies": Movies,
    "/people": People,
    "/genres": SimpleFilterTableView(state, {key: "genres", title: "Genres", actions: {updateEdit}}),
    "/jobs": SimpleFilterTableView(state, {key: "jobs", title: "Jobs", actions: {updateEdit}}),
    "/login": Login,
    "404": FourOhFour,
};

//const viewz = (state) => ((routes[state.url.pathname] ?? routes["404"])(state));
const viewz = (state, props) => (
    h("main", {className: "container grid-xl p-2"}, [
       //NavBar({onlogout: okClick}),
       h("main", {className: "p-2"}, [
            (routes[state.url.pathname] ?? routes["404"])(state, props),
       ]),
        ToastContainer({toasts: state.toasts}),
       h("hr", {}), DebugContainer({state})
       //h("div", {class: "debug"}, h("div", {class: "scroll"}, DebugContainer({state})))         

    ])
);

// const update= (state, {key, response, current, page}) => ({
//     ...state,
//     loading: false,
//     [key]: {...state[key],
//       loading: false,
//       page,
//       current,
//       //url: current,
//       count: response.count,
//       next: response.next,
//       previous: response.previous,
//       items: response.results
//     }    
//   });

const update=(state, {key, response, current, page}) => {
    console.log(key);
    return ({
    ...state,
    loading: false,
    [key]: {...state[key],
      loading: false,
      page,
      current,
      //url: current,
      count: response.count,
      next: response.next,
      previous: response.previous,
      items: response.results
    }    
  });
}

const ouc = (state, url) => [
    { ...state, url: url },
    dispatch => {                           // <---
      fetch(window.g_urls[url.pathname.slice(1)])
      .then(response => response.json())
      .then(data => dispatch([update, {key:url.pathname.slice(1), response: data, current: window.g_urls[state.url.pathname], page: 1}])) // <---
    }
  ];

// const ouc = (state, url) => [
//     { ...state, url: url },
//     //load('http://localhost:5000/api' + url.pathname, url.pathname.slice(1))
// ];

const our = (state, location) => [
    state, 
    //load('http://localhost:5000/api' + location.pathname, location.pathname.slice(1)),
    pushUrl(location.pathname)
];

// Create the app()
app({
    init: state,
    //view: (state) => (routes[state.url.pathname] ?? routes["404"])(state),
    view: viewz,
    subscriptions: state => [
        onUrlChange(ouc),
        onUrlRequest(our),
    ],
    node: document.getElementById("app"),
});