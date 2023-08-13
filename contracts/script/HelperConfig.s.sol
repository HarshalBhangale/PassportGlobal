// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {Script} from "forge-std/Script.sol";

contract HelperConfig is Script {
  NetworkConfig public activeConfig;

  struct NetworkConfig {
    address easAddress;
    bytes32 stampSchemaUID;
  }

  constructor() {
    if (block.chainid == 420) {
      activeConfig = getOPGoerliConfig();
    } else if (block.chainid == 84531) {
      activeConfig = getBaseGoerliConfig();
    } else if (block.chainid == 10) {
      activeConfig = getOptimismETHConfig();
    } else if (block.chainid == 999) {
      activeConfig = getZoraTestnetConfig();
    } else {
      revert("Unsupported chain");
    }
  }

  function getOPGoerliConfig() public pure returns (NetworkConfig memory) {
    return
      NetworkConfig({
        easAddress: 0x4200000000000000000000000000000000000021,
        stampSchemaUID: 0x9a2931805efc33c05f8b52da0602d46f7f8fdfb8a1d868d11e14573b4185fa86
      });
  }

  function getBaseGoerliConfig() public pure returns (NetworkConfig memory) {
    return
      NetworkConfig({
        easAddress: 0xAcfE09Fd03f7812F022FBf636700AdEA18Fd2A7A,
        stampSchemaUID: 0x9a2931805efc33c05f8b52da0602d46f7f8fdfb8a1d868d11e14573b4185fa86
      });
  }

  function getZoraTestnetConfig() public pure returns (NetworkConfig memory) {
    return
      NetworkConfig({
        easAddress: 0x4200000000000000000000000000000000000021,
        stampSchemaUID: 0x0 //TODO: create
      });
  }

  function getOptimismETHConfig() public pure returns (NetworkConfig memory) {
    return
      NetworkConfig({
        easAddress: 0x4200000000000000000000000000000000000021,
        stampSchemaUID: 0x0 //TODO: not created yet
      });
  }
}
