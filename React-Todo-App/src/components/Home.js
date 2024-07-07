import home_img from "../assests/img/home-img.png"
import { Link } from "react-router-dom"

function Home() {
    return (
        <div>
            <div className="lg:grid lg:grid-cols-2 lg:block hidden">

                {/* <div className="flex items-start justify-end mr-[50px]">
                    <div className="">
                        <div className="flex items-center justify-center gap-[50px] mb-[50px] mt-[75px]">
                            <input type="checkbox" disabled checked className="custom-checkbox" />
                            <Link to="/add"><p className="w-[300px] bg-black text-2xl px-6 py-3 rounded-full text-white font-semibold text-center">Add Tasks</p></Link>
                        </div>
                        <div className="flex items-center justify-center gap-[50px]">
                            <input type="checkbox" disabled checked className="custom-checkbox" />
                            <Link to="/view"><p className="w-[300px] bg-black text-2xl px-6 py-3 rounded-full text-white font-semibold text-center">View Tasks</p></Link>
                        </div>
                        <p className="mb-[50px] mt-[75px]">Welcome to the Task Management Home Page! Here, you can effortlessly organize and track your tasks. Whether you're managing personal projects or team assignments, our intuitive interface helps you stay on top of your priorities. Easily add, edit, or delete tasks and set deadlines to ensure timely completion. Stay productive and achieve your goals with our comprehensive task management system. Start managing your tasks efficiently today!</p>
                    </div>
                </div> */}
                <div className="w-[400px] mr-[50px] ml-[300px] mt-[40px] text-xl">
                    <div>
                        Welcome to the <span className="font-bold text-xl">Duty Dash!</span>
                        <br /> <br />
                        Here, you can effortlessly organize and track your tasks.
                        <br /> Whether you're managing personal projects or team assignments, our intuitive interface helps you stay on top of your priorities. Easily add, edit, or delete tasks and set deadlines to ensure timely completion. Stay productive and achieve your goals with our comprehensive task management system.
                    </div>
                    <br />
                    <div className="flex items-center justify-center">
                        <Link to="/add" className="bg-black px-6 py-4 text-white rounded-lg">Add tasks</Link>
                    </div>
                </div>
                <div className="">
                    <img src={home_img} className="mt-[20px]" alt="Home img" />
                </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:block lg:hidden hidden">
                {/* <div className="flex items-center ">
                    <div>
                        <div className="flex items-center justify-center gap-[25px] mb-[50px] ml-[50px]">
                            <input type="checkbox" disabled checked className="custom-checkbox" />
                            <Link to="/add"><p className="w-[300px] bg-black text-2xl px-6 py-3 rounded-full text-white font-semibold text-center">Add Tasks</p></Link>
                        </div>
                        <div className="flex items-center justify-center gap-[25px] ml-[50px]">
                            <input type="checkbox" disabled checked className="custom-checkbox" />
                            <Link to="/view"><p className="w-[300px] bg-black text-2xl px-6 py-3 rounded-full text-white font-semibold text-center">View Tasks</p></Link>
                        </div>
                    </div>
                </div> */}
                <div className="w-[325px] mr-[150px] ml-[70px] mt-[20px] text-sm">
                    <div>
                        Welcome to the <span className="font-bold text-xl">Duty Dash!</span>
                        <br /> <br />
                        Here, you can effortlessly organize and track your tasks.
                        <br /> Whether you're managing personal projects or team assignments, our intuitive interface helps you stay on top of your priorities. Easily add, edit, or delete tasks and set deadlines to ensure timely completion. Stay productive and achieve your goals with our comprehensive task management system.
                    </div>
                    <br />
                    <div className="flex items-center justify-center">
                        <Link to="/add" className="bg-black px-6 py-4 text-white rounded-lg">Add tasks</Link>
                    </div>
                </div>
                <div className="">
                    <img src={home_img} className="w-[325px] h-[325px]" alt="Home img" />
                </div>
            </div>
            <div className="md:hidden">
                {/* <div className="flex items-center mt-[35px]">
                    <div>
                        <div className="flex items-center justify-center gap-[25px] mb-[50px] ml-[50px]">
                            <input type="checkbox" disabled checked className="custom-checkbox" />
                            <Link to="/add"><p className="w-[220px] bg-black px-6 py-3 rounded-full text-white font-semibold text-center">Add Tasks</p></Link>
                        </div>
                        <div className="flex items-center justify-center gap-[25px] ml-[50px]">
                            <input type="checkbox" disabled checked className="custom-checkbox" />
                            <Link to="/view"><p className="w-[220px] bg-black px-6 py-3 rounded-full text-white font-semibold text-center">View Tasks</p></Link>
                        </div>
                    </div>
                </div> */}
                <div>
                    <div className="w-[250px] mx-auto mt-[20px]">
                        Welcome to the <span className="font-bold text-xl">Duty Dash!</span>
                        <br />
                        Here, you can effortlessly organize and track your tasks.
                    </div>
                    <br />
                    <div className="flex items-center justify-center">
                        <Link to="/add" className="bg-black px-4 py-2 text-sm text-white rounded-lg">Add tasks</Link>
                    </div>
                </div>
                <div className="flex items-center justify-center mt-[20px]">
                    <img src={home_img} className="w-[250px] h-[250px]" alt="Home img" />
                </div>
            </div>
        </div>
    )
}

export default Home