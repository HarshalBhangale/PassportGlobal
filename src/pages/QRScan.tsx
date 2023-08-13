import { useNavigate } from "react-router-dom";
import { useAccount ,useWaitForTransaction} from 'wagmi';
import {
  usePassportGlobalGetPassport,
  usePreparePassportGlobalGrantStamp,
  usePassportGlobalGrantStamp,
} from '../generated';

export function QRScanPage() {
  const { searchParams } = new URL(window.location.toString());
  const target = searchParams.get('target') as '0x';
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const country = searchParams.get('country');
  const account = useAccount();
  const navigate = useNavigate();
  const { data: passport, isLoading: passportLoading } = usePassportGlobalGetPassport({
    args: [account.address!],
  });
  const { config, isLoading: grantStampPreparing } = usePreparePassportGlobalGrantStamp({
    args: [
      target,
      BigInt(Math.round(Number(lat) * 10**6)),
      BigInt(Math.round(Number(lng) * 10**6)),
      country!,
    ],
  });
  const { data, write: grantStamp, isLoading: grantStampDoing } = usePassportGlobalGrantStamp(config);
  const { isLoading: grantStampWaiting } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => navigate(`/account=${target}`),
  });
  if (!passportLoading) {
    const [name] = passport;
    return (
      <div className="text-center pt-10">
        {grantStampPreparing && <div className="mt-4">Just a moment…</div>}
        {grantStampDoing && <div className="mt-4">Granting a stamp…</div>}
        {grantStampWaiting && <div className="mt-4">Confirming the transaction on chain…</div>}
        {
          !(grantStampPreparing || grantStampDoing || grantStampWaiting) &&
          <>
            <div className="text-2xl">Do you confirm meeting <span className="text-green-500">{name}</span> in <span className="text-purple-500">{country}</span>?</div>
            <div className="mt-20">
              <button className="btn btn-lg bg-yellow-500 text-black w-52" onClick={grantStamp}>Yes we've met</button>
            </div>
            <div className="mt-10">
              <button className="btn btn-lg bg-red-500 text-white w-52" onClick={() => navigate('/')}>No (Cancel)</button>
            </div>
          </>
        }
      </div>
    );
  }
  return <div>Loading...</div>;
}