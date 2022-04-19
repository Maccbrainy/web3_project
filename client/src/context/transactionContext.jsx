import React, { createContext, useEffect, useState } from 'react';
import { ethers} from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = createContext();

const { ethereum } = window;
const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    // console.log({
    //     provider,
    //     signer,
    //     transactionContract
    // });
    return transactionContract;
}

export const TransactionsDataProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [inputFormData, setInputFormData] = useState({
        addressTo: "", 
        amount:"",
        keyword:"",
        message:""
    });
    const [ isLoading, setIsLoading] = useState(false);
    const [ isTransactionLoading, setIsTransactionLoading] = useState(false);
    const [ transactionIsNotAvailable, setTransactionIsNotAvailable] = useState(false);
    const [ transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e, name) => {
        setInputFormData((prevState) => ({...prevState, [name]: e.target.value}));
    };

    const getTransactions = async() => {

        try {
            if(ethereum){
                setIsTransactionLoading(true);
                const transactionContract = getEthereumContract();
                const allTransactions = await transactionContract.getAllTransactions();

                const structuredTransactions = allTransactions.map((transaction) => ({
                    addressTo: transaction.reciever,
                    addressFrom: transaction.sender,
                    amount: parseInt(transaction.amount._hex)/(10**18),
                    message: transaction.message,
                    keyword: transaction.keyword,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                }));
                setIsTransactionLoading(false);
                console.log(structuredTransactions);
                setTransactions(structuredTransactions); 
            }else {
                console.log("Ethereum transaction is not present");
                setTransactionIsNotAvailable(true);
            }        
        } catch (error) {
            console.log(error)
            throw new Error();
        }
    }
    const checkIfTransactionExist = async() => {
        try {
            if(ethereum){
                const transactionContract = getEthereumContract();
                const currrentTransactionCount = await transactionContract.getAllTransactionCount();

                window.localStorage.setItem("transactionCount", currrentTransactionCount);
            }
            
        } catch (error) {
            console.log(error);
            throw new Error('No ethereum object found for transaction!');
        }
    };

    const checkIfWalletIsConnected = async() => {

        try {
            if(!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({method:'eth_accounts'});

            console.log(accounts);

            if(accounts.length){
                setCurrentAccount(accounts[0]);
                
                getTransactions();

            }else {
            console.log('No Account Found');
            }
        } catch (error) {
            console.log(error);
            throw new Error('No ethereum object found!');
        }
        
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionExist();
    },[transactionCount]);

    
    const connectWallet = async() => {

        try {
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({method:'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
            window.location.reload();
        } catch (error) {
            console.log(error);
            throw new Error('No Ethereum Object');
        }
    }

    const reCheckCurrentAccount= async() => {
        try {
            if(ethereum) return alert("Account is connected");
        } catch (error) {
            console.log(error);
        }
    }


    const sendTransaction = async() => {
        try {
            if(!ethereum) return alert("Please install metamask");
            const {addressTo, amount, keyword, message} = inputFormData;
            const transactionContract = getEthereumContract();
            //Ethereum transaction. 
            //Send ethereum from one address to another
            const parsedAmount = ethers.utils.parseEther(amount);
            await ethereum.request({
                method:'eth_sendTransaction',
                params:[{
                    from:currentAccount,
                    to: addressTo,
                    gas:'0x5208', //21000 GWEI
                    value: parsedAmount._hex
                }]
            });
            //Transaction hash which is the transaction id
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            setIsLoading(true);
            console.log(`Transaction Hash: ${transactionHash}`);
            console.log(`Loading -${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`success -${transactionHash.hash}`);

            const transactionCount = await transactionContract.getAllTransactionCount();

            setTransactionCount(transactionCount.toNumber());

            console.log(transactionCount.toNumber());
            
            window.location.reload();

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    }
    

    return (
        <TransactionContext.Provider value={{
            connectWallet,
            transactions,
            isTransactionLoading,
            reCheckCurrentAccount,
            handleChange,
            inputFormData,
            currentAccount,
            sendTransaction,
            isLoading,
            transactionCount,
            transactionIsNotAvailable,
        }}>
            {children}
        </TransactionContext.Provider>
    )
};

