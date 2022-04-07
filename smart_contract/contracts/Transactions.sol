//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Transactions {

    //Number variable that would hold the number of our transactions
    uint256 transactionCount;

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

    struct TransferStruct {
        address sender;
        address reciever;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions;

    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public {
        //Increment the transaction count. 
        //There is one more transaction count now than was before.
        transactionCount +=1;

        //Adding the transaction to the list of transactions
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));

        //Making a transfer of the transaction added
        //To make a transfer, the added transaction has to be emitted as below;
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    function getAllTransactions() public view returns(TransferStruct[] memory){
        return transactions;
    }

    function getAllTransactionCount() public view returns(uint256){
        return transactionCount;
    }
}
