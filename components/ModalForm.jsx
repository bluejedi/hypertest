//import { h } from 'hyperapp'
import { FormInput, FormInputLong } from './FormInputs.jsx'
import FormDateInput from './FormDateInput.jsx'
import MultiSelect from './MultiSelect.jsx'
import { SpinnerSmall } from './Spinners.jsx'


const renderField = (field, updateFieldAction ) => {
  let ftype = undefined;
  switch(field.type) {
    case 'longtext': ftype = FormInputLong; break;
    case 'text': ftype = FormInput; break;
    case 'number': ftype = FormInput; break;
    case 'multiselect': ftype = MultiSelect; break;
    case 'date': ftype = FormDateInput; break;
  }
  return ftype({
    field,
    action: (val) => updateFieldAction(field.key, val)
  });
}

const renderFields = (fields,  updateFieldAction) => fields.map(
  f => renderField(f, updateFieldAction)
)

const ModalForm = ({ loading, formFields, item, hideAction, saveAction, updateFieldAction }) => <div className={`modal ${item?'active':''}`}>
  <div class="modal-overlay"></div>
  <div class="modal-container">
    <div class="modal-header">
      <button class="btn btn-clear float-right" onclick={hideAction}></button>
      <div class="modal-title h5">"Add new item!"</div>
    </div>
    <div class="modal-body">
      <div class="content">
        <form method='POST'>
          
        </form>
      </div>
    </div>
    <div class="modal-footer">
      {loading?<SpinnerSmall />:<div>
        <button class="btn" onclick={hideAction}>Cancel</button>
        <button class="ml-2 btn btn-primary" onclick={saveAction}>Ok</button>
      </div>}
    </div>
  </div>
</div>

export default ModalForm
