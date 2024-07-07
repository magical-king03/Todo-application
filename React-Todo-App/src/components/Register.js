import { useState, useEffect } from "react";
import { email_auth } from '../config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import register from "../assests/img/register.png"

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState('');
    let navigate = useNavigate()
    const [check, setCheck] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPass, setErrorPass] = useState(false)
    
    const registerHandler = async (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            setCheck(true);
            setTimeout(() => {
                setCheck(false);
            }, 3000);
        } else {
            try {
                setCheck(false);
                const userCredential = await createUserWithEmailAndPassword(email_auth, email, password);
                const user = userCredential.user;
                console.log(user);
                localStorage.setItem('email', email)
                navigate('/login');
            } catch (error) {
                if (error.toString().includes("auth/email-already-in-use")) {
                    setErrorEmail(true);
                    setTimeout(() => {
                        setErrorEmail(false);
                    }, 3000);
                } else if (error.toString().includes("auth/weak-password")) {
                    setErrorPass(true);
                    setTimeout(() => {
                        setErrorPass(false);
                    }, 3000);
                }
            }
        }
    }

    useEffect(() => {
        setLoggedIn(localStorage.getItem('email'))
    }, [loggedIn]);


return (
    <div>
        {/* <div>
                <h1 className="text-4xl p-2 font-bold text-black text-center m-7">Register Now for free</h1>
                <div className=' m-auto border border-black rounded-xl m-3 md:w-[375px] w-[340px]'>
                    <div className="m-5">
                        <p className="text-xl font-bold">Name</p>
                        <input type='text' placeholder='Enter the name' className='border-1 border-black p-[10px] mt-5 border mb-5 rounded-lg w-[300px]' ref={user_name} />
                    </div>
                    <div className="m-5">
                        <p className="text-xl font-bold">Email</p>
                        <input type='email' placeholder='Enter the name' className='border-1 border-black p-[10px] mt-5 border mb-5 rounded-lg w-[300px]' ref={email} />
                    </div>
                    <div className="m-5">
                        <p className="text-xl font-bold">Password</p>
                        <input type='password' placeholder='Enter the password' className='border-1 border-black p-[10px] mt-5 border rounded-lg w-[300px]' ref={password} />
                    </div>
                    <div className="flex items-center justify-center">
                        <button className='bg-black text-white px-5 py-3 rounded-lg cursor-pointer m-5' onClick={registerHandler}>Register</button>
                        
                    </div>
                    <p className={check ? 'ml-5 mb-5 text-xl transform animate-pulse transition-all text-[#ff0000] font-bold' : 'hidden'}>Fill all the fields</p>
                </div>
            </div> */}
        <div>
            <h1 className="mt-[20px] lg::mt-[50px] text-xl md:text-2xl p-2 text-black lg:ml-[250px] md:ml-[75px] ml-[40px]">REGISTER NOW FOR FREE</h1>
            <div className="grid grid-cols-2">
                <div>
                    {/* <input type="name" placeholder="Name" ref={user_name} className="lg:ml-[270px] mt-[15px] md:ml-[75px] ml-[40px] text-white lg:w-[400px] w-[300px] bg-black px-6 py-2 lg:py-3 rounded-full" /> */}

                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="lg:ml-[270px] mt-[15px] md:ml-[75px] ml-[40px] text-white lg:w-[400px] w-[300px] bg-black px-6 py-2 lg:py-3 rounded-full" />

                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="lg:ml-[270px] mt-[15px] md:ml-[75px] ml-[40px] text-white lg:w-[400px] w-[300px] bg-black px-6 py-2 lg:py-3 rounded-full" />
                    <br />
                    <div className="flex items-end gap-5 w-screen">
                        <button className="bg-white text-black border-1 border-black border px-7 py-3 rounded-full cursor-pointer lg:ml-[270px] mt-[15px] md:ml-[75px] ml-[40px]" onClick={registerHandler}>
                            REGISTER
                        </button>
                    </div>
                    <p className={check ? 'lg:mt-[25px] md:mt-0 mt-[25px] lg:ml-[270px] md:ml-[75px] ml-[40px] text-xl transform animate-pulse transition-all text-[#8b4513] font-bold' : 'hidden'}>Fill all the fields</p>
                    <p className={errorEmail ? 'lg:mt-[25px] md:mt-0 mt-[25px] lg:ml-[270px] md:ml-[75px] ml-[40px] text-xl transform animate-pulse transition-all text-[#8b4513] font-bold' : 'hidden'}>Email already exists...</p>
                    <p className={errorPass ? 'lg:mt-[25px] md:mt-0 mt-[25px] lg:ml-[270px] md:ml-[75px] ml-[40px] text-xl transform animate-pulse transition-all text-[#8b4513] font-bold' : 'hidden'}>Password should contain atleast 6 characters.</p>
                </div>
                <div className="hidden md:block">
                    <img src={register} className="w-[300px] h-[250px] lg:w-[500px] lg:h-[400px]" alt="Register img" />
                </div>
            </div>
        </div>
    </div>
)
}

export default Register