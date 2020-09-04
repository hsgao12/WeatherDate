import React from 'react';

import LocationContext from '../../Context/location/locationContext.js';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';

import '@reach/combobox/styles.css';

const Search = () => {
  //Initialize usePlacesAutocomplete Library
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  //Initialize location context
  const locationContext = React.useContext(LocationContext);

  //Return JSX Element
  return (
    <>
      <Combobox
        onSelect={async (address) => {
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            console.log(results[0]);

            locationContext.setCoords({ lat, lng });
            locationContext.setLocationId(results[0].place_id);
            locationContext.setLocationWeather({ lat, lng });
            setValue(address);
            console.log(results[0]);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder={'Where are you going?'}
        />
        <ComboboxPopover>
          {status === 'OK' &&
            data.map(({ id, description }) => (
              <ComboboxOption
                key={locationContext.locationId}
                value={description}
              />
            ))}
        </ComboboxPopover>
      </Combobox>
    </>
  );
};

export default Search;
