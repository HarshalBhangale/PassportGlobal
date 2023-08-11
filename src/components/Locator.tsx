import { useState, useEffect } from 'react'
import { Loader } from "@googlemaps/js-api-loader"
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import QRCode from 'react-qr-code';

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  version: "weekly",
});

export function Locator() {
  const [query, setQuery] = useState('');
  const [imported, setImported] = useState(false);
  const [value, setValue] = useState(null);
  useEffect(() => {
    loader.importLibrary("places").then((api) => {
      setImported(true);
    });
  }, []);
  async function selectAddress(address: string) {
    const [result] = await geocodeByAddress(address);
    setValue(await getLatLng(result));
  }
  function makeUrl() {
    const { lat, lng } = value;
    return `${window.location.origin}/stamp?lat=${lat}&lng=${lng}`;
  }
  if (!imported) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <PlacesAutocomplete
        value={query}
        onChange={setQuery}
        onSelect={(value: string) => { setQuery(value); selectAddress(value); }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="dropdown block mx-auto">
            <input
              {...getInputProps()}
              placeholder='Search Places ...'
              className='w-full py-2 pl-3 pr-10 text-sm leading-5 border-2'
            />
              {loading && <div>Loading...</div>}
              {
                suggestions?.length > 0 &&
                <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  {suggestions.map(suggestion => {
                    return (
                      <li>
                        <a {...getSuggestionItemProps(suggestion)}><span>{suggestion.description}</span></a>
                      </li>
                    );
                  })}
                </ul>
              }
          </div>
          )}
      </PlacesAutocomplete>
      {
        value && (
          <a href={makeUrl()} target="_blank" className="block bg-white p-5">
            <QRCode className="mx-auto" value={makeUrl()} />
          </a>
        )
      }
    </>
  );
}
