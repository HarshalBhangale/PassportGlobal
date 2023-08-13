import { usePassportGlobalGetStamps } from '../generated';
import { Stamp } from './Stamp';

export function StampListing({ address }) {

  const { data: uids } = usePassportGlobalGetStamps({
    args: [address!],
  });
  console.log(uids);

  return (
    <>
      {uids?.map((uid) =>
        <div key={uid} className="py-3 ">
          <div className="py-3 bg-yellow-400 rounded-xl" >
            <Stamp uid={uid} />
          </div>
        </div>
      )}
    </>
  );
}