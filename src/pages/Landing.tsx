import React from 'react';
import { ConnectButton } from "@rainbow-me/rainbowkit";


export function LandingPage() {

  return (
    <>
      <div className="w-full  bg-indigo-950 flex items-center justify-center"
        style={{ height: "100vh" }}>
        <div className="flex">
          <ConnectButton />
        </div>

      </div>
    </>
  );

}