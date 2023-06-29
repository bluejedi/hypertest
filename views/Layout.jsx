// import { h, text } from "hyperapp"
import auth from '../actions/auth.js';

const okClick = (_, event) => {
  event.preventDefault(); 
  return [auth.logout, auth]
}

const Viewz = (props, content) => <div>
    
    <header class="navbar">
      <section class="navbar-section">
        <h1 class="navbar-brand text-bold mr-2">JAV HUB</h1>
      </section>
      <section class="navbar-center">        
        <a href="/" class="btn btn-link"> Home</a>
        <a href="/movies" class="btn btn-link"> Movies</a>
        <a href="/genres" class="btn btn-link"> Genres</a>
        <a href="/people" class="btn btn-link"> People</a>
        <a href="/jobs" class="btn btn-link"> Jobs</a>
      </section>
      <section class="navbar-section"></section>
    </header>
    <section class="profile">
    {props.key?<details class="accordion">
        <summary class="accordion-header">            
            <span class="chip"><figure class="avatar mr-2" data-initial="A"></figure>{props.username}</span>
            <i class="icon icon-arrow-right mr-1"></i>
        </summary>
        <div class="accordion-body p2 mx-2">
        <ul class="menu text-left">
            
            <li class="divider" data-content="Menu"></li>
            <li class="menu-item">
                <a href="#" onclick={okClick}>
                  <i class="icon icon-apps"></i> Settings
                </a>
            </li>
            <li class="menu-item">
                <a href="#" onclick={okClick}>
                  <i class="icon icon-link"></i> Logout
                </a>
            </li>
            </ul>
        </div>
        </details>
    :
        <details class="accordion">
        <summary class="accordion-header">            
            <span class="chip"><figure class="avatar mr-2" data-initial="G"></figure>Guess</span>
            <i class="icon icon-arrow-right mr-1"></i>
        </summary>
        <div class="accordion-body p2 mx-2">
        <ul class="menu text-left">
            
            <li class="divider" data-content="Menu"></li>
            <li class="menu-item">
                <a href="/register" >
                  <i class="icon icon-link"></i> Register
                </a>
            </li>
            <li class="menu-item">
                <a href="/login" >
                  <i class="icon icon-link"></i> Login
                </a>
            </li>
            </ul>
        </div>
        </details>}        
    
    </section>

    {content}
</div>

export default Viewz;
