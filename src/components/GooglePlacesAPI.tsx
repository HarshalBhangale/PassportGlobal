import { useState, useEffect } from 'react'
import { Loader } from "@googlemaps/js-api-loader"

export const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  version: "weekly",
  language: "en",
});

export function GooglePlacesAPI({ children }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    loader.importLibrary("places").then(() => {
      setLoaded(true);
    });
  }, []);
  if (loaded) {
    return children;
  }
  return <div>Loading...</div>;
}