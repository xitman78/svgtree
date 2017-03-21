import { combineReducers } from 'redux-immutable'
import { routerReducer } from 'react-router-redux'
import { LOCATION_CHANGE } from 'react-router-redux'
import { fromJS } from 'immutable'
import { reducer as reducerForm } from 'redux-form/immutable'

import works from './works'
import comments from './comments'
import posts from './posts'
import modals from './modals'
import dragged from './dragged'

const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers(
  {
    route: routeReducer,
    works: works,
    modals: modals,
    comments: comments,
    posts: posts,
    routing: routerReducer,
    dragged: dragged,
    form: reducerForm,
  }
);

export default rootReducer;
