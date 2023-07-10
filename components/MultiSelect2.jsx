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

 <!--div class="form-group" >
    <label class="form-label" for="{field.label}">{field.label}</label>
        <select name="genres" multiple="multiple">
            {field.value && field.value.map(v => <option value={v.id}>{v.name}</option>)}
        </select>
    </div-->

const MultiSelect = ({label, field, action}) =>
    <div class="form-group">
      <div class="form-autocomplete">
        <div class="form-autocomplete-input form-input is-focused">
            {field.value && field.value.map(v => <span class="chip" data-id={v.id}>{v.name}<a class="btn btn-clear" href="#" aria-label="Close" role="button"></a></span>)}
              <div class="has-icon-left">
                <input class="form-input" type="text" placeholder="" value={field.value} />S<i class="form-icon loading"></i>
              </div>
        </div>
        <ul class="menu">
          
          {field.value && field.value.map(v => 
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