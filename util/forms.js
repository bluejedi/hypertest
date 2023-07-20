
// export const mergeValuesErrors = (formFields, item, errors) => {
//     //console.log(formFields);
//     //console.log(item);
//     return formFields.map(f => Object.assign({}, f, {
//         'value': item[f.key]
//     }, errors?{
//         'errors': errors[f.key]
//     }:{}
//     ));
// }

export const mergeValuesErrors = (formFields, item, errors, url, keyz) => {
    //console.log(formFields);
    //console.log(gitems);
    return formFields.map(f => Object.assign({}, f, {
        'url': url,
        'keyz': keyz,
        'value': item[f.key]
    }, errors?{
        'errors': errors[f.key]
    }:{}
    ));
}