import $http from 'axios'

export function incrementComment(id) {
  return {
    type: 'INCREMENT_COMMENT',
    id
  };
}

export function selectBounce(bounce) {
  return {
    type: 'BOUNCE_SELECTED',
    bounce
  }
}

export function colorChecked(color, isChecked) {
  return {
    type: 'CHECKED_COLOR',
    color,
    isChecked
  };
}

export function fetchPosts() {
  return (dispatch) => {

    dispatch({ type: 'POSTS_FETCHING' });

    const req = $http.get('https://jsonplaceholder.typicode.com/posts');

    req.then(({data}) => {
      setTimeout(function(){
        dispatch({ type: 'POSTS_FETCHED', payload: data});
      }, 1000);
    }).catch(err => {
      // dispatch({type: 'MODAL_ALERT_FIRED', payload: {message: 'Cannot fetch blog posts!', title: 'Error'}});
      dispatch({type: 'POSTS_FETCH_ERROR', error: err});
    });

  };
}

export function draggedMoved(x, y) {
  return {
    type: 'DRAGGED_POSITION_CHANGED',
    payload: {x, y}
  };
}
