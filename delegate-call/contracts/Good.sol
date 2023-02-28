// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Good {
  address public helper; //0X123
  address public owner;
  uint256 public num;

  constructor(address _helper) {
    helper = _helper;
    owner = msg.sender;
  }

  function setNum(uint256 _num) public {
    (bool success, ) = helper.delegatecall(
      abi.encodeWithSignature("setNum(uint256)", _num)
    );
    require(success);
  }
}

contract Helper {
  uint256 public num;

  function setNum(uint256 _num) public {
    num = _num;
  }
}
