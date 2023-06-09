//import { h } from 'hyperapp'

const AbstractInput = ({field, action, realInput}) => <div class={`form-group ${field.errors?'has-error':''}`} key={field.key}>
<label class="form-label" for="{field.key}">{field.label}</label>
{realInput}
<div class='form-input-hint'>{field.errors?field.errors[0]:null}</div>
</div>

export const FormInput = ({field, action}) => AbstractInput({
    field, 
    action, 
    realInput: <input class="form-input" type={field.type} id={field.key}
        placeholder={field.label} value={field.value} 
        oninput={(_, e) => action(e.target.value)}
        />
})


export const FormInputLong =({field, action}) => AbstractInput({
    field, 
    action, 
    realInput: <textarea class="form-input" id={field.key} rows='5'
        placeholder={field.label} value={field.value}
        oninput={(_, e) => action(e.target.value)}
        />
})



// module.exports['FormInput'] = FormInput
// module.exports['FormInputLong'] = FormInputLong
//export FormInput
//export FormInputLong