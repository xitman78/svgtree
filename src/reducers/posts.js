import { fromJS } from 'immutable'

const initialState = fromJS({
  fetching: false,
  posts:[]
});

export default function posts(state = initialState, action) {

  switch(action.type) {
    case 'POSTS_FETCHING':
      return state.merge({fetching: true, posts:state.get('posts')});
    case 'POSTS_FETCHED':
      return state.merge({fetching: false, posts:action.payload}).delete('error');
    case 'POSTS_FETCH_ERROR':
      return state.merge({fetching: false, posts:[], error: action.error});

    default:
      return state;
  }

}
