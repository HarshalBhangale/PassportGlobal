// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PassportGlobal is ERC721 {
  using Counters for Counters.Counter;

  /** Errors */
  error PassportGlobal__NotTransferable();

  Counters.Counter private _tokenIdCounter;

  /** constructor */
  constructor() ERC721("PassportGlobal", "PPG") {}

  /** External functions */
  function mint() external {
    safeMint(msg.sender);
  }

  /** Internal/Private functions */
  function safeMint(address to) internal {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(to, tokenId);
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
