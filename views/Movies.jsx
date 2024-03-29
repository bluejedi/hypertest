//import { h } from "hyperapp"
import PlotModal from '../components/PlotModal.jsx';
import MultiModalForm from '../components/MultiModalForm.jsx';
import FilterTableView from './FilterTableView.jsx';

const rowHeaders = [
  'Id',
  'Title',
  'Release year',
  'Runtime',
  'Genres',
  'Plot',
  'Edit'
]

const rowColumns = [
  (movie) => movie.id,
  (movie) => movie.title,
  (movie) => movie.release_year,
  (movie) => movie.runtime,
  (movie) => movie.genres.map(z => <span className='chip bg-dark'><a class='text-secondary text-norma' href=''>{z.name}</a></span>),
  (movie, actions) => <span onclick={()=>updateShowPlot(movie)}>{movie.story.substring(0,50) + '...'}</span>,
  (movie, actions) => <div>
    <button className='btn btn-primary' onclick={(z) => actions(movie)}>Edit</button>

    <button className='btn btn-primary' onclick={()=>updateEditPeople(Object.assign({}, movie) )}>Edit people</button>
  </div>
];


const formFields = [
  {'key': 'title', 'label': 'Title', 'type': 'text'},
  {'key': 'release_year', 'label': 'Release Year', 'type': 'number'},
  {'key': 'runtime', 'label': 'Runtime', 'type': 'number'},
  {'key': 'genres', 'label': 'Genres', 'type': 'multiselect'}, 
  {'key': 'story', 'label': 'Plot', 'type': 'longtext'}
];

const multiFormFields = [
  {'key': 'person', 'label': 'Person', 'type': 'text'},
  {'key': 'job', 'label': 'Job', 'type': 'text'},
];

const updateShowPlot= showPlot => state => ({
    showPlot
});

const updateEditPeople= movie => state => {
    // forms: Object.assign({}, state.movies['forms'], {
    //     editPeople: movie
    // })

    //try update state with shallow copy 
    let movies = {...state.movies};
    let p = movies.forms.editPeople = movie;
    return {
      ...state,
      p
    }
};

const extraViews = [
  (state, actions) => <div>{state.movies.showPlot?<PlotModal movie={state.movies.showPlot} actions={actions} />:null}</div>,
  (state, actions) => <div>{state.movies.forms.editPeople?<div>WILL EDIT<MultiModalForm
    loading={state.movies.loading}
    //formFields={mergeValuesErrors(formFields, state.movies.forms.editPeople, state.movies.forms.editPeople.errors)}
    formFields={multiFormFields}
    item={state.movies.forms.editPeople}
    hideAction={()=>updateEditPeople(null)}
    saveAction={()=>saveEditPeople({g_actions: g_actions, key: state.auth.key})}
    //updateFieldAction={(key, value)=>updateField({formname: 'edit', fieldname: 'movies', value})}
    updateFieldAction={(keyz, value) => { console.log(value); return ({...state,  
      movies:{...state.movies,
        //loading: true,
        forms:{...state.movies.forms,
          editPeople:{...state.movies.forms.editPeople,
            [keyz]: value
        }}}
    })}}
  /></div>:null}</div>
]

const Movies = (state, props) =>FilterTableView({
  key: 'movies',
  rowHeaders,
  rowColumns,
  formFields: formFields,
  title: 'Movies list',
  extraViews,
  //actions: (row) => updateEdit(row)
})

export default Movies;