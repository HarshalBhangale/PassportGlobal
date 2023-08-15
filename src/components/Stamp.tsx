import React, { useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { usePassportGlobalGetAttestation } from "../generated";
import { useEnsName, useEnsAddress } from "wagmi";

export function Stamp({ uid }) {
  const splitGuid = () => {
    return [uid.slice(0, 6), uid.slice(-4)];
  };
  const [firstHalf, secondHalf] = splitGuid();
  const [isCopied, setIsCopied] = useState(false);
  // // getAttestation
  const { data: attestation, isLoading: attestationLoading } =
    usePassportGlobalGetAttestation({
      args: [uid!],
    });
  if (!attestationLoading) {
    const attestationArray = attestation?.toString().split(",");
    const attestationDateNumber = parseInt(attestationArray[4], 10);
    const attestationDate = new Date(attestationDateNumber * 1000);
    return (
      <div className="m-10">
        <img
          src="../assets/world-travel-stamp.jpeg"
          alt={`Stamp for ${attestationArray[3]}`}
          className="inline-block h-24"
        />
        <div className="text-center py-1">
          <div style={{ marginRight: "10px" }}>
            <div>
              <b>Attestation Uid: </b>
              {firstHalf}...{secondHalf}
              <CopyToClipboard
                text={uid}
                onCopy={() => setIsCopied(true)}
                className="ml-2"
              >
                <button>
                  <i className="fa fa-copy"></i>
                </button>
              </CopyToClipboard>
            </div>
            <div>
              <p>
                <b>Recipient: </b>
                {attestationArray[0].substring(0, 6)}...
                {attestationArray[0].slice(-4)}
                <CopyToClipboard
                  text={attestationArray[0]}
                  onCopy={() => setIsCopied(true)}
                  className="ml-2"
                >
                  <button>
                    <i className="fa fa-copy"></i>
                  </button>
                </CopyToClipboard>
              </p>
            </div>
            <p>
              <b>Longitude:</b> {attestationArray[1]}
            </p>
            <p>
              <b>Latitude:</b> {attestationArray[2]}
            </p>
            <p>
              <b>Country/City:</b> {attestationArray[3]}
            </p>
            <p>
              <b>Date:</b> {attestationDate.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
