import { SET_LNG_LAT, SET_MAX_DISTANCE } from '../types.js';

export default (state, action) => {
  switch (action.type) {
    case SET_LNG_LAT:
      return {
        ...state,
        coords: action.payload,
      };
    case SET_MAX_DISTANCE:
      return {
        ...state,
        distanceFrom: action.payload,
      };
  }
};
