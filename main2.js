import { h, text, app } from "hyperapp";
import { onUrlChange, onUrlRequest, pushUrl } from "@shish2k/hyperapp-navigation";
import state from './state.js';
import actions from './actions';
//import updateField from './actions/forms.js';
import Login from './views/Login.jsx'; 
import Home from './views/Home.jsx';
import Movies from './views/Movies.jsx';
import SimpleFilterTableView from './views/SimpleFilterTableView.js';
import People from './views/People.jsx';
import DebugContainer from './components/DebugContainer.jsx';
import ToastContainer from './components/ToastContainer.jsx';

// Define the different pages for our app
const NavBar = () => (
    h("ul", {className: "tab tab-block"}, [
        h("li", {className: "tab-item"}, h("a", {href: "/"}, text("Home"))),
        h("li", {className: "tab-item"}, h("a", {href: "/movies"}, text("Movies"))),
        h("li", {className: "tab-item"}, h("a", {href: "/genres"}, text("Genres"))),
        h("li", {className: "tab-item"}, h("a", {href: "/people"}, text("People"))),
        h("li", {className: "tab-item"}, h("a", {href: "/jobs"}, text("Jobs"))),
        h("li", {className: "tab-item"}, h("a", {href: "/login"}, text("Login"))),
        //h("li", {className: "tab-item"}, h("a", {href: "https://shish.io"}, text("External links are still external"))),
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
const routes = {
    "/": Home,
    "/movies": Movies,
    "/people": People,
    "/genres": SimpleFilterTableView,
    "/jobs": SimpleFilterTableView,
    "/login": Login,
    "404": FourOhFour,
};

const viewz = (state) => (
    h("main", {className: "container grid-xl"}, [
        NavBar(),
        (routes[state.url.pathname] ?? routes["404"])(state),
        ToastContainer({toasts: state.toasts}),
        h("hr", {}),
          DebugContainer({state})
    ])
);

const ouc = (state, url) => ({ ...state, url: url });
const our = (state, location) => [state, pushUrl(location.pathname)];

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