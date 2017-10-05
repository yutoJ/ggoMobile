import { HOST } from '../constants';
import { normalizeGadget, normalizeGadgets } from '../utils';

export const SET_GADGET = 'SET_GADGET';
export const SET_GADGETS = 'SET_GADGETS';

export function setGadget(gadget) {
  return {
    type: SET_GADGET,
    gadget
  }
}

export function setGadgets(gadgets) {
  return {
    type: SET_GADGETS,
    gadgets
  }
}

export function getGadget(gadgetId) {
  return (dispatch) => {
    return fetch(`${HOST}/api/v1/gadgets/${gadgetId}`)
    .then(response => response.json())
    .then(json => {
      if(json.is_success) {
        dispatch(setGadget(normalizeGadget(json.gadget)));
      } else {
        alert(json.error);
      }
    })
    .catch(e => alert(e));
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
    .catch(e => alert(e));
  }
}
