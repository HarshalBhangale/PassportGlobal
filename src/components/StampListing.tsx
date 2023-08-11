import { Stamp } from './Stamp';

export function StampListing({ address }) {
  //TODO: Load actual stamps by interacting with the AttestationStation contract
  const stamps = [
    { country: 'Germany', lat: 44.333333, lng: 11.2222222, timestamp: 1691773134 },
    { country: 'Italy', lat: 22.123455, lng: 42.12446425, timestamp: 1691773135 },
    { country: 'Romania', lat: 17.134632, lng: 12.1356743, timestamp: 1691773136 },
  ];
  return (
    <>
    {stamps.map(({ country }) => <Stamp country={country}/>)}
    </>
  );
}