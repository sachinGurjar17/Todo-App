// src/App.js
import React from 'react';
import { useNavigate } from 'react-router-dom';


function Home() {
    const navigate = useNavigate();
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-500 text-white p-4">
        <div className="container mx-auto flex justify-center items-center">
          <h1 className="text-3xl font-semibold ">Stay Organized</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-800 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-4">Manage Your task with ease</h2>
          <p className="text-lg">Add your task , manage it , and smash it through the covers <span className='text-sm align-bottom ml-4'>...Ravi Shastri</span></p>
          <button className="bg-blue-500 text-white px-6 py-3 rounded mt-8" onClick={()=>{
            navigate('/signup')
          }}>Get Started</button>
        </div>
      </section>


      {/* Call to Action Section */}
      <section className="bg-blue-500 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Start Managing Today!</h2>
          <p className="text-lg mb-6">Stay on top of your tasks with our intuitive Task Manager</p>
          <button className="bg-white text-blue-500 px-6 py-3 rounded" onClick={
            ()=>{
                navigate('/signup');
            }
          }>Sign Up</button>
        </div>
      </section>

    </div>

  );
}

export default Home;
