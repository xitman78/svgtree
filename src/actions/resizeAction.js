export function resizeAction() {

  // console.log('File', file);

  return (dispatch) => {

    window.addEventListener('resize', function(event) {

       // console.log('On window resize', arguments);

       dispatch({type: 'WINDOW_RESIZE', action: event});

    });

  };
}
