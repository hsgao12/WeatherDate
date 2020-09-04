import {
  SET_LNG_LAT,
  SET_MAX_DISTANCE,
  SET_LOCATION_ID,
  SET_LOCATION_WEATHER,
  SET_PLACES,
  FILTER_PLACES,
} from '../types.js';

const tooCold = (place) => {
  return (
    !place.types.contains('lodging') &&
    (place.types.contains('bar') ||
      place.types.contains('cafe') ||
      place.types.contains('movie_theater') ||
      place.types.contains('clothing_store') ||
      place.types.contains('department_store') ||
      place.types.contains('gym') ||
      place.types.contains('art_gallery') ||
      place.types.contains('museum') ||
      place.types.contains('bowling_alley') ||
      place.types.contains('aquarium') ||
      place.types.contains('spa'))
  );
};

const goodTemp = (place) => {
  return (
    !place.types.contains('lodging') &&
    (place.types.contains('restaurant') ||
      place.types.contains('bar') ||
      place.types.contains('cafe') ||
      place.types.contains('movie_theater') ||
      place.types.contains('clothing_store') ||
      place.types.contains('department_store') ||
      place.types.contains('gym') ||
      place.types.contains('art_gallery') ||
      place.types.contains('museum') ||
      place.types.contains('bowling_alley') ||
      place.types.contains('aquarium') ||
      place.types.contains('spa') ||
      place.types.contains('park') ||
      place.types.contains('zoo'))
  );
};

export default (state, action) => {
  switch (action.type) {
    case SET_LNG_LAT:
      return {
        ...state,
        coords: action.payload,
        showButton: true,
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
    case SET_LOCATION_WEATHER:
      return {
        ...state,
        locationWeather: action.payload,
      };
    case SET_PLACES:
      return {
        ...state,
        places: action.payload,
      };
    case FILTER_PLACES:
      const { weather, placesList } = action.payload;
      if (weather.weather_code < 800 || weather.temp_c < 5) {
        //too cold
        placesList = placesList.filter(tooCold);
      } else {
        placesList = placesList.filter(goodTemp);
      }
      return {
        ...state,
        places: placesList,
      };
    default:
      console.log(action.type);
  }
};
