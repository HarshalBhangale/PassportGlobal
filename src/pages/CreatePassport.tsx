import React from 'react';
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function CreatePassportPage() {

  return (
    <>
      <div className="w-full  bg-indigo-950 flex justify-center"
        style={{ height: "100vh" }}>

        <div className="m-5" style={{ position: "absolute", float: "right", right: "15px" }}>
          <ConnectButton />
        </div>

      </div>
    </>
  );

}