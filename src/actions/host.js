import { HOST } from '../constants';
import { normalizeGadgets } from '../utils';

export const SET_LISTINGS = 'SET_LISTINGS';


export function setListings(gadgets) {
  return {
    type: SET_LISTINGS,
    gadgets
  }
}

export function getListings() {
  return (dispatch, getState) => {
    const accessToken = getState().user.accessToken;

    return fetch(`${HOST}/api/v1/listings?access_token=${accessToken}`)
    .then(response => response.json())
    .then(json => {
      if(json.is_success) {
        dispatch(setListings(normalizeGadgets(json.gadgets)));
      } else {
        alert(json.error);
      }
    })
    .catch(e => alert(e));
  }
}
