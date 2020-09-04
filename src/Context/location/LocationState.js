import React, { useReducer } from 'react';
import LocationContext from './locationContext.js';
import LocationReducer from './locationReducer.js';
import {
  SET_LNG_LAT,
  SET_MAX_DISTANCE,
  SET_LOCATION_ID,
  SET_LOCATION_WEATHER,
} from '../types.js';
import axios from 'axios';

const LocationState = (props) => {
  const initialState = {
    coords: { lat: 49.246292, lng: -123.116226 },
    places: [],
    maxDistance: 0,
    locationId: '',
    locationWeather: null,
    showButton: false,
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

  const setLocationWeather = async ({ lat, lng }) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_KEY}&units=metric`
    );
    const weather = res.data.weather[0].main;
    const temp_c = res.data.main.feels_like;
    dispatch({ type: SET_LOCATION_WEATHER, payload: { weather, temp_c } });
  };

  return (
    <LocationContext.Provider
      value={{
        coords: state.coords,
        places: state.places,
        maxDistance: state.maxDistance,
        locationId: state.locationId,
        showButton: state.showButton,
        locationWeather: state.locationWeather,
        setCoords,
        setMaxDistance,
        setLocationId,
        setLocationWeather,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};

export default LocationState;
