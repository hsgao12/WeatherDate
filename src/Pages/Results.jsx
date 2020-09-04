import React from 'react';
import LocationContext from '../Context/location/locationContext.js';
import Map from '../Components/results-components/Map.jsx';

const Results = () => {
  const locationContext = React.useContext(LocationContext);

  return <Map />;
};

export default Results;
