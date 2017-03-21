import { combineReducers } from 'redux-immutable'
import { fromJS } from 'immutable'

let alertInitialState = fromJS({
   open: false
});

function alert(state = alertInitialState, action) {

  switch(action.type) {

    case 'MODAL_ALERT_FIRED':
      // console.log('MODAL_ALERT_FIRED', state);
      return state.set('open', true).merge(action.payload);

    case 'MODAL_ALERT_CLOSED':
      // console.log('MODAL_ALERT_FIRED', state);
      return state.set('open', false);

    default:
      return state;

  }
}

let snackbarInitialState = fromJS({
   open: false
});

function snackbar(state = snackbarInitialState, action) {

  switch(action.type) {

  case 'MODAL_SNACKBAR_FIRED':
    return state.set('open', true).merge(action.payload);

  case 'MODAL_SNACKBAR_CLOSED':
    return state.set('open', false);

  default:
    return state;

  }
}

export default combineReducers({
  alert,
  snackbar
});
