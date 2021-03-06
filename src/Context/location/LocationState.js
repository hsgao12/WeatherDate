import React, { useReducer } from 'react';
import LocationContext from './locationContext.js';
import LocationReducer from './locationReducer.js';

import {
  SET_LNG_LAT,
  SET_MAX_DISTANCE,
  SET_LOCATION_ID,
  SET_LOCATION_WEATHER,
  SET_PLACES,
  FILTER_PLACES,
} from '../types.js';
import axios from 'axios';
import { GoogleMap } from '@react-google-maps/api';

const proxy = 'http://127.0.0.1:8080/';

const LocationState = (props) => {
  const initialState = {
    coords: { lat: 49.246292, lng: -123.116226 }, //default to vancouver coords
    places: [],
    maxDistance: 5,
    locationId: '',
    locationWeather: { weather: '', temp_c: '', weatherCode: '' },
    showButton: false,
  };

  const [state, dispatch] = useReducer(LocationReducer, initialState);

  //Set Coordinates for initial location
  const setCoords = (coords) => {
    dispatch({ type: SET_LNG_LAT, payload: coords });
  };

  //Set max distance away from initial location
  const setMaxDistance = (dist) => {
    dispatch({ type: SET_MAX_DISTANCE, payload: dist });
  };

  //Set initial location ID
  const setLocationId = (id) => {
    dispatch({ type: SET_LOCATION_ID, payload: id });
  };

  //Set weather for current location
  const setLocationWeather = async ({ lat, lng }) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_KEY}&units=metric`
    );
    const weather = res.data.weather[0].main;
    const temp_c = res.data.main.feels_like;
    const weather_code = res.data.weather[0].id;
    dispatch({
      type: SET_LOCATION_WEATHER,
      payload: { weather, temp_c, weather_code },
    });
  };

  //Initialize places array with stuff, then filter it
  const setPlaces = async () => {
    const touristResults = await axios.get(
      `${proxy}https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${
        process.env.REACT_APP_GOOGLE_API_KEY
      }&location=${state.coords.lat},${state.coords.lng}&radius=${
        state.maxDistance * 1000
      }&opennow
      &type=tourist_attraction`
    );

    const touristResultsArray = touristResults.data.results;

    const restaurantResults = await axios.get(`${proxy}https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${
      process.env.REACT_APP_GOOGLE_API_KEY
    }&location=${state.coords.lat},${state.coords.lng}&radius=${
      state.maxDistance * 1000
    }&opennow
    &keyword=food`);

    const restaurantResultsArray = restaurantResults.data.results;

    const resultsPayload = touristResultsArray.concat(restaurantResultsArray);

    dispatch({
      type: SET_PLACES,
      payload: { weather: state.locationWeather, places: resultsPayload },
    });
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
        setPlaces,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};

export default LocationState;
