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

//const key = 'jobs';
//const title = 'Jobs'; 

const SimpleFilterTableView = (state, props) => FilterTableView({
    key: props.key,
    rowHeaders,
    rowColumns,
    formFields,
    title: props.title
  })

export default SimpleFilterTableView;