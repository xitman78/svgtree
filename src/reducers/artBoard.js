import { fromJS } from 'immutable'
import { minScale, maxScale, scaleSteps } from 'helpers/artBoardConsts'

const initialState = fromJS({
  scale: 1.0,
  enableZoomIn: true,
  enableZoomOut: true,
  width: 0,
  height: 0,
  selectionsMap: {}
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

    case 'SVG_PARSED':
      {
        let svg = action.payload;
        let width = svg['@props']['width'] || '300px';  // fallback if size is not defined in SVG
        let height = svg['@props']['height'] || '300px'; //
        width = parseInt(width.replace(/px/, ''));
        height = parseInt(height.replace(/px/, ''));

        return state.merge({ selectionsMap: {}, width, height });
      }

    case 'TOGGLE_ELEMENT_SELECTION':
      {
        let selEl = state.getIn(['selectionsMap', action.payload.id]);

        if(!selEl) {
          return state.setIn(['selectionsMap', action.payload.id], action.payload.rect);
        } else {
          return state.set('selectionsMap', state.get('selectionsMap').delete(action.payload.id));
        }
      }

    default:
      return state;
  }

}
