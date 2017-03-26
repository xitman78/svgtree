export function increaseScale() {
  return {
    type: 'INCREASE_SCALE',
    payload: null
  };
}

export function decreaseScale() {
  return {
    type: 'DECREASE_SCALE',
    payload: null
  };
}

export function setScale(scale) {
  return {
    type: 'SET_SCALE',
    payload: scale
  };
}
