//import { h } from "hyperapp"
import FilterTableView from './FilterTableView.jsx';

const rowHeaders = [
  'Id',
  'Name',
  'Edit'
];

const rowColumns = [
  (item) => item.id,
  (item) => item.name,
  //(item, actions) => <button className='btn btn-block btn-primary'>Edit</button>
];

const formFields = [
  {'key': 'name', 'label': 'Name', 'type': 'text'},
];

//const tit = 

//const SimpleFilterTableView = ({key, title}) => FilterTableView({
const SimpleFilterTableView = FilterTableView({
  key: 'jobs',
  rowHeaders,
  rowColumns,
  formFields,
  title: 'Jobs'
})

export default SimpleFilterTableView;