//import { h } from "hyperapp"
import { Spinner } from '../components/Spinners.jsx';

import Table from '../components/Table.jsx';
import ModalForm from '../components/ModalForm.jsx';
import SearchForm from '../components/SearchForm.jsx';
import { mergeValuesErrors } from '../util/forms.js';
import { checkAuth } from '../util/auth';

// const updateEdit= item => state => ({
//     ...state,
//     formsedit: item
//   });

const updateEdit= (state, item) => ({
  ...state,
  url: window.location,
  forms: Object.assign({}, state['forms'], {
    edit: item
  })
});


const FilterTableView = ({key, rowHeaders, rowColumns, formFields, title, extraViews}) => (state, actions, g_actions) => 
<div key={key}>
  <h2>
    {title || state.url.pathname} &nbsp;  &nbsp;
    
    <button className="btn btn-primary btn-action btn-lg" onclick={[updateEdit, key]}>
      <i className="icon icon-plus"></i>
    </button>
  </h2>
  <div className="columns">
    <div className="column col-lg-12" oncreate={() => actions.load(window.g_urls[key])}>
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
</div>;

export default FilterTableView
