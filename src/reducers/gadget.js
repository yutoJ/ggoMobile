import { SET_GADGET, SET_GADGETS, SET_FILTER } from '../actions/gadget';

const initialState = {
  gadgets: [],
  gadget: null,
  filter: {
    address: '',
    startDate: '',
    endDate: ''
  }
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
  if (action.type === SET_FILTER) {
    return {
      ...state,
      filter: action.filter
    }
  }
  return state;
}
