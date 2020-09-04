import React from 'react';
import Search from '../Components/home-components/Search.jsx';
import MaxDistanceInput from '../Components/home-components/MaxDistanceInput.jsx';
import LocationContext from '../Context/location/locationContext.js';
import { Link } from 'react-router-dom';

const Home = () => {
  const locationContext = React.useContext(LocationContext);
  return (
    <div>
      <Search />
      <MaxDistanceInput />
      {locationContext.showButton && (
        <Link to={`./results/${locationContext.locationId}`}>Go</Link>
      )}
    </div>
  );
};

export default Home;
