import { useContext } from "react";
import {TransactionContext}  from "../context/transactionContext";
import { BsArrowRight } from "react-icons/bs";
import { Loader } from ".";
// import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionCard = ({addressFrom, addressTo, amount, message, keyword, timestamp}) => {
   return(
   <div className="bg-[#1b1a1f] m-4 flex flex-1 2xl:min-w-[450] 
   2xl:max-w-[500px] 
   sm:min-w-[270px] 
   sm:max-w-[300px] 
   min-w-full 
   flex-col p-3 rounded-2xl hover:shadow-2xl">
       <div className="flex flex-col items-center w-full mt-3">
           <div className="w-full mb-6 p-2">
              <a className="flex justify-between" href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="nonreferrer">
                <p className="text-white text-base">
                    From: <span className="hover:text-[#37c7da]">{shortenAddress(addressFrom)}</span></p>
                <BsArrowRight className="hover:text-[#fff] text-[#37c7da]"/>
            </a>
            <a className="flex justify-between" href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="nonreferrer">
                <p className="text-white text-base">To: <span className="hover:text-[#37c7da]">{shortenAddress(addressTo)}</span></p>
                <BsArrowRight className="hover:text-[#fff] text-[#37c7da]"/>
            </a>
            <p className="text-white text-base">Amount: {amount} ETH</p>
            {message && (
                <>
                <br/>
                    <p className="text-white">Message: <span className="text-xs">{message}</span></p>
                </>
            )}
            {keyword && (
                <>
                    <p className="text-white">Keyword: <span className="text-xs">{keyword}</span></p>
                </>
            )} 
           </div>
           <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
        
       </div>
       
   </div>
   )
}

const Transactions = () => {
    const {currentAccount, transactions, isTransactionLoading} = useContext(TransactionContext);
    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
                { currentAccount ? (<h1 className="text-white text-center font-normal text-2xl">Latest Transactions</h1>) : (<h1 className="text-white text-center font-normal text-2xl">Connect your account to see the latest transactions</h1>)}

                { isTransactionLoading ? <Loader height={`h-6`} width={`w-6`}/> : 
                    <div className="flex flex-wrap justify-center items-center mt-10">
                    {[...transactions].reverse().map((transaction, index) => (
                        <TransactionCard key={index} {...transaction} />
                    ))}
                </div>
                }
                
            </div>
        </div>
    )
}
export default Transactions;