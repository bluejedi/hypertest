//import { h } from "hyperapp"
import Viewz from "./Layout.jsx"

const Home = (state, actions) => 
<Viewz key={state.auth.key} username={state.auth.username}>
    <div key='home'>
        <h2>Home</h2>
        {state.auth.key?<span>Hello, {state.auth.username}!</span>:<span>Please login to edit things</span>}
    </div>
</Viewz>

export default Home
