import React, { useReducer } from 'react';
import axios from 'axios';
import LocationContext from './locationContext.js';
import LocationReducer from './locationReducer.js';
import { SET_LNG_LAT, SET_MAX_DISTANCE, SET_LOCATION_ID } from '../types.js';

const LocationState = (props) => {
  const initialState = {
    coords: null,
    places: [],
    maxDistance: 0,
    locationId: '',
  };

  const [state, dispatch] = useReducer(LocationReducer, initialState);

  const setCoords = (coords) => {
    dispatch({ type: SET_LNG_LAT, payload: coords });
  };

  const setMaxDistance = (dist) => {
    dispatch({ type: SET_MAX_DISTANCE, payload: dist });
  };

  const setLocationId = (id) => {
    dispatch({ type: SET_LOCATION_ID, payload: id });
  };

  return (
    <LocationContext.Provider
      value={{
        coords: state.coords,
        places: state.places,
        maxDistance: state.maxDistance,
        locationId: state.locationId,
        setCoords,
        setMaxDistance,
        setLocationId,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};

export default LocationState;
