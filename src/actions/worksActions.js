import $http from 'axios'

export function currentWorkChanged(workId) {

  return {
    type: 'CURRENT_WORK_CHANGED',
    id: workId,
  };
}

export function fetchWorks() {
  return (dispatch) => {

    const req = $http.get('http://react.3dtree.net/static/data/works.json');

    req.then(({data}) => {
      // console.log('Works ', data);
      dispatch({ type: 'WORKS_FETCHED', payload: data});
    }).catch(err => {
      // console.error('Error fetching works', err);
      // dispatch({type: 'MODAL_ALERT_FIRED', payload: {message: 'Cannot fetch works!', title: 'Error'}});
      dispatch({ type: 'WORKS_FETCH_ERROR', payload: err});
    })

  };
}

export function swapChild() {
  return {
    type: 'WORKS_SWAP_CHILD',
  };
}

export function swappedDrop(sourse, target) {
  return {
    type: 'WORKS_SWAPPED_DROP',
    sourse,
    target
  };
}

const worksActions = {
  currentWorkChanged,
  fetchWorks,
  swapChild
}

export default worksActions;
