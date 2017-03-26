import { fromJS } from 'immutable'

const initialState = fromJS({
  scale: 1.0,
});

export default function artBoard(state = initialState, action) {

  switch(action.type) {

    case 'RESET_SCALE':
      return state.set('scale', 1.0);

    case 'INCREASE_SCALE':
      return state.set('scale', state.get('scale') * 1.25 );

    case 'DECREASE_SCALE':
      return state.set('scale', state.get('scale') / 1.25 );  

    default:
      return state;
  }

}
