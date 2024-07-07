import { useState } from "react";
import { email_auth } from '../config'
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import login from "../assests/img/login_page.png"

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();
    const [check, setCheck] = useState(false);
    const [userCheck, setUserCheck] = useState(false);

    const loginHandler = async (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            setCheck(true);
            setTimeout(() => {
                setCheck(false);
            }, 3000);
        } else {
            try {
                setCheck(false);
                const userCredential = await signInWithEmailAndPassword(email_auth, email, password)
                const user = userCredential.user;
                console.log(user)
                localStorage.setItem('email', email);
                navigate('/');
            } catch (error) {
                if (error.toString().includes("auth/invalid-credential")) {
                    setUserCheck(true);
                    setTimeout(() => {
                        setUserCheck(false);
                    }, 3000);
                }
            }
        }
    }

    // function loginHandler() {
    //     let user_name = name.current.value;
    //     let pass = password.current.value;

    //     if (user_name === "" || pass === "") {
    //         setCheck(true);
    //         setTimeout(() => {
    //             setCheck(false);
    //         }, 3000);
    //     } else {
    //         setCheck(false);

    //         fetch("https://todo-app-f0a16-default-rtdb.firebaseio.com/users.json")
    //             .then((response) => response.json())
    //             .then((data) => {
    //                 let tempUsers = [];

    //                 for (const key in data) {
    //                     let user = {
    //                         id: key,
    //                         ...data[key],
    //                     };
    //                     tempUsers.push(user);
    //                 }
    //                 let userFound = tempUsers.find(
    //                     (tempUs) => user_name === tempUs[0].user_name && pass === tempUs[0].password
    //                 );

    //                 if (userFound) {
    //                     localStorage.setItem('name', userFound[0].user_name)
    //                     localStorage.setItem('loggedin', true)
    //                     setUserCheck(false);
    //                     navigate("/");
    //                 } else {
    //                     setUserCheck(true);
    //                     setTimeout(() => {
    //                         setUserCheck(false);
    //                     }, 3000);
    //                 }
    //             });
    //     }
    // }

    return (
        <div>
            <div>
                <h1 className="mt-[20px] md:mt-[50px] text-xl md:text-2xl p-2 text-black lg:ml-[250px] md:ml-[75px] ml-[40px]">LOGIN NOW</h1>
                <div className="grid grid-cols-2">
                    <div>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="lg:ml-[270px] mt-[15px] md:ml-[75px] ml-[40px] text-white md:w-[400px] w-[300px] bg-black px-6 py-4 rounded-full" />

                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="lg:ml-[270px] mt-[15px] md:ml-[75px] ml-[40px] text-white md:w-[400px] w-[300px] bg-black px-6 py-4 rounded-full" />
                        <br />
                        <div className="flex items-end gap-5 w-screen">
                            <button className="bg-white text-black border-1 border-black border px-7 py-3 rounded-full cursor-pointer lg:ml-[270px] mt-[15px] md:ml-[75px] ml-[40px]" onClick={loginHandler}>
                                Login
                            </button>
                            <Link to="/register" className="underline text-[#0000ff] text-lg">Don't have an account</Link>
                        </div>
                        <p className={check ? 'lg:mt-[25px] md:mt-0 mt-[25px] lg:ml-[270px] md:ml-[75px] ml-[40px] text-xl transform animate-pulse transition-all text-[#8b4513] font-bold' : 'hidden'}>Fill all the fields</p>
                        <p className={userCheck ? 'lg:mt-[25px] md:mt-0 mt-[25px] lg:ml-[270px] md:ml-[75px] ml-[40px] text-xl transform animate-pulse transition-all text-[#8b4513] font-bold' : 'hidden'}>Invalid Credentials;</p>
                    </div>
                    <div className="hidden md:block">
                        <img src={login} className="md:w-[300px] md:ml-[50px] md:h-[225px] lg:w-[500px] lg:h-[400px]" alt="Login img" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
