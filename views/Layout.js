import { h, text } from "hyperapp"
import DebugContainer from '../components/DebugContainer.jsx';
//import ToastContainer from '../components/ToastContainer.jsx';

const okClick = (_, event) => {
  event.preventDefault(); 
  return [auth.logout, auth]
}

// Define the different pages for our app
const NavBar = (state, props) => (
    h("ul", {class: "tab tab-block"}, [
        h("li", {class: "tab-item"}, h("a", {href: "/"}, text("Home"))),
        h("li", {class: "tab-item"}, h("a", {href: "/movies"}, text("Movies"))),
        h("li", {class: "tab-item"}, h("a", {href: "/genres"}, text("Genres"))),
        h("li", {class: "tab-item"}, h("a", {href: "/people"}, text("People"))),
        h("li", {class: "tab-item"}, h("a", {href: "/jobs"}, text("Jobs"))),
        //h("li", {class: "tab-item"}, h("a", {href: "/login"}, text("Login"))),
        // state.auth.key ? (h("div", {}, [
        //     h("span", {class: "chip"}, text(state.auth.username)),
        //     h("button", {class: "btn", onclick: props.onlogout}, text("Logout"))]))
        //     : h("li", {class: "tab-item"}, h("a", {href: "/login"}, text("Login")))
        
        //h("li", {class: "tab-item"}, h("a", {href: "https://shish.io"}, text("External links are still external"))),
    ])
);

const Viewz = (state, content) => (
    h("main", {className: "container grid-xl p-2"}, [
        NavBar(state, {onlogout: okClick}),
        h("main", {className: "p-2"}, [
            content
        ]),
        //ToastContainer({toasts: state.toasts}),
        h("hr", {}),
          DebugContainer({state})
    ])
);

export default Viewz;
