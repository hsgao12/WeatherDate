import React, { useReducer } from 'react';
import axios from 'axios';
import LocationContext from './locationContext.js';
import LocationReducer from './locationReducer.js';
import { SET_LNG_LAT, SET_MAX_DISTANCE } from '../types.js';

const LocationState = (props) => {
  const initialState = {
    coords: null,
    places: [],
    maxDistance: 0,
  };

  const [state, dispatch] = useReducer(LocationReducer, initialState);

  const setCoords = (coords) => {
    dispatch({ type: SET_LNG_LAT, payload: coords });
  };

  const setMaxDistance = (dist) => {
    dispatch({ type: SET_MAX_DISTANCE, payload: dist });
  };

  return (
    <LocationContext.Provider
      value={{
        coords: state.coords,
        places: state.places,
        maxDistance: state.maxDistance,
        setCoords,
        setMaxDistance,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};

export default LocationState;
