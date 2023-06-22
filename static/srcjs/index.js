import { h, app } from 'hyperapp';
//import { location } from '@hyperapp/router';
import actions from './actions';
import main from './views/Main.js';
import state from './state.js';
import { onUrlChange, onUrlRequest, pushUrl } from "hyperapp-navigation";

const routes = {
    "/": Home(state, actions),
    "/movies": Movies(state, actions.movies, actions),
    "/people": People(state, actions.people, actions),
    "/genres": SimpleFilterTableView({key: 'genres', title: 'Genres'})(state, actions.genres, actions),
    "/jobs": SimpleFilterTableView({key: 'jobs', title: 'Jobs'})(state, actions.jobs, actions),
    "/login": Login(state.auth, actions.auth, actions),
    "404": FourOhFour,
};

// const application = app(
//   state,
//   actions,
//   main,
//   document.getElementById('app')
// );

const application = app({
    init: state,
    view: (state) => (routes[state.url.pathname] ?? routes["404"])(state),
    subscriptions: state => [
        onUrlChange((state, url) => ({ ...state, url: url })),
        onUrlRequest((state, location) => [state, pushUrl(location.pathname)]),
    ],
    node: document.getElementById("app"),
});

//const unsubscribe = location.subscribe(application.location);

const hideToasts = () => {
  application.toasts.clear();
};

//actions.location.go('/');

//addEventListener('pushstate', hideToasts);
//addEventListener('popstate', hideToasts);
