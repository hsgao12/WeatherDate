import {
  SET_LNG_LAT,
  SET_MAX_DISTANCE,
  SET_LOCATION_ID,
  SET_LOCATION_WEATHER,
  SET_PLACES,
  FILTER_PLACES,
} from '../types.js';

const tooCold = (place) => {
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
      place.types.contains('spa'));
};

const goodTemp = (place) => {
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
      place.types.contains('zoo'));
};

export default (state, action) => {
  const { weather, placesList } = action.payload;

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
      const { weather, places } = action.payload;
      let newPlaces = [];

      places.sort(function (place1, place2) {
        return place2.rating - place1.rating;
      });
      //console.log(places);

      if (weather.weatherCode < 800 || weather.temp_c < 5) {
        //filters out outdoor activities if bad weather
        newPlaces = places.filter((place) => {
          return !place.types.includes('park');
        });
      }

      newPlaces = places.filter((place) => {
        //filters out all lodging
        return !(
          place.types.includes('lodging') ||
          place.types.includes('place_of_worship')
        );
      });

      if (newPlaces.length > 20) {
        newPlaces = newPlaces.slice(0, 20);
      }

      return {
        ...state,
        places: newPlaces,
      };
    default:
      console.log(action.type);
  }
};
