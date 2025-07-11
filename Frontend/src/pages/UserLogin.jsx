import React, { useState ,useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../assets/context/UserContext'
import axios from 'axios';

const UserLogin = () => {
  const [email,setEmail] = useState('')
  const[password,setPassword]=useState('');
  const [userData,setuserdata] = useState({});

  const{user, setUser} = useContext(UserDataContext);
  const navigate = useNavigate();


  const submitHandler= async (e)=>{
    e.preventDefault();
    const userData = {
    email: email,
    password: password
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
    if(response.status === 200){
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/home');
    }
    setEmail('');
    setPassword('');
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <form onSubmit={(e)=>{
          submitHandler(e)
        }}>
          {/* <div className='w-full bg-pink'>  */}
            <img className='w-16 mb-10 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
          {/* </div> */}

        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input 
        required 
        value={email}
        onChange={(e)=>{
            setEmail(e.target.value)
        }}
        className='bg-[#FFFFFF] mb-7 rounded px-4 py-2 border w-full text-lg placeholder: text-base'
        type="email" placeholder='email@example.com' 
        />
        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
        <input 
        required 
        value={password}
        onChange={(e)=>{
            setPassword(e.target.value)
        }}
        className='bg-[#FFFFFF] mb-7 rounded px-4 py-2 border w-full text-lg placeholder: text-base' type="password" placeholder='password' 
        />
        <button className='bg-black text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder: text-base'>Login</button>

        <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
      </form>
      </div>
      <div>
        <Link to='/captain-login' className='bg-[#F4C165] flex item-center justify-center text-white font-semibold mb-5 rounded px-4 py-2  w-full text-lg placeholder: text-base'>Sign in as Captain</Link>
      </div>
      
    </div>
  )
}

export default UserLogin
