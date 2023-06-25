import { getExistingAuth } from './util/auth.js'

const genericState = {
    loading: false,
    page: null,
    count: 0,
    next: null,
    previous: null,
    items: [],
    forms: {
      edit: null,
      search: {}
    }
  }

const existingAuth = getExistingAuth()

const state = {
  rowz: null,
  //jobs: Object.assign({}, genericState),
  jobs: {
    loading: false,
    page: null,
    count: 0,
    next: null,
    previous: null,
    items: [
        {
            "url": "http://localhost:8000/api/jobs/1/",
            "id": 1,
            "name": "blow"
        }
    ],
    forms: {
      edit: null,
      search: {}
    }
  },
  formsedit: null,
  auth: {
    key: existingAuth.key,
    username: existingAuth.username,
    loading: false,
    forms: {
      login: {}
    }
  },
  pkey: 'jobs',
  title: 'Jobs',
  uname: 'admin',
  pass: 'xxx',
  url: window.location,
  //location: location.state,
  toasts: {
    items: []
  },
  movies: Object.assign({}, genericState, {
    showPlot: false,
    forms: Object.assign({}, genericState['forms'], {
      editPeople: null
    })
  }),
  people: Object.assign({}, genericState),
  genres: Object.assign({}, genericState)
};

export default state;