import React, { createContext, useState } from "react";

export const TransactionContext = createContext();

export const TransactionsDataProvider = ({children}) => {
    const [inputFormData, setInputFormData] = useState({
        addressTo: "", 
        amount:"",
        keyword:"",
        message:""
    });

    const handleChange = (e, name) => {
        setInputFormData((prevState) => ({...prevState, [name]: e.target.value}));
    };

    
    const connectWallet = async() => {
        alert("Install metamask to continue")
    }


    const sendTransaction = async() => {
        alert("Install metamask to continue");
    }
    

    return (
        <TransactionContext.Provider value={{
            connectWallet,
            handleChange,
            inputFormData,
            sendTransaction
        }}>
            {children}
        </TransactionContext.Provider>
    )
};

