import React, { createContext, useEffect, useState } from 'react';
import { ethers} from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = createContext();

const { ethereum } = window;
const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({
        provider,
        signer,
        transactionContract
    });
}

export const TransactionsDataProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [inputFormData, setInputFormData] = useState({
        addressTo: "", 
        amount:"",
        keyword:"",
        message:""
    });

    const handleChange = (e, name) => {
        setInputFormData((prevState) => ({...prevState, [name]: e.target.value}));
    };

    const checkIfWalletIsConnected = async() => {

        try {
            if(!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({method:'eth_accounts'});

            console.log(accounts);

            if(accounts.length){
                setCurrentAccount(accounts[0]);
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
    },[]);

    
    const connectWallet = async() => {

        try {
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({method:'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error('No Ethereum Object');
        }
    }


    const sendTransaction = async() => {
        alert("Install metamask to continue");
    }
    

    return (
        <TransactionContext.Provider value={{
            connectWallet,
            handleChange,
            inputFormData,
            currentAccount,
            sendTransaction,
            getEthereumContract
        }}>
            {children}
        </TransactionContext.Provider>
    )
};

