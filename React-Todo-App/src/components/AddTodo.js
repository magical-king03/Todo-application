import { useNavigate } from 'react-router-dom';
import '../assests/css/index.css';
import add_todo from "../assests/img/add_todo.png"
import { useState, useEffect } from 'react';
function AddTodo() {
  let [check, setCheck] = useState(false)
  let loggedin = localStorage.getItem('email')
  const [taskName, setTaskName] = useState('')
  const [taskDesc, setTaskDesc] = useState('')
  const [taskDate, setTaskDate] = useState('')
  let addedBy = localStorage.getItem('email');
  let navigate = useNavigate()

  const addTaskHandler = async (e) => {
    e.preventDefault()
    if (taskName === "" || taskDate === "" || taskDesc === "") {
      alert("Fill all the details...")
    } else {
      let result = await fetch('http://localhost:4000/add-task', {
        method: 'post',
        body: JSON.stringify({ taskName, taskDesc, taskDate, addedBy }),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      if (result.status === 200) {
        setCheck(true)
        setTimeout(() => {
          setCheck(false);
        }, 3000)
      }
    }
  }
  // function addTaskHandler() {
  //   tempTodos = {
  //     name: taskName,
  //     desc: taskDesc,
  //     date: taskDate,
  //     addedBy: taskAddedBy,
  //   }
  //   let newTodos = [...Todos, tempTodos]
  //   setTodos(newTodos)
  //   fetch('https://todo-app-f0a16-default-rtdb.firebaseio.com/todos.json', {
  //     method: 'POST',
  //     body: JSON.stringify(newTodos),
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       setCheck(true)
  //       setTimeout(() => {
  //         setCheck(false);
  //       }, 3000)
  //     })
  //     .catch(error => console.error('Error:', error));

  // }
  useEffect(() => {
    if (!loggedin) {
      navigate('/login');
    }
  }, [loggedin, navigate]);

  return (
    <div>
      {
        check ?
        <div className="fixed inset-0 flex items-start lg:pt-[150px] md:pt-[80px] pt-[150px] justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg">
            <div className='flex items-center justify-center'>
              <p className='text-xl md:w-[300px] text-center p-3 font-bold rounded-lg'>
                Task added successfully
              </p>
            </div>
          </div>
        </div>
        :
        <div></div>
      }
      <div className='hidden md:block'>
        <div className='grid grid-cols-2'>
          <div className=''>
            <img src={add_todo} alt='Add your Todo task' className='lg:ml-[250px] lg:mt-[50px] lg:w-[425px] lg:h-[425px] md:ml-[40px] md:mt-[20px] w-[250px] h-[300px]' />
          </div>
          <div>
            <input type='text' placeholder='Enter the task' className='bg-[#a06b47] w-[350px] rounded-lg text-xl px-5 py-3 lg:mt-[30px] md:mt-[20px] text-white' value={taskName} onChange={(e) => setTaskName(e.target.value)} />
            <br />
            <textarea className='bg-[#a06b47] w-[350px] rounded-lg mt-3 px-5 py-3 text-white hidden lg:block' rows={8} placeholder='Enter the description' value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)}></textarea>
            <textarea className='bg-[#a06b47] w-[350px] rounded-lg mt-3 px-5 py-3 text-white lg:hidden block' rows={2} placeholder='Enter the description' value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)}></textarea>
            <input type='date' placeholder='Enter the date' className='mt-3 bg-[#a06b47] text-white w-[350px] rounded-lg text-xl px-5 py-3' value={taskDate} onChange={(e) => setTaskDate(e.target.value)} />
            <br />
            <div className='w-[350px] text-center'>
              <button className="bg-white text-black mt-3 border-1 border-black border px-7 py-3 rounded-full cursor-pointer" onClick={addTaskHandler}>
                Add task
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='md:hidden block'>
        <div className=''>
          <div>
            <div className='flex items-center justify-center'>
              <input type='text' placeholder='Enter the task' className='bg-[#a06b47] w-[230px] rounded-lg text-xl px-5 py-3 mt-5 text-white' value={taskName} onChange={(e) => setTaskName(e.target.value)} />
            </div>
            <div className='flex items-center justify-center'>
              <textarea className='bg-[#a06b47] w-[230px] rounded-lg mt-3 px-5 py-3 text-white block' rows={5} placeholder='Enter the description' value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)}></textarea>
            </div>
            <div className='flex items-center justify-center'>
              <input type='date' placeholder='Enter the date' className='mt-3 bg-[#a06b47] text-white w-[230px] rounded-lg text-xl px-5 py-3' value={taskDate} onChange={(e) => setTaskDate(e.target.value)} />
            </div>
            <br />
            <div className='text-center'>
              <button className="bg-white text-black mt-3 border-1 border-black border px-7 py-3 rounded-full cursor-pointer" onClick={addTaskHandler}>
                Add task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTodo;
