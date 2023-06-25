
export const mergeValuesErrors = (formFields, item, errors) => {
    console.log(item);
    return formFields.map(f => Object.assign({}, f, {
        'value': item[f.key]
    }, errors?{
        'errors': errors[f.key]
    }:{}
    ));
}