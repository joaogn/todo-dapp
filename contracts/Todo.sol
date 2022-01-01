// SPDX-License-Identifier: MIT
pragma solidity >=0.8.6;

contract Todo {

    struct Task {
      uint256 id;
      string text;
      uint256 date;   
      bool finished;
    }

  mapping(address => Task[]) public userTasks;


  function createTask(string memory text,uint256 date) external {
    uint256 lastId = userTasks[msg.sender].length;
 
    userTasks[msg.sender].push(Task({id: lastId +1, text: text, date: date, finished: false  }));
  }

  function getTaks() public view returns(Task[] memory) {
    return userTasks[msg.sender];
  }

  function getTask(uint256 taskId) public view returns(Task memory) {
    return userTasks[msg.sender][taskId - 1];
  }
  
}