//import { h } from "hyperapp"
import Viewz from "./Layout.jsx"

const Home = (state, actions) => 
<Viewz key={state.auth.key} username={state.auth.username}>
    <div key='home'>
        <h2>Home</h2>
        <div>{state.auth.key?<div><span class="chip">{state.auth.username}</span><button class="btn">Logout</button></div>:<li class= "tab-item"><a href="/login"> Login</a></li>}</div>
        {state.auth.key?<span>Hello, {state.auth.username}!</span>:<span>Please login to edit things</span>}
    </div>
</Viewz>

export default Home
