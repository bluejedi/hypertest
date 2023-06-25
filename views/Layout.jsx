// import { h, text } from "hyperapp"
import auth from '../actions/auth.js';
// import DebugContainer from '../components/DebugContainer.jsx';
// //import ToastContainer from '../components/ToastContainer.jsx';

const okClick = (_, event) => {
  event.preventDefault(); 
  return [auth.logout, auth]
}

// // Define the different pages for our app
// const NavBar = (state, props) =>
//     <ul class="tab tab-block">
//         <li class="tab-item"> <a href="/"> Home</a></li>
//         <li class= "tab-item"> <a href="/movies"> Movies</a></li>
//         <div>{state.auth.key?<div><span class="chip">{state.auth.username}</span><button class="btn">Logout</button></div>:<li class= "tab-item"><a href="/login"> Login</a></li>}</div>
//     </ul>

const Viewz = (props, content) => <div>
    <ul class="tab tab-block">
        <li class="tab-item"> <a href="/"> Home</a></li>
        <li class= "tab-item"> <a href="/movies"> Movies</a></li>
        <li class= "tab-item"> <a href="/genres"> Genres</a></li>
        <li class= "tab-item"> <a href="/people"> People</a></li>
        <li class= "tab-item"> <a href="/jobs"> Jobs</a></li>
        <div>{props.key?<div><span class="chip">{props.username}</span><button class="btn" onclick={okClick}>Logout</button></div>:<li class= "tab-item"><a href="/login"> Login</a></li>}</div>
    </ul>
    {content}
</div>

export default Viewz;
