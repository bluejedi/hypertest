import { getExistingAuth } from './util/auth.js'

const genericState = {
    forms: {
      edit: null,
      search: {}
    },
    loading: false,
    page: null,
    count: 0,
    next: null,
    previous: null,
    items: []
  }

const existingAuth = getExistingAuth()

const state = {
  ukey: 'home',
  movies: Object.assign({}, genericState, {
    showPlot: false,
    forms: Object.assign({}, genericState['forms'], {
      editPeople: null
    })
  }),
  jobs: Object.assign({}, genericState),
  auth: {
    key: existingAuth.key,
    username: existingAuth.username,
    loading: false,
    forms: {
      login: {}
    }
  },
  url: window.location,
  //location: location.state,
  toasts: {
    items: []
  },
  people: Object.assign({}, genericState),
  genres: Object.assign({}, genericState)
};

export default state;