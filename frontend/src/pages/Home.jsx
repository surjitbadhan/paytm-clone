import React from 'react'
import { Button } from '../components/Button'
import { Link } from 'react-router-dom';
import { AppBar } from '../components/AppBar';

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: `radial-gradient(circle at 0.8px 0.8px, rgba(0,0,0,0.2) 0.5px, transparent 0)`,
        backgroundSize: "8px 8px",
        backgroundRepeat: "repeat",
      }}
      className="min-h-screen w-full flex flex-col justify-center items-center"
    >

      <h1 className="text-4xl font-bold">Transfer Money, anywhere, anytime</h1>
      <div className='flex gap-10 mt-10'>
        <Link to={'/signup'}>
          <Button label={"Signup"} />
        </Link>
        <Link to={'/signin'}>
          <Button label={"Signin"} />
        </Link>
      </div>
    </div>
  );
}

export default Home