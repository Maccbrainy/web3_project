import { useContext } from "react";
import {TransactionContext}  from "../context/transactionContext";

const Transactions = () => {
    const {currentAccount} = useContext(TransactionContext);
    return (
        <div className="gradient-bg-transactions">
           { currentAccount ? (<h1 className="text-white text-center font-normal text-2xl">Latest Transactions</h1>) : (<h1 className="text-white font-normal text-2xl">Connect your account to see the latest transactions</h1>)}
                      
        </div>
    )
}
export default Transactions;