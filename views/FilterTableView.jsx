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

  // const saveEdit= (url, key) => (state, actions) => [
  //   {...state, loading: true},
  //   dispatch => {                           // <---
  //     fetch('http://localhost:5000/api/jobs/', {
  //       method: 'POST',
  //       //mode: "no-cors",
  //       body: JSON.stringify({
  //         name: state.jobs.forms.edit.name
  //         //password: state.auth.forms.login.password,
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //     .then(response => response.json())
  //     .then(data => dispatch([update, {key, response: data, current: url, page: 1}]))
  //   }];

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

const saveEdit= ({url, key}) => (state, actions) => {
    //actions.updateLoading(true);
    let item = state[key].forms.edit;

    for(var k in item) {
        let v = item[k];
        if(Array.isArray(v)) {
            item[k] = v.map(x=> {
                return {
                    'id': x.id,
                    'name': x.text
                }
            }
            )
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
    }

    window.setTimeout( () => {
    fetch(saveUrl, {
        body: JSON.stringify(item),
        headers: {
            'content-type': 'application/json',
            //'Authorization': 'Token ' + key
        },
        method,
    }).then(response => {
        //actions.updateLoading(false);

        if(response.status == 400) {
            response.json().then(errors => {
                actions.addErrors({formname: 'edit', errors});
            });
        } else if(response.status == 200 || response.status == 201) {
            response.json().then(data => {
                // Data is the object that was saved
                //g_actions.toasts.add({text: 'Successfully saved object!', style: 'success'} );
                //actions.updateEdit(null);
                //actions.load(state.current);
            });
        }
    }).catch(error => {
        console.log('ERR', error.status);
    });
    }, 500);
    return ({
      ...state, url: window.location,
      toasts: {...state.toasts, 
      items: [...state.toasts.items, {text:"Successfully saved!", style:"success"}]},
      [key]: {...state[key],
      forms: {...state[key].forms,
      edit: null }}
    });
}


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
    <button className="btn btn-primary btn-action btn-lg" onclick={()=>load(window.g_urls[key] + '?name=' + state[key].forms.search.name, key)}>
      <i className="icon icon-apps"></i>
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
        searchAction={()=>load(window.g_urls[key] + '?name=' + state[key].forms.search.name, key)}
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
