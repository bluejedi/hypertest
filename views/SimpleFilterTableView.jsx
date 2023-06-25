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
  (item, actions) => <button className='btn btn-block btn-primary'>Edit</button>
];

const formFields = [
  {'key': 'name', 'label': 'Name', 'type': 'text'},
];

//const tit = 

const SimpleFilterTableView = ({key, title}) => (state, actions, g_actions) => FilterTableView({
//const SimpleFilterTableView = (state) => FilterTableView({
  key: state.pathname,
  rowHeaders,
  rowColumns,
  formFields,
  title: state.pathname
})

export default SimpleFilterTableView;