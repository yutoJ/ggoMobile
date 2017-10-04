import { HOST } from '../constants';
import { normalizeGadgets } from '../utils';

export const SET_GADGETS = 'SET_GADGETS';

export function setGadgets(gadgets) {
  return {
    type: SET_GADGETS,
    gadgets
  }
}


export function getGadgets() {
  return (dispatch) => {
    return fetch(`${HOST}/api/v1/gadgets`)
    .then(response => response.json())
    .then(json => {

      if(json.is_success) {
        dispatch(setGadgets(normalizeGadgets(json.gadgets)));
      } else {
        alert(json.error);
      }
    })
    .catch(e => alert("check", e));
  }
}
