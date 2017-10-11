import { HOST } from '../constants';
import { normalizeGadgets, normalizeReservations } from '../utils';

export const SET_LISTINGS = 'SET_LISTINGS';
export const SET_RESERVATIONS = 'SET_RESERVATIONS';


export function setListings(gadgets) {
  return {
    type: SET_LISTINGS,
    gadgets,
  }
}

export function setReservations(reservations) {
  return {
    type: SET_RESERVATIONS,
    reservations,
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

export function getReservations(gadgetId) {
  return (dispatch, getState) => {
    const accessToken = getState().user.accessToken;
    return fetch(`${HOST}/api/v1/gadgets/${gadgetId}/reservations?access_token=${accessToken}`)
    .then(response => response.json())
    .then(json => {
      if(json.is_success) {
        dispatch(setReservations(normalizeReservations(json.reservations)));
      } else {
        alert(json.error);
      }
    })
    .catch(e => alert(e));
  }
}

export function changeReservation(gadgetId, reservationId, approve) {
  return (dispatch, getState) => {
    const accessToken = getState().user.accessToken;
    var url = `${HOST}/api/v1/reservations/${reservationId}/`;
    if (approve) {
      url += 'approve';
    } else {
      url += 'decline';
    }
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify({
          access_token: accessToken,
      }),
      headers: {"content-type": "application/json"}
    })
    .then(response => response.json())
    .then(json => {
      if(json.is_success) {
        dispatch(getReservations(gadgetId));
      } else {
        alert(json.error);
      }
    })
    .catch(e => alert(e));
  }
}
