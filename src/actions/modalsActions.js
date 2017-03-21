
export function fireAlert(options) {
  return {
    type: 'MODAL_ALERT_FIRED',
    payload: options
  };
}

export function closeAlert() {
  return {
    type: 'MODAL_ALERT_CLOSED',
  };
}

export function fireSnackbar(options) {
  return {
    type: 'MODAL_SNACKBAR_FIRED',
    payload: options
  };
}

export function closeSnackbar() {
  return {
    type: 'MODAL_SNACKBAR_CLOSED',
  };
}
