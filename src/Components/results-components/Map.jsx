import React from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

import LocationContext from '../../Context/location/locationContext';

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};

const options = {
  disableDefaultUI: true,
};

const Map = () => {
  const locationContext = React.useContext(LocationContext);

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={locationContext.coords}
        options={options}
      />
    </div>
  );
};

export default Map;
