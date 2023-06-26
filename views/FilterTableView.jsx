//import { h } from "hyperapp"
import { Spinner } from '../components/Spinners.jsx';

import Table from '../components/Table.jsx';
import ModalForm from '../components/ModalForm.jsx';
import SearchForm from '../components/SearchForm.jsx';
import { mergeValuesErrors } from '../util/forms.js';
import { checkAuth } from '../util/auth';
import Viewz from "./Layout.jsx";
import actions from "../actions/index.js";

// const updateEdit= item => state => ({
//     forms: Object.assign({}, state['forms'], {
//       edit: item
//     })
//   });

const load= (url, key) => (state, actions) => [
    {...state, loading: true},
    dispatch => {                           // <---
      fetch(url)
      .then(response => response.json())
      .then(data => dispatch([update, {key, response: data, current: url, page: 1}])) // <---
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

const searchAction= (reset) => (state) => {
  console.log(reset);
  return ({...state, url: window.location})
}

// const searchAction= (reset) => (state, actions) => {
//   if(reset) {
//       load(state.current.split('?')[0]);
//       return {
//           forms: Object.assign({}, state['forms'], {
//           search: {}
//           })
//       };
//   } else {
//       ({...state, url: window.location}),

//       {let params = Object.keys(state.forms.search).map(function(k) {
//                 return encodeURIComponent(k) + '=' + encodeURIComponent(state.forms.search[k])
//             }).join('&');
//             state.url = window.location;
//             console.log(state.current);
//             load(state.current.split('?')[0]+'?'+params)};
//   }
// };

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
        formFields={mergeValuesErrors(formFields, state[key].forms.search, null)}
        // updateFieldAction={(key, value)=>actions.updateField({formname: 'search', fieldname: key, value})}
        updateFieldAction={(keyz, value) => (state, event) => ({...state,  
                [key]:{...state[key], 
                    forms:{...state[key].forms, 
                      search:{...state[key].forms.search,
                       fieldname: keyz, value}}}
                })}
        searchAction={(reset) => (state, event) => {
          console.log(reset);
          return ({...state, url: window.location})
        }}
      />
      {state[key].loading == true ? <Spinner /> : <Table
        rowHeaders={checkAuth(rowHeaders, state.auth)}
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
    saveAction={()=>actions.saveEdit({g_actions: g_actions, key: state.auth.key})}
    updateFieldAction={(key, value)=>actions.updateField({formname: 'edit', fieldname: key, value})}
  />
  
  {extraViews?extraViews.map( ev => ev(state, actions)):null}
</div>
</Viewz>

export default FilterTableView
