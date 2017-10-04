import { SET_GADGETS } from '../actions/gadget';

const initialState = {
  gadgets: []
};

export default function(state = initialState, action) {
  if (action.type === SET_GADGETS) {
    return {
      ...state,
      gadgets: action.gadgets
    }
  }
  return state;
}
