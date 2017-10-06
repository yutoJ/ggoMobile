import { HOST } from '../constants';
import { resetRoute } from './nav';

export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

export function setAccessToken(accessToken) {
  return {
    type: SET_ACCESS_TOKEN,
    accessToken,
  };
}

export function loginWithFacebook(facebookAccessToken) {
  return (dispatch) => {
    return fetch(`${HOST}/api/v1/facebook`, {
      method: 'POST',
      body: JSON.stringify({
        facebook_access_token: facebookAccessToken,
      }),
      headers: { "content-type": "application/json" },
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);

      if (json.access_token) {
        dispatch(setAccessToken(json.access_token));
        dispatch(resetRoute({ routeName: 'Main' }));
      } else {
        alert(json.error);
      }
    })
    .catch(e => alert(e));
  };
}

export function logout() {
  return (dispatch) => {
    setTimeout(() => dispatch(setAccessToken(null)), 1000);
  };
}
