// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "@opengsn/contracts/src/BaseRelayRecipient.sol";

contract SimpleStorage is BaseRelayRecipient {

  constructor(address forwarder) {
      trustedForwarder = forwarder;
  }

  uint storedData = 0;

  

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }

  function versionRecipient() external override view returns (string memory) {
		return "2.2.0";
	}
}