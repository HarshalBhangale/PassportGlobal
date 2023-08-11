// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {Test} from "forge-std/Test.sol";
import {PassportGlobal} from "../src/PassportNFT.sol";

contract PassportNFTTest is Test {
  PassportGlobal passportGlobal;
  address USER = makeAddr("user");
  address ANOTHER_USER = makeAddr("another user");
  string constant NAME = "name";
  string constant DESCRIPTION = "description";

  uint256 constant STARTING_AMOUNT = 1 ether;

  function setUp() external {
    passportGlobal = new PassportGlobal();
    vm.deal(USER, STARTING_AMOUNT);
  }

  modifier passportMinted() {
    vm.prank(USER);
    passportGlobal.createPassport(NAME, DESCRIPTION);
    _;
  }

  function testUserCanCreatePassport() external passportMinted {
    assertEq(passportGlobal.balanceOf(USER), 1);
    assertEq(passportGlobal.ownerOf(1), USER);
  }

  function testUserCanOnlyCreatePassportOnce() external passportMinted {
    vm.expectRevert(
      abi.encodeWithSelector(
        PassportGlobal.PassportGlobal__AddressCanOnlyMintOnce.selector,
        USER
      )
    );
    vm.prank(USER);
    passportGlobal.createPassport(NAME, DESCRIPTION);
  }

  function testUserCannotTransferPassport() external passportMinted {
    vm.expectRevert(
      abi.encodeWithSelector(
        PassportGlobal.PassportGlobal__NotTransferable.selector
      )
    );
    vm.prank(USER);
    passportGlobal.transferFrom(USER, ANOTHER_USER, 1);
  }

  function testUserCanDeletePassport() external passportMinted {
    vm.prank(USER);
    passportGlobal.deletePassport();
    assertEq(passportGlobal.balanceOf(USER), 0);
  }

  function testUserCanCreatePassportAfterDeleting() external passportMinted {
    vm.prank(USER);
    passportGlobal.deletePassport();
    vm.prank(USER);
    passportGlobal.createPassport(NAME, DESCRIPTION);
    assertEq(passportGlobal.balanceOf(USER), 1);
  }

  function testUserInfoIsCorrect() external passportMinted {
    vm.prank(USER);
    (
      string memory name,
      uint256 issuanceTimestamp,
      string memory description
    ) = passportGlobal.getPassport(USER);

    assertEq(name, NAME);
    assertEq(issuanceTimestamp, block.timestamp);
    assertEq(description, DESCRIPTION);
  }
}
