import React from 'react';

import LocationContext from '../Context/location/locationContext.js';
import MaxDistanceInput from './MaxDistanceInput';

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

const libraries = ['places'];

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
    <div>
      <Combobox
        onSelect={async (address) => {
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            const id = results[0].place_id;
            console.log(id);
            locationContext.setCoords({ lat, lng });
            setValue(address);
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
              <ComboboxOption key={id} value={description} />
            ))}
        </ComboboxPopover>
      </Combobox>

      <MaxDistanceInput />
    </div>
  );
};

export default Search;
