import {HiMenuAlt4} from 'react-icons/hi'
import {AiOutlineClose, AiOutlineDeploymentUnit} from 'react-icons/ai'
import { useContext, useState } from 'react'
import {TransactionContext}  from "../context/transactionContext"


const NavbarItem = ({title, classprops})  => {
    return (
        <li className={`mx-4 cursor-pointer ${classprops}`}>
            {title}
        </li>
    )
}
const Navbar = () => {
    const { currentAccount, connectWallet } = useContext(TransactionContext);
    const [toggleMenu, setToggleMenu] = useState(false);
    return (
        <nav className="w-full flex md:justify-center justify-between items-center p-4">
            <div className="flex md:flex-[0.5] flex-initial items-center">
                <AiOutlineDeploymentUnit className="w-20 h-16 cursor-pointer fill-white"/>
                <span className="text-white font-medium text-2xl">Cryptop</span>
            </div>
            <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                {["Market","Exchange","Tutorials","Wallet"].map((item, index) =>(
                   <NavbarItem key={item + index} title={item}/> 
                ))}
                {currentAccount ? <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-not-allowed">Connected</li> : <li onClick={connectWallet} className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">Connect</li>}
                
            </ul>
                <div className="flex relative">
                    { toggleMenu 
                      ? <AiOutlineClose fontSize={30} className=" fill-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)}/> 
                      : <HiMenuAlt4 fontSize={30} className="fill-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)}/>}

                      {toggleMenu && (
                          <ul className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white">
                              <li className="text-xl w-full my-2">
                                  <AiOutlineClose className="cursor-pointer" onClick={()=> setToggleMenu(false)}/>
                              </li>
                              {["Market","Exchange","Tutorials","Wallet"].map((item, index) =>(
                   <NavbarItem key={item + index} title={item} classprops="my-2 text-lg"/> 
                ))}
                          </ul>
                      )}
                </div>
        </nav>
    )
}
export default Navbar;