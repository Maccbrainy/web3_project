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
    const [ transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

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
                
                //getAllTransaction();
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
                    amount: parsedAmount._hex
                }]
            });
            //Transaction hash which is the transaction id
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            setIsLoading(true);
            console.log(`Loading -${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`success -${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();

            setTransactionCount(transactionCount.toNumber());

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    }
    

    return (
        <TransactionContext.Provider value={{
            connectWallet,
            handleChange,
            inputFormData,
            currentAccount,
            sendTransaction,
            isLoading,
            getEthereumContract
        }}>
            {children}
        </TransactionContext.Provider>
    )
};

