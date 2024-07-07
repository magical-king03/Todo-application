import React from 'react';
import AddTodo from "./AddTodo";
import Home from "./Home"
import Nav from "./Nav";
import Login from "./Login";
import Register from "./Register";
import EditTodo from "./EditTodo"
import bgmobile from "../assests/img/bg-mob.png"
import background from "../assests/img/bg.png"; // Corrected typo in assets folder name
import { Routes, Route } from 'react-router-dom';
import ShowTodo from './ShowTodo';

function App() {
  return (
    <div className='bg-[#ffe7d2] w-full h-full'>
      <div style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain', // Center the background image
        minHeight: '100vh', // Ensure the container takes up at least the height of the viewport
      }} className='h-screen hidden md:block lg:bg-center md:bg-top w-screen h-screen'>

        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddTodo />} />
          <Route path="/view" element={<ShowTodo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit/:id" element={<EditTodo />} />
        </Routes>
      </div>
      <div style={{
        backgroundImage: `url(${bgmobile})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        minHeight: '100px',
      }} className='h-screen w-full block md:hidden bg-center'>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />          
          <Route path="/add" element={<AddTodo />} />
          <Route path="/view" element={<ShowTodo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit/:id" element={<EditTodo />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;
