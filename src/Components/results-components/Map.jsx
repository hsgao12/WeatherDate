import React from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

import LocationContext from '../../Context/location/locationContext';
import MapContext from '../../Context/map/mapContext';

import InformationWindow from './InformationWindow.jsx';

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
  float: 'right',
};

const options = {
  disableDefaultUI: true,
};

const Map = () => {
  const locationContext = React.useContext(LocationContext);
  const mapContext = React.useContext(MapContext);

  //Fetch, sort, and filter list of places as soon as the component is mounted
  React.useEffect(() => {
    locationContext.setPlaces();
  }, []);

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={locationContext.coords}
        options={options}
      >
        {locationContext.places.map((place) => {
          return (
            <Marker
              key={place.place_id}
              position={{
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
              }}
              onClick={() => {
                mapContext.setSelected(place.place_id);
              }}
            />
          );
        })}

        {mapContext.selected && <InformationWindow />}
      </GoogleMap>
    </div>
  );
};

export default Map;
