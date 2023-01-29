import { GoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { url } from '../baseUrl';
import { useRouter } from 'next/router';

const Login = ({ handleOpen1 }: any) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signInWithGoogle, setSignInWithGoogle] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const { asPath } = useRouter() 

  console.log(asPath)

  const handleLogIn = (data: any) => {
    if (password === process.env.NEXT_PUBLIC_PASSWORD && email === process.env.NEXT_PUBLIC_ADMIN) {
      router.push(`/admin/login`)
    }

    if (signInWithGoogle === true) {
      axios.post(`${url}/users/google`, data)
      .then(res => {
        res.data.firstName === '' ? alert('User not found') : (
          dispatch({ type: 'loginUser', payload: { 
            firstName: res.data.firstName, 
            lastName: res.data.lastName, 
            password: res.data.password,
            email: res.data.email,
            id: res.data._id,
            birthDay: res.data.birthDay,
            birthMonth: res.data.birthMonth,
            birthYear: res.data.birthYear
          }})
        )     
      })   
    } else {
      const data = {
        email,
        password,
      }
      axios.post(`${url}/users/user`, data)
      .then(res => {
        res.data.firstName === '' ? alert('User not found') : (
            dispatch({ type: 'loginUser', payload: { 
              firstName: res.data.firstName, 
              lastName: res.data.lastName, 
              password: res.data.password,
              email: res.data.email,
              id: res.data._id,
              birthDay: res.data.birthDay,
              birthMonth: res.data.birthMonth,
              birthYear: res.data.birthYear
            }})
        )     
      })
    }

    router.push(`/`)
  }

  return (
    <div className='absolute w-screen xs:w-[1517px] xs:h-[3300px] top-0 bg-[#000000d5] 
    z-10 h-screen md:w-[1517px] md:h-[3300px]'>
      <div className='h-[670px] w-[500px] bg-[#bff3f6] ml-[500px] mt-4 rounded-3xl md:w-[750px] md:h-[800px]
      xs:w-[750px] xs:ml-[360px] xs:h-[800px] xs:mt-[1000px] md:ml-[360px] md:mt-[620px]'>
        <p className='absolute text-3xl w-[350px] text-center xs:ml-[200px] md:ml-[200px] ml-[75px] mt-[40px] 
        text-[#176d73]'>
          Log In
        </p>
        <AiOutlineClose className='absolute text-[#176d73] xs:ml-[700px] md:ml-[700px] mt-8 ml-[450px] 
        text-2xl' onClick={handleOpen1}/>

        <input className='w-[360px] mt-[100px] ml-[60px] bg-transparent h-[44px] text-xl 
        border-b outline-none border-b-[#176d73] text-[#176d73] xs:w-[500px] xs:ml-[120px] xs:mt-32 md:mt-32 
        md:w-[500px] md:ml-[120px]' placeholder='Email Address'
        value={email} onChange={e => setEmail(e.target.value)}/>

        <input className='w-[360px] mt-[20px] ml-[60px] bg-transparent h-[44px] text-xl 
        border-b outline-none border-b-[#176d73] text-[#176d73] xs:w-[500px] xs:ml-[120px] xs:mt-16 md:mt-16 
        md:w-[500px] md:ml-[120px]' placeholder='Password' value={password} type='password' 
        onChange={(e => setPassword(e.target.value))}/>

        <button className='w-[370px] border h-[50px] rounded-full text-[#176d73] text-xl bg-[#abe5e8]
        border-[#176d73] ml-16 mt-[40px] md:ml-[180px] xs:ml-[180px] xs:mt-[70px] md:mt-[70px]' 
        disabled={password === '' || email === '' ? true : false} onClick={handleLogIn}>
          Continue
        </button>

        <p className='text-[#176d73] xs:mt-8 md:mt-8 text-xl mt-2 text-center'>or</p>

        <div className='ml-[90px] md:ml-[200px] xs:mt-16 xs:ml-[200px] mt-8'>     
          <GoogleLogin
            onSuccess={credentialResponse => {
              setSignInWithGoogle(true)
              handleLogIn(jwt_decode(credentialResponse.credential!))
            }}
            onError={() => {
              console.log('Login Failed');
            }}
            useOneTap
            size='large'
            shape='pill'
            theme='outline'
            width='320'
          />
        </div>
      </div>
    </div>
  )
}

export default Login