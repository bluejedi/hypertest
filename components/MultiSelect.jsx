//import { h } from 'hyperapp'

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


const MultiSelect = ({label, field, action, act}) =>
    <div class="form-group">
      <div class="form-autocomplete">
        <div class="form-autocomplete-input form-input is-focused">
            {field.value && field.value.map(v => 
                <span class="chip" data-id={v.id}>{v.name}
                <button type="button" class="btn btn-clear" onclick = {(_, e) => {
                    e.preventDefault();
                    //console.log(e);
                    let newval = field.value.filter(n => n.id != v.id )
                    return action(newval)
                    //e.preventDefault();
                } }
                ></button>
                </span>)}
              <div class="has-icon-left">
                <input class="form-input" type="text" placeholder="" value=""
                    //oninput= {(_,e) => load(`http://localhost:5000/api/genres/?name=${e.target.value}`, field.actions)}
                    oninput = {(state, e) => { return [
                        { ...state,
                            loading: true, //mandatory
                            //gitems: gitems,
                        },
                        load(`http://localhost:5000/api/genres/?name=${e.target.value}`, field.act)
                      ]}}
                /><i class="form-icon loading"></i>
              </div>
        </div>
        <ul class="menu">
          <li class="menu-item"><a href="#autocomplete">
          <div class="tile tile-centered">
              <div class="tile-icon"></div>
              <div class="tile-content">
                  
              </div>
            </div></a></li>
            { field.gitems.map(v => 
              <li class="menu-item" data-id={v.id}><button type="buton" class="btn" onclick = {(_, e) => {
                    e.preventDefault();
                    //console.log(e);
                    let newval = field.value.concat({id: v.id, name: v.name})
                    return action(newval)
                    //e.preventDefault();
                }}>
              <div class="tile tile-centered">
                  <div class="tile-icon"></div>
                  <div class="tile-content">
                      {v.name}
                  </div>
                </div></button></li>
              )}      
        </ul>
      </div>
    </div>

export default MultiSelect