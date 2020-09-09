import React from 'react';
import { InfoWindow } from '@react-google-maps/api';
import Ratings from 'react-ratings-declarative';
import MapContext from '../../Context/map/mapContext';

const InformationWindow = () => {
  const mapContext = React.useContext(MapContext);
  return (
    <InfoWindow
      position={{
        lat: mapContext.selected.geometry.location.lat,
        lng: mapContext.selected.geometry.location.lng,
      }}
      onCloseClick={() => {
        mapContext.setSelected(null);
      }}
    >
      <div>
        <div>
          <h4>{mapContext.selected.name}</h4>
          <p>{mapContext.selected.formatted_address}</p>
          {mapContext.selected.website && (
            <a href={mapContext.selected.website} target="_blank">
              Link
            </a>
          )}
        </div>
        <Ratings
          rating={mapContext.selected.rating}
          widgetRatedColors="blue"
          widgetDimensions="15px"
        >
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
        </Ratings>
      </div>
    </InfoWindow>
  );
};

export default InformationWindow;
