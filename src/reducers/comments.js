import { fromJS } from 'immutable'

const initialState = fromJS({
  bounce: 'jelly',
  comments: [
    {id: 4, count: 0},
    {id: 5, count: 0},
    {id: 6, count: 0}
  ],
  checked: {
    red: false,
    green: false,
    orange: false,
    yellow: false,
  }
});

export default function comments(state = initialState, action) {

  switch(action.type) {

    case 'INCREMENT_COMMENT':

      let commentsList = state.get('comments');
      let index = commentsList.findIndex(cm => cm.get('id') === action.id);

      if(index !== -1) {
        console.log('Index found');
        return state.setIn(['comments', index, 'count'], commentsList.getIn([index, 'count']) + 1);
      }
      return state;

   case 'BOUNCE_SELECTED':

    return state.set('bounce', action.bounce);

  case 'CHECKED_COLOR':

    return state.setIn(['checked', action.color ], action.isChecked);

    default:
      return state;
  }
}
