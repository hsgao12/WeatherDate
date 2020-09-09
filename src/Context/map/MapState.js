import React, { useReducer } from 'react';
import MapContext from './mapContext.js';
import MapReducer from './mapReducer.js';

import { SET_SELECTED } from '../types.js';
import axios from 'axios';

const proxy = 'http://127.0.0.1:8080/';

const MapState = (props) => {
  const initialState = {
    selected: null,
  };

  const [state, dispatch] = useReducer(MapReducer, initialState);

  //Sets the selected state to the location of info of the marker that is clicked
  const setSelected = async (place_id) => {
    if (place_id === null) {
      //close window by setting selected to null
      dispatch({ type: SET_SELECTED, payload: null });
    } else {
      //get location details by place_id
      //Get location details from api
      const res = await axios.get(
        `${proxy}https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.REACT_APP_GOOGLE_API_KEY}&place_id=${place_id}`
      );
      dispatch({ type: SET_SELECTED, payload: res.data.result });
    }
  };

  return (
    <MapContext.Provider
      value={{
        selected: state.selected,
        setSelected,
      }}
    >
      {props.children}
    </MapContext.Provider>
  );
};

export default MapState;
