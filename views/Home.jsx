//import { h } from "hyperapp"
import Viewz from "./Layout.jsx"

const Home = (state, actions) => 
<Viewz key={state.auth.key} username={state.auth.username}>
    
    <div key='home' class="hero hero-lg bg-gray">
      <div class="hero-body">
        <h1>Home</h1>
        <p>There's no place like localhost</p>
        {state.auth.key?<span>Hello, {state.auth.username}!</span>:<span>Please login to edit things</span>}
      </div>
    </div>
</Viewz>

export default Home
