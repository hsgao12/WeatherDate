import React from 'react';
import './App.css';

//Google Maps Modules
import { useLoadScript } from '@react-google-maps/api';
import LocationState from './Context/location/LocationState.js';

//React Routing
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Components
import Home from './Pages/Home.jsx';
import Results from './Pages/Results.jsx';

const libraries = ['places'];

function App() {
  //Load Google Maps Scripts
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: libraries,
  });

  if (loadError) {
    return 'ERROR LOADING SCRIPTS';
  }

  if (!isLoaded) {
    return 'LOADING';
  }

  return (
    <LocationState>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/results/:locationId" component={Results} />
          </Switch>
        </div>
      </Router>
    </LocationState>
  );
}

export default App;
