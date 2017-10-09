import { SET_LISTINGS } from '../actions/host';

const initialState = {
  listings: [],
};

export default function(state = initialState, action) {
  if (action.type === SET_LISTINGS) {
    return {
      ...state,
      listings: action.gadgets
    }
  }
  return state;
}
