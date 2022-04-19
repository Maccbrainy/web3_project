import { AiOutlineDeploymentUnit } from 'react-icons/ai'

const Footer = () => {
    return (
        <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
            <div className="w-full flex flex-col sm:flex-row justify-between items-center my-4">
               <div className="flex flex-[0.5] justify-center items-center">
                <AiOutlineDeploymentUnit className="w-20 h-16 cursor-pointer fill-white"/>
                    <span className="text-white font-medium text-2xl">Cryptop</span> 
                </div>
                <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
                    <p className="text-white text-base cursor-pointer">Market</p>
                    <p className="text-white text-base cursor-pointer">Exchange</p>
                    <p className="text-white text-base cursor-pointer">Tutorials</p>
                    <p className="text-white text-base cursor-pointer">Wallet</p>
                </div> 
            </div>
            <div className="flex justify-center items-center flex-col mt-5">
                <p className="text-white text-sm text-center">Made with Love</p>
                <p className="text-white text-sm text-center font-medium mt-2">iketakumichaelnedum@gmail.com</p>
            </div>

            <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

            <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
                <p className="text-white text-left text-xs">@Cryptop 2022</p>
                <p className="text-white text-right text-xs">All rights reserved</p>
            </div>
        </div>
    )
}
export default Footer;