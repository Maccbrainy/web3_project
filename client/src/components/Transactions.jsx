import { useContext } from "react";
import {TransactionContext}  from "../context/transactionContext";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionCard = () => {
   return(<div></div>)
}

const Transactions = () => {
    const {currentAccount} = useContext(TransactionContext);
    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
                { currentAccount ? (<h1 className="text-white text-center font-normal text-2xl">Latest Transactions</h1>) : (<h1 className="text-white text-center font-normal text-2xl">Connect your account to see the latest transactions</h1>)}

                <div className="flex flex-wrap justify-center items-center mt-10">
                    {[...dummyData].reverse().map((transaction, index) => (
                        <TransactionCard key={index} {...transaction} />
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Transactions;