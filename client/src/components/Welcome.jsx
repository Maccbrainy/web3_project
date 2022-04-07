import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import {TransactionContext}  from "../context/transactionContext";

const commonStyleGridDisplay = "min-h-[70px] px-2 flex justify-center items-center text-white border-[0.5px] border-gray-400";

const InputFormComponent = ({type, name, placeholder,value, handleChange}) => {
    return (
            <input 
                type={type} 
                placeholder={placeholder}
                value={value} 
                step="0.0001"
                onChange={(e) => handleChange(e, name)}
                className="w-full my-2 p-2 border-none outline-none text-white text-sm backdrop-blur-sm bg-[#ffffff0d] rounded-lg" />
    )
}


const Welcome = () => {
    const {connectWallet, inputFormData, handleChange, sendTransaction} = useContext(TransactionContext);

    const submitInputFormData = (e) => {
        
        const {addressTo, amount, keyword, message} = inputFormData;

        e.preventDefault();

        if (!addressTo || !amount || !keyword || !message) return;

        sendTransaction();
    }

    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex md:flex-row flex-col items-start justify-center md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start items-start flex-col md:mr-10">
                   <h1 className="text-5xl sm:text-6xl font-medium py-1 text-white text-gradient">Send Crypto <br/> across the world</h1>
                    <p className="text-white mt-5 font-light md:w-9/12 w-11/12 text-base">Explore the crypto world. Buy and sell cryptocurrencies easily with Cryptop.
                    </p> 
                    <button
                    onClick={connectWallet} 
                    type="button" 
                    className="flex items-center bg-[#2952e3] hover:bg-[#2546bd] rounded-full cursor-pointer p-4 my-7">
                        <AiFillPlayCircle className="text-white mr-2" />
                        <p className="text-white text-base font-semibold">Connect wallet</p>
                    </button>
                    <div className="grid grid-cols-3 w-full mt-10">
                        <div className={`rounded-tl-2xl ${commonStyleGridDisplay}`}>Ethereum</div>
                        <div className={`rounded-none ${commonStyleGridDisplay}`}>Polygon</div>
                        <div className={`rounded-tr-2xl ${commonStyleGridDisplay}`}>Solana</div>
                        <div className={`rounded-bl-2xl ${commonStyleGridDisplay}`}>Reliable</div>
                        <div className={`rounded-none ${commonStyleGridDisplay}`}>Web 3.0</div>
                        <div className={`rounded-br-2xl ${commonStyleGridDisplay}`}>Blockchain</div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 w-full justify-start items-center mf:mt-0 mt-10">
                    <div className="flex flex-col justify-end sm:w-72 eth-card w-full h-40 rounded-xl white-glassmorphism p-2">
                        <div className="flex justify-between flex-col h-full w-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                   <SiEthereum fontSize={21} color="#fff"/>  
                                </div>
                                <BsInfoCircle fontSize={17} color="#fff"/> 
                            </div>
                            <p className="text-white">...</p>
                        </div>
                        <p className="text-white text-lg">Ethereum</p>
                    </div>
                    <div className="flex p-5 mt-10 blue-glassmorphism sm:w-96 w-full items-center justify-start flex-col white-glassmorphism">
                        <InputFormComponent type="text" name="addressTo" placeholder="Address To" handleChange={handleChange}/>
                        <InputFormComponent type="number" name="amount" placeholder="Amount (ETH)" handleChange={handleChange}/>
                        <InputFormComponent type="text" name="keyword" placeholder="Keyword" handleChange={handleChange}/>
                        <InputFormComponent type="text" name="message" placeholder="Enter Message" handleChange={handleChange}/>

                        <div className="h-[1px] w-full bg-gray-400 my-4"></div>

                        <button
                            onClick={submitInputFormData}
                            type="button"
                            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer">
                            Send now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Welcome;