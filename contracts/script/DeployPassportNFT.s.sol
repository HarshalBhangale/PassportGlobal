// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {Script} from "forge-std/Script.sol";
import {PassportGlobal} from "../src/PassportNFT.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

contract DeployPassportNFT is Script {
  function run() external returns (PassportGlobal passport) {
    HelperConfig helperConfig = new HelperConfig();
    (address eas, bytes32 stampSchemaUID) = helperConfig.activeConfig();
    vm.startBroadcast();
    passport = new PassportGlobal(eas, stampSchemaUID);
    vm.stopBroadcast();
  }
}
