//module.exports = {
// export const add= ({text, style}) => (state, actions) => {
//     // Hide toast after 10 s
//     window.setTimeout( () => {
//       actions.hide(text);
//     }, 10000);
//     return {
//       items: [...state.items, {text: text, style: style}]
//     };
//   };

//   export const hide= text => state => {
//     let idx = state.items.map(v => v.text).indexOf(text);
//     return {
//       items: [
//         ...state.items.slice(0, idx),
//         ...state.items.slice(idx+1),
//       ]
//     };
//   };

//   export const clear= () => state => ({
//     items: []
//   });
// //};

// export default add;

//module.exports = {
export const toasts = {  
  // add: (state, {text, style}) => ({
  //     ...state,
  //     toasts: {...state.toasts,
  //     items: [[...state.toasts.items,
  //       text,
  //       style
  //   ]]}}),
  add: (state, {text, style}) => {
    let statez = {...state};
    console.log(...state.toasts.items.slice(0, idx));
  },

  hide: text => state => {
    let idx = state.toasts.items.map(v => v.text).indexOf(text);
    console.log(...state.toasts.items.slice(0, idx));
    return {
      ...state,
      url: window.location,
      toasts: {...state.toasts,
      items: [
        ...state.toasts.items.slice(0, idx),
        ...state.toasts.items.slice(idx+1),
      ]}
    };
  },

  clear: () => state => ({
    ...state,
    items: []
  })
};

export default toasts;