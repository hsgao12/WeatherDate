import React from 'react';
import './App.css';
import Search from './Components/Search';
import { useLoadScript } from '@react-google-maps/api';
import LocationState from './Context/location/LocationState.js';

const libraries = ['places'];

function App() {
  //Load Google Maps Scripts
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: libraries,
  });
  console.log(process.env.REACT_APP_GOOGLE_API_KEY);

  if (loadError) {
    return 'ERROR LOADING SCRIPTS';
  }

  if (!isLoaded) {
    return 'LOADING';
  }

  return (
    <LocationState>
      <div className="App">
        <Search />
      </div>
    </LocationState>
  );
}

export default App;
