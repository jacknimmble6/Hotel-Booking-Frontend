import { GoogleLogin } from '@react-oauth/google'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import jwt_decode from "jwt-decode";
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

const SignUp = ({ handleOpen, handleStep }: any) => {
  const [googleToken ,setGoogleToken] = useState<any>({})
  const router = useRouter()
  const dispatch = useDispatch()
  const [email,setEmail] = useState('')

  useEffect(() => {
    if (googleToken && email === '') {
      dispatch({ type: 'addFirstName', payload: { firstName: googleToken.given_name || '' } })
      dispatch({ type: 'addLastName', payload: { lastName: googleToken.family_name || '' } })
      dispatch({ type: 'addEmail', payload: { email: googleToken.email || '' } })
    }
  })

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    dispatch({ type: 'addEmail', payload: { email: e.target.value } })
  }

  return (
    <div className='absolute w-screen xs:w-[1517px] xs:h-[3300px] top-0 bg-[#000000d5] z-10 h-screen
    md:w-[1520px] md:h-[2300px]'>
      <div className='h-[570px] md:w-[750px] md:h-[800px] w-[500px] xs:w-[750px] xs:ml-[360px] xs:h-[800px] 
      xs:mt-[700px] bg-[#bff3f6] ml-[360px] md:mt-[620px] mt-16 rounded-3xl'>
        <p className='absolute text-3xl ml-[190px] xs:ml-[340px] md:ml-[340px] mt-8 text-[#176d73]'>Sign Up</p>
        <AiOutlineClose className='absolute text-[#176d73] xs:ml-[670px] md:ml-[670px] mt-8 
        ml-[450px] text-2xl' onClick={handleOpen}/>
        <input className='w-[360px] xs:w-[500px] xs:ml-[120px] mt-32 ml-[70px] bg-transparent h-[44px] text-xl 
        border-b outline-none border-b-[#176d73] text-[#176d73] xs:mt-48 md:mt-48 md:w-[500px] md:ml-[120px]' 
        placeholder='Email Address' value={email} onChange={(e) => handleEmail(e)}/>
        <button className='w-[370px] border h-[50px] rounded-full text-[#176d73] text-xl bg-[#abe5e8]
        border-[#176d73] ml-16 mt-[40px] xs:ml-48 xs:mt-[80px] md:ml-48 md:mt-[80px]' 
        disabled={email === '' ? true : false} onClick={handleStep}>
          Continue
        </button>
        <p className='text-center mt-4 text-[#176d73] md:mt-16 xs:mt-16'>or continue with</p> 
        <div className='ml-16 mt-8 xs:mt-16 md:mt-16 md:ml-48 xs:ml-48 rounded-full'>
          <div className='ml-[20px]'>     
          <GoogleLogin
            onSuccess={credentialResponse => {
              setGoogleToken(jwt_decode(credentialResponse.credential!))
              
              router.push(`/FinalPage`)
            }}
            onError={() => {
              console.log('Login Failed');
            }}
            context='signup'
            useOneTap
            size='large'
            shape='pill'
            theme='outline'
            width='320'
          />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp