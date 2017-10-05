import { SET_GADGET, SET_GADGETS } from '../actions/gadget';

const initialState = {
  gadgets: [],
  gadget: null,
};

export default function(state = initialState, action) {
  if (action.type === SET_GADGETS) {
    return {
      ...state,
      gadgets: action.gadgets
    }
  }
  if (action.type === SET_GADGET) {
    return {
      ...state,
      gadget: action.gadget
    }
  }
  return state;
}
