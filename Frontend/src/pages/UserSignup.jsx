import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../assets/context/UserContext'

const UserSignup = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [userData, setuserData] = useState({})

  const navigate = useNavigate();

  const {user,setUser} = React.useContext(UserDataContext)

  const submitHandler = async (e) => {
  e.preventDefault();

  const newUser = {
    fullname: {
      firstname: firstName,
      lastname: lastName
    },
    email: email,
    password: password,
  };

  try {
    
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    // clear form fields
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  } catch (error) {
    //  ADD THIS LOGGING BLOCK
    if (error.response) {
      console.log("📦 Full error response from backend:", error.response.data);
      alert(error.response.data.message || "Registration failed");
    } else {
      console.log("❌ Error:", error.message);
      alert("Something went wrong.");
    }
  }
};


  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <form onSubmit={(e)=>{
          submitHandler(e)
        }}>
          
        <img className='w-16 mb-10 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <h3 className='text-lg font-medium mb-2'>What's your name</h3>
        <div className='flex mb-6 gap-4'>

        <input 
        required 
        value={firstName}
        onChange={(e)=>
          setFirstName(e.target.value)
          }
        className='bg-[#FFFFFF]  w-1/2 rounded  px-4 py-2 text-lg placeholder: text-base'
        type="text" placeholder='First Name' 
        />
        <input 
        required
        value={lastName}
        onChange={(e)=>
          setLastName(e.target.value)
          }
          className='bg-[#FFFFFF]  w-1/2 rounded  px-4 py-2   text-lg placeholder: text-base'
        type="text" placeholder='Last Name' 
        />
        </div>


        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input 
        required 
        value={email}
        onChange={(e)=>
          setEmail(e.target.value)
          }
        className='bg-[#FFFFFF] mb-6 rounded px-4 py-2  w-full text-lg placeholder: text-base'
        type="email" placeholder='email@example.com' 
        />
        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
        <input 
        required
        value={password}
        onChange={(e)=>
          setPassword(e.target.value)
          }
        className='bg-[#FFFFFF] mb-6 rounded px-4 py-2  w-full text-lg placeholder: text-base' type="password" placeholder='password' 
        />
        <button className='bg-black text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder: text-base'>Create Account</button>

        <p className='text-center'>Already have a account? <Link to='/login' className='text-blue-600'>Login here</Link></p>
      </form>
      </div>
      <div>
        <p className='text-[9px] leading-tigth'>By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including by automated means, from Uber and its affiliates to the number provided.</p>
      </div>
      
    </div>
  )
}

export default UserSignup
