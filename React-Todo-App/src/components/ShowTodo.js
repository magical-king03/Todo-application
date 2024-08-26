import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import "../assests/css/App.css";
import { Link } from 'react-router-dom';

function ShowTodo() {
    const [allTodos, setAllTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [searchTask, setSearchTask] = useState('');
    const [status, setStatus] = useState('');
    const loggedin = localStorage.getItem('email');
    const [taskToDelete, setTaskToDelete] = useState(null);
    const navigate = useNavigate();
    const today = new Date();

    const [deleteCheck, setDeleteCheck] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('https://todo-application-rho-sand.vercel.app/api-tasks');
            const data = await response.json();
            const tempTasks = [];

            for (const task of data) {
                const taskDate = new Date(task.taskDate);

                if (task.completed !== "completed" && task.completed !== "failed" && taskDate <= today) {
                    await updateTaskStatus(task._id, "failed");
                }
                if (taskDate > today && task.completed !== "completed") {
                    await updateTaskStatus(task._id, "uncompleted");
                }

                if (loggedin === task.addedBy) {
                    tempTasks.push(task);
                }
            }

            setAllTodos(tempTasks);
            setFilteredTodos(tempTasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }, [loggedin]);

    const updateTaskStatus = async (id, status) => {
        try {
            const updateUrl = `https://todo-application-rho-sand.vercel.app/api-tasks/${id}`;
            await fetch(updateUrl, {
                method: 'PATCH',
                body: JSON.stringify({ completed: status }),
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (err) {
            console.log(err);
        }
    };

    const deleteTask = (id) => {
        setDeleteCheck(true);
        setTaskToDelete(id);
    };

    const deleteConfirm = async () => {
        try {
            const deleteUrl = `https://todo-application-rho-sand.vercel.app/api-tasks/${taskToDelete}`;
            const response = await fetch(deleteUrl, { method: 'DELETE' });

            if (response.ok) {
                fetchData();
                setDeleteCheck(false);
                setTaskToDelete(null);
            } else {
                console.error('Failed to delete task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const editTask = (id) => {
        navigate(`/edit/${id}`);
    };

    const checkTask = async (id) => {
        const task = allTodos.find(todo => todo._id === id);
        if (task) {
            if (task.completed !== "failed" || task.completed === "uncompleted") {
                await updateTaskStatus(id, "completed");
            }
            fetchData();
        }
    };


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const searchHandler = (e) => {
        const searchValue = e.target.value;
        setSearchTask(searchValue);
        if (searchValue && searchValue.trim() === '') {
            setFilteredTodos(allTodos);
        } else {
            const filteredTasks = allTodos.filter(task => task.taskName.toLowerCase().includes(searchValue.toLowerCase()));
            setFilteredTodos(filteredTasks);
        }
    }

    const searchHandlerSubmit = () => {
        const filteredTasks = allTodos.filter(task => task.taskName.toLowerCase().includes(searchTask.toLowerCase()));
        setFilteredTodos(filteredTasks);

    }

    const taskStatusHandler = (e) => {
        const statusValue = e.target.value;
        setStatus(statusValue);
        if (statusValue === "All") {
            setFilteredTodos(allTodos);
        } else if (statusValue === "Pending") {
            const filteredTasks = allTodos.filter(task => task.completed === "uncompleted");
            setFilteredTodos(filteredTasks)
        } else if (statusValue === "Completed") {
            const filteredTasks = allTodos.filter(task => task.completed === "completed");
            setFilteredTodos(filteredTasks)
        } else if (statusValue === "Failed") {
            const filteredTasks = allTodos.filter(task => task.completed === "failed");
            setFilteredTodos(filteredTasks)
        }
        console.log(statusValue)
    }

    useEffect(() => {
        fetchData();
        if (!loggedin) {
            navigate('/login');
        }
    }, [loggedin, navigate, fetchData]);

    return (
        <div>
            {
                deleteCheck ?
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className='flex items-center justify-center'>
                                <p className='text-xl md:w-[400px] text-center p-3 font-bold'>
                                    Are you sure you want to delete this task?
                                </p>
                            </div>
                            <div className="flex justify-center mt-4 gap-4">
                                <button onClick={deleteConfirm} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:6">
                                    Delete
                                </button>
                                <button onClick={() => setDeleteCheck(false)} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                    :
                    <div></div>
            }
            <div className='md:flex items-center justify-between'>
                <div className='flex items-center gap-[10px] w-[250px] my-[20px] lg:ml-[300px] ml-[40px]'>
                    <input type='text' placeholder='Enter the task to search' name='searchTask' value={searchTask} onChange={searchHandler} className='rounded-lg p-2 border-2 border border-black' />
                    <button onClick={searchHandlerSubmit}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>
                <div className='lg:mr-[300px] mr-[40px] ml-[40px] flex items-center gap-[15px] mb-[20px] md:mb-0'>
                    <p className='text-xl md:font-bold font-semibold'>Select task:</p>
                    <select name='completed' value={status} onChange={taskStatusHandler} className='border border-2 border-black text-center rounded-lg md:p-1 p-[0.5px]'>
                        <option>All</option>
                        <option>Pending</option>
                        <option>Completed</option>
                        <option>Failed</option>
                    </select>
                </div>
            </div>
            <div className={filteredTodos.length ? 'block overflow-hidden' : 'hidden'}>
                <div className='hidden lg:block' style={{ overflowY: 'auto', height: 'calc(100vh - 350px)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {filteredTodos.map((todo) => (
                        <div key={todo._id} className=''>
                            <div className='flex items-center gap-3 justify-center mb-[30px]'>
                                <button
                                    onClick={() => checkTask(todo._id)}
                                    className={todo.completed === "completed" ? 'cus-checkbox1' : 'cus-checkbox'}
                                />
                                <div className={`w-[800px] bg-[#a06b47] px-4 py-4 rounded-lg text-white ${todo.completed === "failed" ? 'strikethrough' : ''}`}>
                                    <p className='text-3xl font-bold'>{todo.taskName}</p>
                                    <p className='text-2xl w-[750px] overflow-hidden break-words'>
                                        {todo.taskDesc}
                                    </p>
                                    <p className='text-xl'>{formatDate(todo.taskDate)}</p>
                                    <div className='flex items-center gap-[20px]'>
                                        <div className='mt-2 text-sm font-normal'>
                                            <button className='bg-[#e58d57] text-[#000000] p-2 rounded-lg border-1 border text-center border-[#000000] cursor-pointer' onClick={() => editTask(todo._id)}>EDIT</button>
                                        </div>
                                        <div className='mt-2 text-sm font-normal'>
                                            <button className='bg-red-400 text-[#ffffff] p-2 rounded-lg border-1 border text-center border-[#000000] cursor-pointer' onClick={() => deleteTask(todo._id)}>DELETE</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='md:hidden' style={{ overflowY: 'auto', height: 'calc(100vh - 470px)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {filteredTodos.map((todo) => (
                        <div key={todo._id} className=''>
                            <div className='flex items-center gap-3 justify-center mb-[30px]'>
                                <button
                                    onClick={() => checkTask(todo._id)}
                                    className={todo.completed === "completed" ? 'cus-checkbox1' : 'cus-checkbox'}
                                />
                                <div className={`w-[200px] bg-[#a06b47] p-3 rounded-lg text-white ${todo.completed === "failed" ? 'strikethrough' : ''}`}>
                                    <p className='text-xl font-semibold'>{todo.taskName}</p>
                                    <p className=''>{formatDate(todo.taskDate)}</p>
                                    <div className='flex items-center gap-[20px]'>
                                        <div className='mt-2 text-sm font-normal'>
                                            <button className='bg-[#e58d57] text-[#000000] p-2 rounded-lg border-1 border text-center border-[#000000] cursor-pointer' onClick={() => editTask(todo._id)}>EDIT</button>
                                        </div>
                                        <div className='mt-2 text-sm font-normal'>
                                            <button className='bg-red-400 text-[#ffffff] p-2 rounded-lg border-1 border text-center border-[#000000] cursor-pointer' onClick={() => deleteTask(todo._id)}>DELETE</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='hidden md:block lg:hidden' style={{ overflowY: 'auto', height: 'calc(100vh - 550px)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {filteredTodos.map((todo) => (
                        <div key={todo._id} className=''>
                            <div className='flex items-center gap-3 justify-center mb-[30px]'>
                                <button
                                    onClick={() => checkTask(todo._id)}
                                    className={todo.completed === "completed" ? 'cus-checkbox1' : 'cus-checkbox'}
                                />
                                <div className={`w-[600px] bg-[#a06b47] px-4 py-4 rounded-lg text-white ${todo.completed === "failed" ? 'strikethrough' : ''}`}>
                                    <p className='text-2xl font-bold'>{todo.taskName}</p>
                                    <p className='text-xl w-[575px] overflow-hidden break-words'>
                                        {todo.taskDesc}
                                    </p>
                                    <p className=''>{formatDate(todo.taskDate)}</p>
                                    <div className='flex items-center gap-[20px]'>
                                        <div className='mt-2 text-sm font-normal'>
                                            <button className='bg-[#e58d57] text-[#000000] p-2 rounded-lg border-1 border text-center border-[#000000] cursor-pointer' onClick={() => editTask(todo._id)}>EDIT</button>
                                        </div>
                                        <div className='mt-2 text-sm font-normal'>
                                            <button className='bg-red-400 text-[#ffffff] p-2 rounded-lg border-1 border text-center border-[#000000] cursor-pointer' onClick={() => deleteTask(todo._id)}>DELETE</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={filteredTodos.length === 0 ? 'block' : 'hidden'}>
                <div className='text-center'>
                    <p className='text-center text-3xl font-bold m-4'>
                        No tasks available to do
                    </p>
                    <Link to='/add'>
                        <button className='bg-white text-black mt-3 border-1 border-black border px-7 py-3 rounded-full cursor-pointer'>Add new tasks</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ShowTodo;
