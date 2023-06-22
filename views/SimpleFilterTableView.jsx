//import { h } from "hyperapp"
import FilterTableView from './FilterTableView.jsx';
//onclick={()=>actions.updateEdit(Object.assign({}, item))}
//(item, actions) => <button className='btn btn-block btn-primary'>Edit</button>
const rowHeaders = [
  'Id',
  'Name',
  'Edit'
];

const rowColumns = [
  (item) => item.id,
  (item) => item.name,
  (item) => <button className='btn btn-block btn-primary'>Edit</button>
];

const formFields = [
  {'key': 'name', 'label': 'Name', 'type': 'text'},
];

const SimpleFilterTableView = ({key, title}) => FilterTableView({
  key,
  rowHeaders,
  rowColumns,
  formFields,
  title
})

export default SimpleFilterTableView;