import createAjaxFormActions from "./ajax_forms.js"
import formActions from "./forms.js"

const createViewActions = ajaxUrl => ({
  // load: url => (state, actions) => {
  //   //actions.updateLoading(true);
  //   [actions.updateLoading, true];

  //   setTimeout(() => fetch(url).then(function (r) { return r.json()}).then(function (j) {
  //     let match = url.match(/\?page=(\d+)/);
  //     let page = 1;
  //     if (match) page = 1*match[1];

  //     actions.update({response: j, current: url, page});
  //     //actions.updateLoading(false);
  //     [actions.updateLoading, false];
  //   }), 100);
  // },

  load: (url) => (state, actions) => [
    {...state, loading: true},
    dispatch => {                           // <---
      fetch(url)
      .then(response => response.json())
      .then(data => dispatch(actions.update, {response: data, current: url, page: 1})) // <---
    }
  ],

  updateLoading: (state, val) => ({
    ...state,
    loading: val
  }),

  update: ({response, current, page}) => state => ({
    ...state,
    loading: false,
    page,
    current,
    count: response.count,
    next: response.next,
    previous: response.previous,
    items: response.results
  }),

  updateEdit: item => state => ({
    forms: Object.assign({}, state['forms'], {
      edit: item
    })
  }),

  ...formActions,
  ...createAjaxFormActions(ajaxUrl)
});

export default createViewActions;
