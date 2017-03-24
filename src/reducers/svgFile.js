import { fromJS } from 'immutable'

const initialState = fromJS({
  reading: false,
  name: '',
  size: -1,
  type: '',
  content:'',
  error: '',
  parsedSvg: null,
});

export default function svgFile(state = initialState, action) {

  switch(action.type) {

    case 'READING_SVG_FILE':
      return state.merge({
        reading: true,
        name: action.payload.file.name,
        size: action.payload.file.size,
        type: action.payload.file.type,
        error: '',
        content: '',
        parsedSvg: null
      });

    case 'READ_SVG_RESULT':
      return state.merge({
        reading: false,
        content: action.payload.result
      });

    case 'READ_SVG_ERROR':

      return state.merge({
        reading: false,
        size: -1,
        error: action.payload.error
      });

    case 'SVG_PARSED':
     return state.set('parsedSvg', action.payload);

    case 'SVG_PARSE_ERROR':
      return state.set('error', action.payload.error);

    default:
      return state;
  }

}
