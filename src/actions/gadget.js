import { HOST } from '../constants';
import { normalizeGadget, normalizeGadgets } from '../utils';

export const SET_GADGET = 'SET_GADGET';
export const SET_GADGETS = 'SET_GADGETS';
export const SET_FILTER = 'SET_FILTER';

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

export function setFilter(filter) {
  return {
    type: SET_FILTER,
    filter
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
  return (dispatch, getState) => {
    const filter = getState().gadget.filter;
    return fetch(`${HOST}/api/v1/gadgets?address=${filter.address}&start_date=${filter.startDate}&end_date=${filter.endDate}`)
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
