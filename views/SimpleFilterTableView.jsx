//import { h } from "hyperapp"
import FilterTableView from './FilterTableView.jsx';
import Viewz from "./Layout.jsx"

const rowHeaders = [
  'Id',
  'Name',
  'Edit'
];

const rowColumns = [
  (item) => item.id,
  (item) => item.name,
  (item, actions) => <button className='btn btn-block btn-primary' onclick={(z) => actions(item)}>Edit</button>
];

const formFields = [
  {'key': 'name', 'label': 'Name', 'type': 'text'},
];

// const updateEdit= (state, items) => ({
//   ...state,
//   [key]: {...state[key],
//     forms: {...state[key].forms,
//   //forms: Object.assign({}, state['forms'], {
//     edit: items
//   }}
//   //})
// });

//const key = 'jobs';
//const title = 'Jobs'; 

const SimpleFilterTableView = (state, props) => FilterTableView({
    key: props.key,
    rowHeaders,
    rowColumns,
    formFields,
    title: props.title,
    actions: (row) => updateEdit(row)
  })

export default SimpleFilterTableView;