import { useState } from 'react'
import { useAccount } from 'wagmi';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import QRCode from 'react-qr-code';
import { GooglePlacesAPI } from './GooglePlacesAPI';

export function Locator() {
  const account = useAccount();
  const [query, setQuery] = useState('');
  const [value, setValue] = useState(null);
  async function selectAddress(address: string) {
    const [result] = await geocodeByAddress(address);
    const { lat, lng } = await getLatLng(result);
    setValue({ lat, lng });
  }
  function makeUrl() {
    const { lat, lng } = value;
    const url = new URL(`${window.location.origin}/qr-scan`);
    url.searchParams.set('target', account.address);
    url.searchParams.set('place', query);
    url.searchParams.set('lat', lat);
    url.searchParams.set('lng', lng);
    return url.toString();
  }
  return (
    <GooglePlacesAPI>
      <label className="label">Search for a place:</label>
      <PlacesAutocomplete
        value={query}
        onChange={setQuery}
        onSelect={(value: string) => { setQuery(value); selectAddress(value); }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="dropdown block wd-full">
            <input
              {...getInputProps()}
              placeholder='Start typing and then choose...'
              className='input w-full'
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
          <div className="text-center mt-20 mb-10">
            <a href={makeUrl()} target="_blank" className="inline-block bg-white p-5 mb-5">
              <QRCode className="mx-auto" value={makeUrl()} />
            </a>
          </div>
        )
      }
    </GooglePlacesAPI>
  );
}
