import { useNavigate, useParams } from 'react-router-dom';
import '../assests/css/index.css';
import add_todo from "../assests/img/add_todo.png"
import { useState, useEffect } from 'react';
function EditTodo() {
    const [task, setTask] = useState({ taskName: '', taskDesc: '', taskDate: '' })
    let navigate = useNavigate()
    const { id } = useParams();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api-tasks/${id}`)
                const data = await response.json();
                data.taskDate = data.taskDate.split('T')[0];
                setTask(data);
            } catch (err) {
                console.log(err);
            }

        }
        fetchTask();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const editTaskHandler = async (e) => {
        e.preventDefault();
        try {
            const updateUrl = `http://localhost:4000/api-tasks/${id}`;
            await fetch(updateUrl, {
                method: 'PUT',
                body: JSON.stringify(task),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            navigate('/view');
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div>
            {/* {
                check ?
                    <div className='flex items-center justify-center mt-[-30px]'>
                        <p className='text-xl bg-[#008000] w-[300px] text-center p-3 font-bold rounded-lg'>Task added successfully</p>
                    </div>
                    :
                    <div></div>
            } */}
            <div className='hidden md:block'>
                <div className='grid grid-cols-2'>
                    <div className=''>
                        <img src={add_todo} alt='Edit your Todo task' className='lg:ml-[250px] lg:mt-[50px] lg:w-[425px] lg:h-[425px] md:ml-[40px] md:mt-[20px] w-[250px] h-[300px]' />
                    </div>
                    <div>
                        <input type='text' name='taskName' className='bg-[#a06b47] w-[350px] rounded-lg text-xl px-5 py-3 lg:mt-[30px] md:mt-[20px] text-white' value={task.taskName} onChange={(handleChange)} />
                        <br />
                        <textarea className='bg-[#a06b47] w-[350px] rounded-lg mt-3 px-5 py-3 text-white hidden lg:block' rows={8} name="taskDesc" value={task.taskDesc} onChange={handleChange}></textarea>
                        <textarea className='bg-[#a06b47] w-[350px] rounded-lg mt-3 px-5 py-3 text-white lg:hidden block' rows={2} name="taskDesc" value={task.taskDesc} onChange={handleChange}></textarea>
                        <input type='date' name='taskDate' className='mt-3 bg-[#a06b47] text-white w-[350px] rounded-lg text-xl px-5 py-3' value={task.taskDate} onChange={(e) => {
                                const selectedDate = new Date(e.target.value);
                                const today = new Date();
                                console.log(selectedDate)
                                if (selectedDate >= today) {
                                    handleChange(e);
                                } else {
                                    alert("Select appropriate date")
                                }
                            }} />
                        <br />
                        <div className='w-[350px] text-center'>
                            <button className="bg-white text-black mt-3 border-1 border-black border px-7 py-3 rounded-full cursor-pointer" onClick={editTaskHandler}>
                                Update task
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='md:hidden block'>
                <div className=''>
                    <div>
                        <div className='flex items-center justify-center'>
                            <input type='text' placeholder='Enter the task' className='bg-[#a06b47] w-[230px] rounded-lg text-xl px-5 py-3 mt-5 text-white' value={task.taskName} onChange={handleChange} />
                        </div>
                        <div className='flex items-center justify-center'>
                            <textarea className='bg-[#a06b47] w-[230px] rounded-lg mt-3 px-5 py-3 text-white block' rows={5} name="taskDesc" value={task.taskDesc} onChange={handleChange}></textarea>
                        </div>
                        <div className='flex items-center justify-center'>
                            <input type='date' name='taskDate' className='mt-3 bg-[#a06b47] text-white w-[230px] rounded-lg text-xl px-5 py-3' value={task.taskDate} onChange={(e) => {
                                const selectedDate = new Date(e.target.value);
                                const today = new Date();
                                console.log(selectedDate)
                                if (selectedDate >= today) {
                                    handleChange(e);
                                } else {
                                    alert("Select appropriate date")
                                }
                            }} />
                        </div>
                        <br />
                        <div className='text-center'>
                            <button className="bg-white text-black mt-3 border-1 border-black border px-7 py-3 rounded-full cursor-pointer" onClick={editTaskHandler}>
                                Update task
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditTodo;
