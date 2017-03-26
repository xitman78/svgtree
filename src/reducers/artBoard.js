import { fromJS } from 'immutable'

const minScale = 0.25;
const maxScale = 2.0;

const scaleSteps = [
  0.25, 0.5, 1.0, 1.5, 2.0
];

const initialState = fromJS({
  scale: 1.0,
  enableZoomIn: true,
  enableZoomOut: true,
});

export default function artBoard(state = initialState, action) {

  switch(action.type) {

    case 'SET_SCALE':
      return state.merge({ scale: action.payload, enableZoomIn: (action.payload < maxScale), enableZoomOut: (action.payload > minScale) });

    case 'INCREASE_SCALE':
      {
        let scale = state.get('scale');
        let ind = scaleSteps.findIndex(ss => ss === scale);
        let enableZoomIn = (ind < (scaleSteps.length - 2)) ? true : false;
        let nextScale = (ind < (scaleSteps.length - 1)) ? scaleSteps[ind + 1] : scaleSteps[scaleSteps.length - 1];
        return state.merge({ scale: nextScale, enableZoomIn: enableZoomIn, enableZoomOut: true });
      }

    case 'DECREASE_SCALE':
      {
        let scale = state.get('scale');
        let ind = scaleSteps.findIndex(ss => ss === scale);
        let enableZoomOut = ind > 1 ? true : false;
        let nextScale = (ind > 0 ) ? scaleSteps[ind - 1] : scaleSteps[0];
        return state.merge({ scale: nextScale, enableZoomIn: true, enableZoomOut: enableZoomOut });
      }

    default:
      return state;
  }

}
