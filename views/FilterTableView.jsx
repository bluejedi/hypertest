//import { h } from "hyperapp"
import { Spinner } from '../components/Spinners.jsx';

import Table from '../components/Table.jsx';
import ModalForm from '../components/ModalForm.jsx';
import SearchForm from '../components/SearchForm.jsx';
import { mergeValuesErrors } from '../util/forms.js';
import { checkAuth } from '../util/auth';
import Viewz from "./Layout.jsx";
import actions from "../actions/index.js";

const updateEdit= item => state => ({
    forms: Object.assign({}, state['forms'], {
      edit: item
    })
  });

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

const FilterTableView = ({key, rowHeaders, rowColumns, formFields, title, extraViews}) => (state, actions, g_actions) => 
<Viewz key={state.auth.key} username={state.auth.username}>
<div key={key}>
  <h2>
    {title || state.url.pathname} &nbsp;  &nbsp;
    {state.auth.key?<button className="btn btn-primary btn-action btn-lg" onclick={()=>updateEdit({})}>
      <i className="icon icon-plus"></i>
    </button>:null}
    <button className="btn btn-primary btn-action btn-lg" onclick={()=>load(window.g_urls[key], key)}>
      <i className="icon icon-refresh"></i>
    </button>
  </h2>
  <div className="columns">
    <div className="column col-lg-12" oncreate={load(window.g_urls[key])}>
      <SearchForm
        formFields={mergeValuesErrors(formFields, state[key].forms.search, null)}
        //updateFieldAction={(key, value)=>actions.updateField({formname: 'search', fieldname: key, value})}
        //searchAction={actions.searchAction}
      />
      {state[key].loading == true ? <Spinner /> : <Table
        rowHeaders={checkAuth(rowHeaders, state.auth)}
        rowColumns={checkAuth(rowColumns, state.auth)}
        rows={state[key]}
        actions={actions}
      />}
    </div>
  </div>
  {state[key].forms.edit?<ModalForm
    loading={state[key].loading}
    //formFields={mergeValuesErrors(formFields, state[key].forms.edit, state[key].forms.edit.errors)}
    item={state[key].forms.edit}
    hideAction={()=>actions.updateEdit(null)}
    saveAction={()=>actions.saveEdit({g_actions: g_actions, key: state.auth.key})}
    updateFieldAction={(key, value)=>actions.updateField({formname: 'edit', fieldname: key, value})}
  />:null}
  {extraViews?extraViews.map( ev => ev(state, actions)):null}
</div>
</Viewz>

export default FilterTableView
