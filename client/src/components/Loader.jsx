const Loader = ({title, height, width}) => {
     return (
        <div className="flex justify-center items-center w-full mt-2 p-2">
            <div className={`animate-spin rounded-full ${height} ${width} border-b-2 border-white`}/>
            <span className="ml-4 text-white">{title}</span>
        </div>
    )
}
export default Loader;