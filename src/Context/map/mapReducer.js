import { SET_SELECTED } from '../types.js';

export default (state, action) => {
  switch (action.type) {
    case SET_SELECTED:
      return {
        ...state,
        selected: action.payload,
      };
    default:
      console.log(action.type);
      return state;
  }
};
