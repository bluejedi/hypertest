import { h, text, app } from "hyperapp";
import { onUrlChange, onUrlRequest, pushUrl } from "@shish2k/hyperapp-navigation";
import state from './state.js';
import Login from './views/Login.jsx'; 
import Home from './views/Home.jsx';
import Movies from './views/Movies.jsx';
import SimpleFilterTableView from './views/SimpleFilterTableView.jsx';
import People from './views/People.jsx';
import DebugContainer from './components/DebugContainer.jsx';
import ToastContainer from './components/ToastContainer.jsx';
import auth from './actions/auth.js';
import { Http, fetchEffect, assign, FormError } from './views/FilterTableView.jsx';

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
    "/movies": Movies(state, {key: "movies", title: "Movies", actions: {updateEdit}}),
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
    ])
);

const update=(state, {key, response, current, page}) => {
    //console.log(key);
    return ({
    ...state,
    loading: false,
    ukey: key,
    toasts: {...state.toasts,
            items:[]}, 
    [key]: {...state[key],
      loading: false,
      page,
      current,
      //url: current,
      count: response.count,
      next: response.next,
      previous: response.previous,
      forms: {...state[key].forms, edit: null, search: {}},
      items: response.results
    }    
  });
}

const loadpage = (url) => {
    //console.log(url);
    return dispatch => {
      //console.log(url.pathname != '/home');
      if(url.pathname != '/' && url.pathname != '/login' && url.pathname != '/logout') {  
      fetch(window.g_urls[url.pathname.slice(1)])
      .then(response => response.json())
      .then(data => dispatch([update, {key: url.pathname == 'people' ? 'persons' : url.pathname.slice(1), response: data, current: window.g_urls[state.url.pathname], page: 1}])) // <---
    }}
}

const ouc = (state, url) => [
    { ...state,
        url: url, //mandatory
    },
    loadpage(url)
  ];

const our = (state, location) => [
    state, 
    pushUrl(location.pathname)
];

// Create the app()
app({
    init: state,
    view: viewz,
    subscriptions: state => [
        onUrlChange(ouc),
        onUrlRequest(our),
    ],
    node: document.getElementById("app"),
});