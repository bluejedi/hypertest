//import { h } from "hyperapp"
import { Spinner } from '../components/Spinners.jsx';

import Table from '../components/Table.jsx';
import ModalForm from '../components/ModalForm.jsx';
import SearchForm from '../components/SearchForm.jsx';
import { mergeValuesErrors } from '../util/forms.js';
import { checkAuth } from '../util/auth';
import Viewz from "./Layout.jsx";
import actions from "../actions/index.js";



const load= (url, key) => (state, actions) => [
    {...state, loading: true, url: window.location},
    dispatch => {                           // <---
      fetch(url)
      .then(response => response.json())
      .then(data => dispatch([update, {key, response: data, current: url, page: 1}])) // <---
    }
  ];

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

const update= (state, {key, response, current, page}) => ({
    ...state,
    loading: false,
    [key]: {...state[key],
      loading: false,
      page,
      current,
      count: response.count,
      next: response.next,
      previous: response.previous,
      items: response.results
    }    
  });

const updateSave= (state, response) => ({
    ...state,
    loading: false,
    ["jobs"]: {...state["jobs"],
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
      return encodeURIComponent(k) + '=' + encodeURIComponent(state[key].forms.search[k])
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
  .catch(error => {
    if (props.errorResponse) {
      console.log(props.errorResponse);
      return error[props.errorResponse]()
        .then(result => {
          dispatch(props.error, result);
        })
        .catch(error => {
          dispatch(props.error, error);
        })
    } else {
      dispatch(props.error, error);
    }
  })
}

function httpEffect(dispatch, props) {
  return fetch(props.url, props.options)
  .then(function(response) {
    if (!response.ok) {
      throw response
    }
    return response
  })
  .then(function(response) {
    return response[props.response]()
  })
  .then(function(result) {
    dispatch(props.action, result);
  })
  // .catch(function(error) {
  //   if (props.errorResponse) {
  //     console.log(props.errorResponse);
  //     return error[props.errorResponse]()
  //       .then(function(result) {
  //         dispatch(props.error, result);
  //       })
  //       .catch(function(error) {
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
    httpEffect,
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
                  'name': x.text
              }
          })
      }
  }

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
  //toasts: {...state.toasts, 
  //items: [...state.toasts.items, {text:"Successfully saved!", style:"success"}]},
  [key]: {...state[key],
  forms: {...state[key].forms,
  edit: null }}
}), 
submitz(state, {url: url, key: key})
  // Http({
  //   url: url,
  //   options: {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(state[key].forms.edit),
  //   },
  //   errorResponse: "json",
  //   action: updateSave,
  //   error: addErrors,
  // })
]
//};

//const FilterTableView = ({key, actions, rowHeaders, rowFilters, rowColumns, formFields, title, extraViews}) => (state, actions, g_actions) => 
const FilterTableView = ({key, actions, rowHeaders, rowColumns, formFields, title, extraViews}) => (state, actions, g_actions) =>
<Viewz key={state.auth.key} username={state.auth.username}>
<div key={key}>
  <h2>
    {title || state.url.pathname} &nbsp;  &nbsp;
    {state.auth.key?<button className="btn btn-primary btn-action btn-lg" onclick={updateEdit(key, ({}))}>
      <i className="icon icon-plus"></i>
    </button>:null}
    <button className="btn btn-primary btn-action btn-lg" onclick={()=>load(window.g_urls[key], key)}>
      <i className="icon icon-refresh"></i>
    </button>
  </h2>
  <div className="columns">
    <div className="column col-lg-12" oncreate={()=>load(window.g_urls[key], key)}>
      <SearchForm
        formFields={formFields && state[key].forms.search && mergeValuesErrors(formFields, state[key].forms.search, state[key].forms.search.errors)}
        // updateFieldAction={(key, value)=>actions.updateField({formname: 'search', fieldname: key, value})}
        updateFieldActionz={(keyz, value) => ({...state,  
                [key]:{...state[key], 
                    forms:{...state[key].forms, 
                      search:{...state[key].forms.search,
                       fieldname: keyz, value}}}
                })}
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
        })
      }
      />}
    </div>
  </div>
  
    <ModalForm
    loading={state[key].loading}
    formFields={formFields && state[key].forms.edit && mergeValuesErrors(formFields, state[key].forms.edit, state[key].forms.edit.errors)}
    item={state[key].forms.edit}
    hideAction={(row) => ({...state,  
          [key]:{...state[key],
            //loading: true,
            forms:{...state[key].forms,
              edit:null
            }}
        })
      }
    saveAction={()=>saveEdit({url: 'http://localhost:5000/api/jobs/', key: key})}
    updateFieldAction={(keyz, value) => ({...state,  
      [key]:{...state[key],
        //loading: true,
        forms:{...state[key].forms,
          edit:{...state[key].forms.edit,
            name: value
        }}}
    })}
  />
  
  {extraViews?extraViews.map( ev => ev(state, actions)):null}
</div>
</Viewz>

export default FilterTableView
