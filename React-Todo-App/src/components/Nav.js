import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import logo from "../assests/img/Duty dash.png"
function Nav() {
    let loggedin = localStorage.getItem('email');
    let navigate = useNavigate()
    function logouthandler() {
        localStorage.removeItem('email')
        navigate('/login')
    }
    const [nav, setNav] = useState(false);
    return (
        <div>
            {nav ? <div className='relative z-40'>
                <div className='flex md:hidden absolute right-[30px] top-[180px] duration-500 text-white bg-black min-h-[200px] rounded-l-lg w-[148px] items-center justify-center'>
                    <div className='flex flex-col items-center justify-center  p-4 gap-4'>

                        <Link to="/add">
                            <h1 className='font-semibold' onClick={() => { setNav(!nav) }}>Add Tasks</h1></Link>
                        <Link to="/view">
                            <h1 className='font-semibold' onClick={() => { setNav(!nav) }}>View Tasks</h1></Link>
                        <div>
                            {
                                !loggedin ?
                                    <div className="">
                                        <Link to='/login' className="bg-white text-black md:p-3 p-2 rounded-lg font-bold cursor-pointer md:text-xl">Login</Link>
                                    </div>
                                    :
                                    <div>
                                        <button onClick={logouthandler} className="bg-white text-black md:p-3 px-4 py-2 rounded-lg font-bold md:text-xl cursor-pointer">Logout</button>
                                    </div>
                            }</div>
                    </div>
                </div>

            </div> : <div className='relative'>
                <div className='flex md:hidden fixed right-[-500px] top-[180px] duration-500 text-[#5a116b] bg-white min-h-[200px] rounded-lg w-[150px] items-center justify-center'>
                    <div className='flex flex-col items-center justify-center p-4 gap-4'>
                        <Link to="/add">
                            <h1 className='font-semibold'>Add tasks</h1></Link>
                        <Link to="/view">
                            <h1 className='font-semibold'>View Tasks</h1></Link>
                        <div>
                            {
                                !loggedin ?
                                    <div className="">
                                        <Link to='/login' className="bg-white text-black md:p-3 p-2 rounded-lg font-bold cursor-pointer md:text-xl">Login</Link>
                                    </div>
                                    :
                                    <div>
                                        <button onClick={logouthandler} className="bg-white text-black md:p-3 p-2 rounded-lg font-bold md:text-xl cursor-pointer">Logout</button>
                                    </div>
                            }</div>
                    </div>
                </div>
            </div>}
            <div className='flex items-center justify-between md:pt-[80px] md:px-[45px] lg:pt-[140px] lg:px-[300px] pt-[150px] px-[40px]'>
                <div className='flex items-center justify-center' >
                    <Link to="/">
                        <div className="flex items-center">
                            <img src={logo} className="md:h-10 md:w-10 h-5 w-5" alt="Logo" />
                            <p className="font-bold md:text-4xl text-xl">uty Dash</p>
                        </div>
                    </Link>
                </div>
                <div className='hidden md:flex items-center justify-center text-xl gap-5 mr-4'>

                    <Link to="/add">
                        <h1 className='font-semibold'>Add Tasks</h1></Link>
                    <Link to="/view">
                        <h1 className='font-semibold'>View Tasks</h1></Link>
                    <div>
                        {
                            !loggedin ?
                                <div className="">
                                    <Link to='/login' className="bg-black text-white md:p-3 p-2 rounded-lg font-bold cursor-pointer md:text-xl">Login</Link>
                                </div>
                                :
                                <div>
                                    <button onClick={logouthandler} className="bg-black text-white md:p-3 p-2 rounded-lg font-bold md:text-xl cursor-pointer">Logout</button>
                                </div>
                        }</div>
                </div>
                <div className='flex md:hidden'>
                    <button className=' border-0 p-4 rounded-full' onClick={() => { setNav(!nav) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="black" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Nav