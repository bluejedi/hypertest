
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

export const mergeValuesErrors = (formFields, item, errors, gitems, act, keyz) => {
    //console.log(formFields);
    //console.log(gitems);
    return formFields.map(f => Object.assign({}, f, {
        'keyz': keyz,
        'value': item[f.key],
        'gitems': gitems,
        'act': act
    }, errors?{
        'errors': errors[f.key]
    }:{}
    ));
}