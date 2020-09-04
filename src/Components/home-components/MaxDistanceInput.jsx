import React from 'react';
import LocationContext from '../../Context/location/locationContext.js';

const MaxDistanceInput = () => {
  //Initialize Context
  const locationContext = React.useContext(LocationContext);

  const onChange = (e) => {
    locationContext.setMaxDistance(e.target.value);
  };

  return (
    <input
      value={locationContext.maxDistance}
      type="number"
      name="maxDist"
      placeholder="Maximum distance away from you?"
      onChange={onChange}
    />
  );
};

export default MaxDistanceInput;
