// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import {StampAttester} from "./StampAttester.sol";

contract PassportGlobal is ERC721, StampAttester {
  using Counters for Counters.Counter;

  /** Type declarations */
  struct User {
    string name;
    uint256 issueDate;
    string description;
  }

  /** Errors */
  error PassportGlobal__NotTransferable();
  error PassportGlobal__AddressCanOnlyMintOnce(address addr);

  /** State variables */
  Counters.Counter private _tokenIdCounter;

  mapping(address => uint256) private UserToPassportId;
  mapping(uint256 => User) private PassportIdToUser;

  /** constructor */
  constructor(
    address eas,
    bytes32 stampSchemaUID
  ) ERC721("PassportGlobal", "PPG") StampAttester(eas, stampSchemaUID) {
    // reserve token id 0 for no passport
    _tokenIdCounter.increment();
  }

  /** External functions */
  function createPassport(
    string calldata name,
    string calldata description
  ) external {
    if (hasPassport(msg.sender)) {
      revert PassportGlobal__AddressCanOnlyMintOnce(msg.sender);
    }
    PassportIdToUser[_tokenIdCounter.current()] = User({
      name: name,
      issueDate: block.timestamp,
      description: description
    });
    safeMint(msg.sender);
  }

  function deletePassport() external {
    _burn(UserToPassportId[msg.sender]);

    delete UserToPassportId[msg.sender];
    delete PassportIdToUser[UserToPassportId[msg.sender]];
  }

  /** View functions */
  function getPassportId(address user) external view returns (uint256) {
    return UserToPassportId[user];
  }

  function hasPassport(address user) public view returns (bool) {
    return UserToPassportId[user] != 0;
  }

  function getPassport(
    address user
  )
    external
    view
    returns (string memory name, uint256 issueDate, string memory description)
  {
    uint256 passportId = UserToPassportId[user];
    User memory data = PassportIdToUser[passportId];
    return (data.name, data.issueDate, data.description);
  }

  /** Internal/Private functions */
  function safeMint(address to) internal {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(to, tokenId);
    UserToPassportId[to] = tokenId;
  }

  ///@dev this makes the token non-transferable
  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 /** tokenId */
  ) internal pure override {
    if (from != address(0) && to != address(0))
      // checks if minting or burning
      revert PassportGlobal__NotTransferable();
  }
}
