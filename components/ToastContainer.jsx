//import { h } from 'hyperapp';

const Toast  = ({text, actions, style='primary'}) => <div className={`toast toast-${style}`}>
  <button className="btn btn-clear float-right" onclick={() => actions.toasts.hide(text)}></button>
  {text}
</div>;

const ToastContainer = ({toasts, actions}) => <div className='toast-container'>
{console.log(toasts.items)}
  {toasts.items.map((t) => <Toast text={t.text} style={t.style} actions={actions} />)}
</div>;

export default ToastContainer;