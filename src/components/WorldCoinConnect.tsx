import { IDKitWidget } from '@worldcoin/idkit'
import { env } from 'process';
import React from 'react';

export function WorldCoinConnect() {

  const [isVerified, setIsVerified] = React.useState(false);

  const onSuccess = (data: any) => {
    setIsVerified(true);
  }

  const handleVerify = (data: any) => {
  }

  return (
    <div className="m-10">

      {isVerified && (
        <h2>User is World ID Verified</h2>
      )
      }
      {!isVerified && (
        <IDKitWidget
          app_id={import.meta.env.VITE_WORLDCOIN_APP_ID} // obtained from the Developer Portal
          onSuccess={onSuccess} // callback when the modal is closed
          handleVerify={handleVerify} // optional callback when the proof is received
          credential_types={['orb', 'phone']} // optional, defaults to ['orb']
          enableTelemetry // optional, defaults to false
        >
          {({ open }) => <button onClick={open} className="px-6 py-2" style={{ background: "#ffb703", color: "black", borderRadius: "12px" }}>Verify with World ID</button>}
        </IDKitWidget>
      )
      }

    </div>
  );
}