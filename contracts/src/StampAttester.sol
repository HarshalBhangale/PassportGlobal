// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {IEAS, AttestationRequest, AttestationRequestData} from "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
import {NO_EXPIRATION_TIME, EMPTY_UID} from "@ethereum-attestation-service/eas-contracts/contracts/Common.sol";

contract StampAttester {
  error StampAttester__InvalidEAS();

  bytes32 immutable stampSchemaUID;
  // 0x4cd28cb0df7781390ccdf919b8854daa9e34ebbe6e2f7724980b7f0ddbb38ed3;

  /// @dev address of the global EAS contract.
  IEAS private immutable _eas;

  constructor(address eas, bytes32 stampSchemaUID_) {
    if (address(eas) == address(0)) {
      revert StampAttester__InvalidEAS();
    }

    stampSchemaUID = stampSchemaUID_;
    _eas = IEAS(eas);
  }

  function grantStamp(
    address recipient,
    uint256 lng,
    uint256 lat,
    string calldata country
  ) external returns (bytes32) {
    return
      _eas.attest(
        AttestationRequest({
          schema: stampSchemaUID,
          data: AttestationRequestData({
            recipient: recipient, // Recipient of the stamp
            expirationTime: NO_EXPIRATION_TIME, // No expiration time
            revocable: false,
            refUID: EMPTY_UID, // No references UI
            data: abi.encode(lng, lat, country, block.timestamp), // Encode all the data
            value: 0 // No value/ETH
          })
        })
      );
  }
}
