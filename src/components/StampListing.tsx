import { usePassportGlobalGetAttestation, usePassportGlobalGetStamps } from '../generated';
import { Stamp } from './Stamp';

export function StampListing({ address }) {
  const { data: stampUIDs, isLoading: passportLoading } = usePassportGlobalGetStamps({
    args: [address],
  });
  // TODO: get stamp data from the blockchain
  // usePassportGlobalGetAttestation({args: [/*stampUID*/]})
  // => returns [recpient, lng, lat, country, timestamp]
  return (
    <>
    {stampUIDs?.map((stampUID) => <Stamp country={stampUID}/>)}
    {/* {stamps.map(({ country }) => <Stamp country={country}/>)} */}
    </>
  );
}