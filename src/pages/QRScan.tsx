import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAccount } from 'wagmi';
import { usePassportGlobalGetPassport, usePassportGlobalGetPassportId, usePassportGlobalHasPassport } from '../generated';

export function QRScanPage() {
  const { searchParams } = new URL(window.location.toString());
  const target = searchParams.get('target');
  const country = searchParams.get('country');
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const account = useAccount();
  const navigate = useNavigate();
  const { data: passport, isLoading: passportLoading } = usePassportGlobalGetPassport({
    args: [account.address!],
  });
  function createStamp() {
    // Use `target` (as chain address), `lat`, `lng`, `country`...
    //TODO: Create attestation via AttestationStation
    //TODO: Wait for transaction to complete
    navigate(`/?account=${target}`); //TODO: Support viewing Passports by ID
  }
  if (!passportLoading) {
    const [name] = passport;
    return (
        <div className="text-center pt-10">
          <div className="text-2xl">Do you confirm meeting <span className="text-green-500">{name}</span> in <span className="text-purple-500">{country}</span>?</div>
          <div className="mt-20">
            <button className="btn btn-lg bg-yellow-500 text-black w-52" onClick={createStamp}>Yes we've met</button>
          </div>
          <div className="mt-10">
            <button className="btn btn-lg bg-red-500 text-white w-52" onClick={() => navigate('/')}>No (Cancel)</button>
          </div>
        </div>
    );
  }
  return <div>Loading...</div>;
}