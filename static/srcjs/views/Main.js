import { h } from 'hyperapp'
import { Switch, Route, NoMatch } from "@hyperapp/router";

import Home from './Home.js';
import Movies from './Movies.js';
import People from './People.js';
import SimpleFilterTableView from './SimpleFilterTableView.js';
import Login from './Login.js';
import Tabs from '../components/Tabs.js';
import ToastContainer from '../components/ToastContainer.js';
import DebugContainer from '../components/DebugContainer.js';

const routes = {
    "/": Home(state, actions),
    "/movies": Movies(state, actions.movies, actions),
    "/people": People(state, actions.people, actions),
    "/genres": SimpleFilterTableView({key: 'genres', title: 'Genres'})(state, actions.genres, actions),
    "/jobs": SimpleFilterTableView({key: 'jobs', title: 'Jobs'})(state, actions.jobs, actions),
    "/login": Login(state.auth, actions.auth, actions),
    "404": FourOhFour,
};

module.exports = (state, actions) => <div className='container grid-xl'>
  <Tabs currentLocation={state.location} auth={state.auth} actions={actions} />
  <Switch>
    <Route path="/" render={() => Home(state, actions)} />
    <Route path="/movies" render={() => Movies(state, actions.movies, actions)} />
    <Route path="/people" render={() => People(state, actions.people, actions)} />
    <Route path="/genres" render={() => SimpleFilterTableView({key: 'genres', title: 'Genres'})(state, actions.genres, actions)} />
    <Route path="/jobs" render={() => SimpleFilterTableView({key: 'jobs', title: 'Jobs'})(state, actions.jobs, actions)} />
    <Route path="/login" render={() => Login(state.auth, actions.auth, actions)} />
  </Switch>
  <ToastContainer toasts={state.toasts} actions={actions} />
  <hr />
  <DebugContainer state={state} actions={actions} />

</div>;

