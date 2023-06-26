//import { h } from "hyperapp"
import FilterTableView from './FilterTableView.jsx';
import Viewz from "./Layout.jsx"

const rowHeaders = [
  'Id',
  'Name',
  'Edit'
];

const rowFilters = [];
// const rowFilters = [
//   (item, actions) => <input class="form-input" type='text' id={item.id}
//         placeholder={item.id} value={state[key].forms.search[item.id].value} 
//         oninput={(_, e) => action(e.target.value)}
//         />,
//   (item, actions) => <input class="form-input" type='text' id={item.name}
//         placeholder={item.name} value={state[key].forms.search[item.name].value} 
//         oninput={(_, e) => action(e.target.value)}
//         />
// ];

const rowColumns = [
  (item) => item.id,
  (item) => item.name,
  (item, actions) => <button className='btn btn-primary' onclick={(z) => actions(item)}>Edit</button>
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
    // rowFilters: [
    //     <input class="form-input" type='text'
    //           placeholder="id" value=''
    //           oninput={(_, e) => action(e.target.value)}
    //           />,
    //     <input class="form-input" type='text' 
    //           placeholder="name" value=''
    //           oninput={(_, e) => action(e.target.value)}
    //           />,
    //     <button className='btn btn-block btn-primary' onclick={(z) => actions(value)}>Filter</button>
    //   ],
    rowColumns,
    formFields,
    title: props.title,
    actions: (row) => updateEdit(row)
  })

export default SimpleFilterTableView;