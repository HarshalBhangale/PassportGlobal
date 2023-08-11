// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {Test} from "forge-std/Test.sol";
import {PassportGlobal} from "../src/PassportNFT.sol";

contract PassportNFTTest is Test {
  PassportGlobal passportGlobal;
  address USER = makeAddr("user");
  address ANOTHER_USER = makeAddr("another user");

  uint256 constant STARTING_AMOUNT = 1 ether;

  function setUp() external {
    passportGlobal = new PassportGlobal();
    vm.deal(USER, STARTING_AMOUNT);
  }

  modifier passportMinted() {
    vm.prank(USER);
    passportGlobal.createPassport();
    _;
  }

  function testUserCanCreatePassport() external passportMinted {
    assertEq(passportGlobal.balanceOf(USER), 1);
    assertEq(passportGlobal.ownerOf(0), USER);
  }

  function testUserCanOnlyCreatePassportOnce() external passportMinted {
    vm.expectRevert(
      abi.encodeWithSelector(
        PassportGlobal.PassportGlobal__AddressCanOnlyMintOnce.selector,
        USER
      )
    );
    vm.prank(USER);
    passportGlobal.createPassport();
  }

  function testUserCannotTransferPassport() external passportMinted {
    vm.expectRevert(
      abi.encodeWithSelector(
        PassportGlobal.PassportGlobal__NotTransferable.selector
      )
    );
    vm.prank(USER);
    passportGlobal.transferFrom(USER, ANOTHER_USER, 0);
  }
}
