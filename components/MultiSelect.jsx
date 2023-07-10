//import { h } from 'hyperapp'
// oncreate={element => {
    // $(element).select2({
    //     ajax: {
    //         url: field.url,
    //         dataType: 'json',
    //         delay: 250,
    //         placeholder: 'Search for ' + field.label.toLowerCase(),
    //         data: function (params) {
    //             return {
    //                 name: params.term,
    //             }
    //         },
    //         processResults: function (data) {
    //             return {
    //                 results: data.results.map(r => {return {'id': r.id, 'text': r.name}})
    //             };
    //         }
    //     }
    // });
    // if(field.value) {
    //     field.value.forEach(v => {
    //         var option = new Option(v.name, v.id, true, true);
    //         $(element).append(option).trigger('change');
    //     })
    // }
    // $(element).on('change', e => {

    //     console.log(e);
    //     let newval = $(element).select2('data')
    //     console.log(newval);
    //     action(newval)
    // });
 //}}

//const action = 
//{
  // load: (url) => (state, actions) => [
  //   {...state, loading: true},
  //   dispatch => {                           // <---
  //     fetch(url)
  //     .then(response => response.json())
  //     .then(data => dispatch(actions.update, {response: data, current: url, page: 1})) // <---
      // .then(data => dispatch([act, {key: 'movies', response: data, current: '', page: 1}])) // <---   
  //   }
  // ],
  //
  const load= (url, act) => {
        //console.log(act);
        return dispatch => { 
          fetch(url)
          .then(response => response.json())
          .then(data => dispatch([act, {response: data}]))
        }
    };

//   updateLoading: (state, val) => ({
//     ...state,
//     loading: val
//   }),

const  update= ({response, current, page}) => state => ({
    ...state,
    loading: false,
    page,
    current,
    count: response.count,
    next: response.next,
    previous: response.previous,
    items: response.results
  })
// }
// const gitems = [
//     {
//       "id": 1,
//       "name": "1"
//     },
//     {
//       "id": 2,
//       "name": "jav"
//     },
//   ]


const MultiSelect = ({label, field, action}) =>
    <div class="form-group">
      <div class="form-autocomplete">
        <div class="form-autocomplete-input form-input is-focused">
            {field.value && field.value.map(v => <span class="chip" data-id={v.id}>{v.name}<a class="btn btn-clear" href="#" aria-label="Close" role="button"></a></span>)}
              <div class="has-icon-left">
                <input class="form-input" type="text" placeholder="" value='' 
                    //oninput= {(_,e) => load(`http://localhost:5000/api/genres/?name=${e.target.value}`, field.actions)}
                    oninput = {(state, e) => { return [
                        { ...state,
                            loading: true, //mandatory
                            //gitems: gitems,
                        },
                        load(`http://localhost:5000/api/genres/?name=${e.target.value}`, field.actions)
                      ]}}
                /><i class="form-icon loading"></i>
              </div>
        </div>
        <ul class="menu">
          <li class="menu-item"><a href="#autocomplete">
          <div class="tile tile-centered">
              <div class="tile-icon"></div>
              <div class="tile-content">
                  {console.log(field)}
              </div>
            </div></a></li>
            { field.gitems.map(v => 
              <li class="menu-item"><a href="#autocomplete">
              <div class="tile tile-centered">
                  <div class="tile-icon"></div>
                  <div class="tile-content">
                      {v.name}
                  </div>
                </div></a></li>
              )}      
        </ul>
      </div>
    </div>

export default MultiSelect