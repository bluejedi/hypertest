//import { h } from "hyperapp"
import { Spinner } from '../components/Spinners.jsx';

import Table from '../components/Table.jsx';
import ModalForm from '../components/ModalForm.jsx';
import SearchForm from '../components/SearchForm.jsx';
import { mergeValuesErrors } from '../util/forms.js';
import { checkAuth } from '../util/auth';
import Viewz from "./Layout.jsx";
import actions from "../actions/index.js";
import MultiSelect from '../components/MultiSelect.jsx'



const load= (url, key) => (state, actions) => { return [
    //{...state, loading: true, url: window.location},
    {...state, loading: true},
    dispatch => {
      fetch(url)
      .then(response => response.json())
      .then(data => dispatch([update, {key, response: data, current: url, page: 1}])) // <---
    }
  ]};

const changePage=(next, key)=>{
  return dispatch=>load(next, key);
}

const  updateG= ({response, current, page}) => state => ({
    ...state,
    loading: false,
    page,
    current,
    count: response.count,
    next: response.next,
    previous: response.previous,
    items: response.results
  })

// const updateEdit= (key, row) => (state) => {
//   //console.log()
//   let forms = state[key].forms; 
//   forms.edit = row;
//   console.log(state[key].forms.edit);
// return ({
//   ...state,
//   loading: true,
//   [key]: {...state[key],
//     forms: {...state[key].forms}},
//     edit: forms.edit
// })};


const saveEditz= (url, key) => (state, actions) => [
  {...state, loading: true, url: window.location},
  dispatch => {                           // <---
    fetch(url)
    .then(response => response.json())
    .then(data => dispatch([update, {key, response: data, current: url, page: 1}])) // <---
  }
];

const reset = (state, key) => [
  {...state,
    loading: true,
    [key]: {...state[key],
      forms: {...state[key].forms,
      search: {}}}
  },
  dispatch => {                           // <---
    fetch(window.g_urls[key])
    .then(response => response.json())
    .then(data => dispatch([update, {key, response: data, current: window.g_urls[key], page: 1}])) // <---
  }
];

const update= (state, {key, response, current, page}) => { //console.log(response); 
  return ({
  ...state,
  loading: false,
  [key]: {...state[key],
    // forms: {...state[key].forms,
    // search: {}},
    loading: false,
    page,
    current,
    count: response.count,
    next: response.next,
    previous: response.previous,
    items: response.results
  }    
})};

const updateSave= (state, response) => ({
  ...state,
  loading: false,
  [state.ukey]: {...state[state.ukey],
    loading: false,
    page: 1,
    current: 'u',
    count: response.count,
    next: response.next,
    previous: response.previous,
    items: response.results
  }    
});

const updateEdit= (key, row) => (state) => {
  //console.log()
  let forms = state[key].forms; 
  forms.edit = row;
  console.log(state[key].forms.edit);
return ({
  ...state,
  loading: true,
  [key]: {...state[key],
    forms: {...state[key].forms}},
    edit: forms.edit
})};

const filter=(state, key)=>{
  //state[key.forms].search.map
  //console.log(state[key].forms.search);
  let params = Object.keys(state[key].forms.search).map(function(k, v) {
      //console.log(state[key].forms.search[k]);
      return state[key].forms.search[k] !='' && encodeURIComponent(k) + '=' + encodeURIComponent(state[key].forms.search[k])
  }).join('&');
  //console.log(params);
  //actions.load(state.current.split('?')[0]+'?'+params);
  return dispatch=>load(window.g_urls[key] + '?' + params, key);
}

export const fetchEffect = (dispatch, props) => {
  return fetch(props.url, props.options)
  .then(response => { if (!response.ok) { throw response } return response })
  .then(response => { return response[props.response](); })
  .then(result => { dispatch(props.action, result); })
  // .catch(error => {
  //   if (props.errorResponse) {
  //     console.log(props.errorResponse);
  //     return error[props.errorResponse]()
  //       .then(result => {
  //         dispatch(props.error, result);
  //       })
  //       .catch(error => {
  //         dispatch(props.error, error);
  //       })
  //   } else {
  //     dispatch(props.error, error);
  //   }
  // })
}

export const assign = (source, assignments) => {
  var result = {},
    i;
  for (i in source) result[i] = source[i];
  for (i in assignments) result[i] = assignments[i];
  return result
}

export const Http = (props) => {
  console.log(props);
  return [
    fetchEffect,
    assign(
      {
        options: {},
        response: "json",
        error: props.action
      },
      props
    )
  ]
}

export const addErrors= ({formname, errors}) => state => {
  //console.log("Add errors ", errors );
  return {
    forms: Object.assign({}, state.forms,  {
        [formname]: Object.assign({}, state.forms[formname], {
            errors
        })
    })
  }
}

export const FormError = (state, { errors }) => ({ ...state, inProgress: false, errors });
    
const submitz = (state, {url, key}) => {
  //console.log(item);
  let item = state[key].forms.edit;

  for(var k in item) {
      let v = item[k];
      if(Array.isArray(v)) {
          item[k] = v.map(x=> {
              return {
                  'id': x.id,
                  //'name': x.text
                  'name': x.name
              }
          })
      }
  }

  // if (key == 'movies') item.genres = [
  //   {
  //     "id": "1",
  //     "name": "jav"
  //   },
  //   {
  //     "id": "2",
  //     "name": "ntr"
  //   }
  // ]

  let saveUrl = '';
  let method = '';
  if(item.id) { // UPDATE
      saveUrl = url+item.id+'/';
      method = 'PATCH';
      //msg = 
  } else { // CREATE
      saveUrl = url;
      method = 'POST';
  };

  return Http({
    url: saveUrl,
    options: {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    },
    errorResponse: "json",
    action: updateSave,
    error: addErrors,
  });
};

const saveEdit = ({url, key}) => (state) => 
// {
// console.log(state);
// return 
  [({
    ...state, url: window.location,
    toasts: {...state.toasts, 
    items: [...state.toasts.items, {text:"Successfully saved!", style:"success"}]},
    [key]: {...state[key],
    forms: {...state[key].forms,
    edit: null }}
  }), 
  submitz(state, {url: url, key: key})
]
//};

const loadMs= (url, act) => {
        //console.log(act);
        return dispatch => {
          //console.log(url.pathname != '/home');
          // if(url.pathname != '/' && url.pathname != '/login' && url.pathname != '/logout') {  
          fetch(url)
          .then(response => response.json())
          .then(data => dispatch([act, {key: 'movies', response: data, current: '', page: 1}])) // <---
        }//}
    };

const act = (state, {key, response, current, page}) => ({
        ...state,
        [key]: {...state[key],
        // loading: false,
        // page,
        // current,
        // count: response.count,
        // next: response.next,
        // previous: response.previous,
           gitems: response.results
        }
      })

const actDel = (state, genres) => ({
  ...state,
    [key]: {...state[key],
      forms: {...state[key].forms,
        edit: {...state[key].forms.edit,
          genres: genres
        }
      }
  }
})

// for next row filter feature
//const FilterTableView = ({key, actions, rowHeaders, rowFilters, rowColumns, formFields, title, extraViews}) => (state, actions, g_actions) => 
const FilterTableView = ({key, actions, rowHeaders, rowColumns, formFields, title, extraViews}) => (state, actions, g_actions) =>
<Viewz key={state.auth.key} username={state.auth.username}>
<div key={key}>
  <h2>
    {title || state.url.pathname} &nbsp;  &nbsp;
    {state.auth.key?<button className="btn btn-primary btn-action btn-lg" onclick={updateEdit(key, ({}))}>
      <i className="icon icon-plus"></i>
    </button>:null}
    <button className="btn btn-primary btn-action btn-lg" onclick={reset(state, key)}>
      <i className="icon icon-refresh"></i>
    </button>
  </h2>
  <div className="columns">

    <div className="column col-lg-12" oncreate={()=>load(window.g_urls[key], key)}>
      <SearchForm
        formFields={formFields && state[key].forms.search && mergeValuesErrors(formFields, state[key].forms.search, state[key].forms.search.errors)}
        // updateFieldAction={(key, value)=>actions.updateField({formname: 'search', fieldname: key, value})}
        updateFieldAction={(keyz, valuez) => ({...state,  
          [key]:{...state[key],
            //loading: true,
            forms:{...state[key].forms,
              search:{...state[key].forms.search,
                [keyz]: valuez
            }}}
        })}
        //searchAction={()=>load(window.g_urls[key] + '?name=' + state[key].forms.search.name, key)}
        searchAction={filter(state, key)}
        resetAction={reset(state, key)}
      />
      {state[key].loading == true ? <Spinner /> : <Table
        rowHeaders={checkAuth(rowHeaders, state.auth)}
        //rowFilters={checkAuth(rowFilters, state.auth)}
        rowColumns={checkAuth(rowColumns, state.auth)}
        rows={state[key]}
        actions={(row) => ({...state,  
          [key]:{...state[key],
            //loading: true,
            forms:{...state[key].forms,
              edit:row
            }}
        })}
        actionsload={changePage}
        key={key}
      />}
    </div>
  </div>

  <p>{console.log(state[key].forms.edit)}</p>
    <ModalForm
    loading={state[key].loading}
    formFields={formFields && state[key].forms.edit && 
      mergeValuesErrors(formFields
        , state[key].forms.edit
        , state[key].forms.edit.errors
        , state[key].gitems
        , (state, {response}) => ({
        ...state,
        [key]: {...state[key], gitems: response.results}})
        , key
      )}
    item={state[key].forms.edit}
    hideAction={(row) => { console.log('triggered'); return({...state,  
          [key]:{...state[key],
            //loading: true,
            forms:{...state[key].forms,
              edit:null
            }}
        })}
      }
    saveAction={()=>saveEdit({url: window.g_urls[key], key: key})}
    updateFieldAction={(keyz, value) => { //console.log(keyz); console.log(state[key].forms.edit); 
      return ({...state,  
      [key]:{...state[key],
        loading: true,
        gitems: value,
        forms:{...state[key].forms,
          edit:{...state[key].forms.edit,
        //items: {...state[key].items,
        //  [2]: {...state[key].items[2],
            [keyz]: value
        }}}
    });
      console.log('masuk engga', state[key].forms.edit);
    }}
  />
  
  {extraViews?extraViews.map( ev => ev(state, actions)):null}
</div>
</Viewz>

export default FilterTableView
