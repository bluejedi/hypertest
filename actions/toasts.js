//module.exports = {
export const add= ({text, style}) => (state, actions) => {
    // Hide toast after 10 s
    window.setTimeout( () => {
      actions.hide(text);
    }, 10000);
    return {
      items: [...state.items, {text: text, style: style}]
    };
  };

  export const hide= text => state => {
    let idx = state.items.map(v => v.text).indexOf(text);
    return {
      items: [
        ...state.items.slice(0, idx),
        ...state.items.slice(idx+1),
      ]
    };
  };

  export const clear= () => state => ({
    items: []
  });
//};

export default add;