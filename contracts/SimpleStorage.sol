// SPDX-License-Identifier: MIT
pragma solidity >=0.8.6;

import "@opengsn/contracts/src/BaseRelayRecipient.sol";

contract SimpleStorage is BaseRelayRecipient {

  constructor(address forwarder) {
      _setTrustedForwarder(forwarder);
  }

  uint storedData = 0;

  

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }

  function versionRecipient() external override pure returns (string memory) {
		return "2.2.0";
	}
}