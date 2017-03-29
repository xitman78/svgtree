export function toogleSelection(elId, rect) {
  return {
    type: 'TOGGLE_ELEMENT_SELECTION',
    payload: { id: elId, rect: rect }
  };
}
