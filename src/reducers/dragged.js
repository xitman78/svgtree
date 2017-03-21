import { fromJS } from 'immutable'

const initialState = fromJS({ x: 50, y: 50});

export default function dragged(state = initialState, action) {

  switch(action.type) {

    case 'DRAGGED_POSITION_CHANGED':
      return state.merge({
          x: action.payload.x,
          y: action.payload.y,
        });

    default:
      return state;

  }
}
