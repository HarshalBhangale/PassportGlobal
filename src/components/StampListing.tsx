import { usePassportGlobalGetStamps } from '../generated';
import { Stamp } from './Stamp';

export function StampListing({ address }) {
  const { data: uids } = usePassportGlobalGetStamps({
    args: [address!],
  });
  return (
    <>{uids?.map((uid) => <div key={uid}><Stamp uid={uid} /></div>)}</>
  );
}