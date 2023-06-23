//import { h } from "hyperapp"

const Home = (state, actions) => <div key='home'>
    <h2>Home</h2>
    {state.auth.key?<span>Hello, {state.auth.username}!</span>:<span>Please login to edit things</span>}
</div>

export default Home;
