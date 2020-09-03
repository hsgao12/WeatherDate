import { SET_LNG_LAT, SET_MAX_DISTANCE, SET_LOCATION_ID } from '../types.js';

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
        maxDistance: action.payload,
      };
    case SET_LOCATION_ID:
      return {
        ...state,
        locationId: action.payload,
      };
    default:
      console.log(action.type);
  }
};
