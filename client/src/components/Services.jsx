import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

const ServicesCard = ({title, paragraph, cardIcon, iconColor}) => {
    return (
        <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
            <div className={`w-10 h-10 rounded-full flex justify-center items-center ${iconColor}`}>
                {cardIcon}
            </div>
            <div className="ml-5 flex flex-col flex-1 text-white">
                <h3 className="mt-2 text-lg">{title}</h3>
                <p className="mt-1 text-sm sm:w-11/12 md:w-11/12">{paragraph}</p>
            </div>
        </div>
    )
}
const Services = () => {
    return (
        <div className="flex w-full justify-center items-center gradient-bg-services">
            <div className="flex md:flex-row flex-col items-center justify-between md:p-20 py-20 px-4 m-auto max-w-7xl">
                <div className="flex-1 flex flex-col justify-start items-start">
                    <h1 className="text-white font-medium xs:text-center xs:text-4xl xs:mb-10 sm:text-5xl text-gradient">Services that we <br/> continue to improve</h1>
                    <p className="text-white text-base my-5 font-light xs:hidden md:w-10/12 w-11/12">The best choice for buying and selling your crypto assets, with the various super friendly services we offer
                    </p>
                </div>
                <div className="flex-1 flex flex-col justify-start items-center">
                    <ServicesCard
                        cardIcon={<BsShieldFillCheck color="#ffff" fontSize={21}/>}
                        iconColor="bg-[#2952E3]" 
                        title="Security Guaranteed"
                        paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut"/>
                    <ServicesCard
                        cardIcon={<BiSearchAlt color="#ffff" fontSize={21}/>}
                        iconColor="bg-[#8945f8]" 
                        title="Best Exchange Rates"
                        paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."/>
                    <ServicesCard
                        cardIcon={<RiHeart2Fill color="#ffff" fontSize={21}/>}
                        iconColor="bg-[#f84550]" 
                        title="Fast Transactions"
                        paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut"/>
                </div> 
            </div>
        </div>
    )
}
export default Services;