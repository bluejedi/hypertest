//import { h } from 'hyperapp'
import { SpinnerSmall } from '../components/Spinners.jsx'
import { FormInput, FormInputLong } from './FormInputs.jsx'


const renderField = (field, updateFieldAction ) => {
    let ftype = FormInput 
    //let ftype = undefined;
    if(field.type == 'longtext') ftype = FormInputLong
    return ftype({
        field,
        action: (val) => updateFieldAction(field.key, val)
    });
}

const renderFields = (fields,  updateFieldAction) => fields.map(
    f => renderField(f, updateFieldAction)
)

const SearchForm = ({ loading, formFields, searchAction, updateFieldAction }) => <form method='GET' class='form-horizontal'>
    <div class="form-group">
        {formFields && renderFields(formFields, updateFieldAction)}
        {loading?<SpinnerSmall />:<div  >
            <button type="button" style={{marginTop: '2.3em'}}  class="btn ml-2 btn-primary" onclick={searchAction}>Filter</button>
            <button style={{'margin-top': '2.3em'}} class="btn ml-2" onclick={(_,e) => {e.preventDefault(); searchAction(true); return false; }} >Reset</button>
        </div>}
    </div>
</form>

const SearchFormb = ({ loading, formFields, searchAction, updateFieldAction }) => 
<form method='GET' class='form-horizontal' onsubmit={(_,e) => {e.preventDefault()}}>
    <div class="form-group">
        {
            formFields.map(f => <div key={f.key}>    
                <label class="form-label" for={f.key}>{f.label}</label>
                <input class="form-input" type={f.type} id={f.key} placeholder={f.label} value={f.value} 
                    oninput={                        
                        (_,e) => updateFieldAction(f.key,  e.target.value)
                    }
                />
            </div>)
        }
        {loading?<SpinnerSmall />:<div  >
            <button style={{marginTop: '2.3em'}}  class="btn ml-2 btn-primary" onclick={(_,e) => {e.preventDefault(); searchAction(); return false; }}>Filter</button>
            <button style={{'margin-top': '2.3em'}} class="btn ml-2" onclick={(_,e) => {e.preventDefault(); searchAction(true); return false; }} >Reset</button>
        </div>}
    </div>
</form>

export default SearchForm
            