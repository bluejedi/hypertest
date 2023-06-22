import { h, text, app } from "hyperapp";
import { onUrlChange, onUrlRequest, pushUrl } from "@shish2k/hyperapp-navigation";
import state from './state.js';
import actions from './actions';
//import updateField from './actions/forms.js';
import Login from './views/Login.jsx'; 
import Home from './views/Home.jsx';
import Movies from './views/Movies.jsx';
import DebugContainer from './components/DebugContainer.jsx';

// Define the different pages for our app
const NavBar = () => (
    h("ul", {className: "tab tab-block"}, [
        h("li", {className: "tab-item"}, h("a", {href: "/"}, text("Home"))),
        h("li", {className: "tab-item"}, h("a", {href: "/movies"}, text("Movies"))),
        h("li", {className: "tab-item"}, h("a", {href: "/genres"}, text("Genres"))),
        h("li", {className: "tab-item"}, h("a", {href: "/people"}, text("People"))),
        h("li", {className: "tab-item"}, h("a", {href: "/jobs"}, text("Jobs"))),
        h("li", {className: "tab-item"}, h("a", {href: "/login"}, text("Login"))),
        h("li", {className: "tab-item"}, h("a", {href: "https://shish.io"}, text("External links are still external"))),
    ])
);

const Root = (state) => (
    h("main", {}, [
        h("h1", {}, text("Welcome to The Thing!")),
    ])
);

const Settings = (state) => (
    h("main", {}, [
        h("h1", {}, text("Set some things for The Thing!")),
        NavBar(),
    ])
);

const About = (state) => (
    h("main", {}, [
        h("h1", {}, text("About The Thing")),
        NavBar(),
    ])
);

const FourOhFour = (state) => (
    h("main", {}, [
        h("h1", {}, text(`This is the default page, because there is no handler for "${state.url.pathname}"`)),
        NavBar(),
    ])
);

// This 1:1 mapping of paths to pages is a super-simple approach, where our
// onUrlChange handler simply sets state.url to the url. You could do more
// complicated pattern matching and variable extraction in onUrlChange, but
// this is just a demo.
// const routes = {
//     "/": Root,
//     "/Movies": Settings,
//     "/about": About,
//     //"/login": Login(state.auth, actions.auth, actions),
//     "/login": Login,
//     //"/login": Login({state, "", ""}),
//     "404": FourOhFour,
// };

const routes = {
    "/": Home,
    "/movies": Movies,
    //"/people": People,
    //"/genres": SimpleFilterTableView,
    //"/jobs": SimpleFilterTableView,
    "/login": Login,
    "404": FourOhFour,
};

const viewz = (state) => (
    h("main", {}, [
        NavBar(),
        (routes[state.url.pathname] ?? routes["404"])(state),
        h("hr", {}),
          DebugContainer({state})
    ])
);

// Create the app()
app({
    init: state,
    //view: (state) => (routes[state.url.pathname] ?? routes["404"])(state),
    view: viewz,
    subscriptions: state => [
        onUrlChange((state, url) => ({ ...state, url: url })),
        onUrlRequest((state, location) => [state, pushUrl(location.pathname)]),
    ],
    node: document.getElementById("app"),
});