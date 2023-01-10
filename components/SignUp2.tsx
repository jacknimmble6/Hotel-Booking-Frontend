import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../reducers'

const SignUp2 = ({ handleOpen }: any) => {
  const [confirmEmail, setConfirmEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const dispatch = useDispatch()
  const email = useSelector((state: RootState) => state.signUp.email)
  const router = useRouter()
  
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    dispatch({ type: 'addPassword', payload: { password: e.target.value } })
  }

  const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value)
    dispatch({ type: 'addFirstName', payload: { firstName: e.target.value } })
  }

  const handleLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value)
    dispatch({ type: 'addLastName', payload: { lastName: e.target.value } })
  }
  
  const changePage = () => {
    router.push(`/FinalPage`)
  }

  return (
    <div className='absolute xs:w-[1517px] xs:h-[3300px] w-screen md:w-[1520px] md:h-[2300px] 
    top-0 bg-[#000000d5] z-10 h-screen'>
      <div className='h-[670px] md:w-[750px] md:h-[800px] w-[500px] bg-[#bff3f6] ml-[480px] mt-4 rounded-3xl
      xs:w-[750px] xs:ml-[360px] xs:h-[800px] xs:mt-[700px] md:ml-[360px] md:mt-[620px]'>
        <p className='absolute text-3xl xs:ml-[200px] md:ml-[200px] w-[350px] text-center ml-[75px] 
        mt-[40px] text-[#176d73]'>
          Looks like you’re new Please create an account
        </p>
        <AiOutlineClose className='absolute text-[#176d73] xs:ml-[700px] mt-8 ml-[450px] 
        text-2xl md:ml-[700px]' onClick={handleOpen}/>
        <p className='absolute xs:ml-24 md:ml-24 text-[#176d73] text-xl mt-[145px] ml-16'>Account Info</p>
        <input className='w-[360px] mt-[200px] xs:w-[550px] md:w-[550px] xs:ml-[100px] ml-[60px] bg-transparent 
        h-[44px] text-xl border-b outline-none border-b-[#176d73] text-[#176d73] md:ml-[100px]' 
        placeholder='Email Address' value={email} type='email'/>
        <input className={`w-[360px] mt-[20px] ml-[60px] xs:ml-[100px] bg-transparent h-[44px] text-xl xs:w-[550px]
        border-b outline-none md:ml-[100px] md:w-[550px] ${email === confirmEmail ? 'border-b-[#176d73]': 
        'border-b-2 border-b-red-900'} text-[#176d73]`} placeholder='Confirm Email' value={confirmEmail} 
        onChange={(e) => setConfirmEmail(e.target.value)} />
        <input className='w-[360px] mt-[20px] xs:ml-[100px] ml-[60px] bg-transparent h-[44px] text-xl 
        border-b outline-none border-b-[#176d73] text-[#176d73] xs:w-[550px] md:ml-[100px] md:w-[550px]' 
        placeholder='Password' value={password} onChange={handlePassword} />
        <input className='w-[360px] mt-[20px] ml-[60px] xs:ml-[100px] bg-transparent h-[44px] text-xl 
        border-b outline-none border-b-[#176d73] text-[#176d73] md:ml-[100px] md:w-[550px] xs:w-[550px]' 
        placeholder='First Name'value={firstName} onChange={handleFirstName} />
        <input className='w-[360px] mt-[20px] xs:ml-[100px] ml-[60px] bg-transparent h-[44px] text-xl 
        border-b outline-none border-b-[#176d73] text-[#176d73] xs:w-[550px] md:ml-[100px] md:w-[550px]' 
        placeholder='Last Name' value={lastName} onChange={handleLastName} />

        <button className='w-[370px] border h-[50px] rounded-full text-[#176d73] text-xl bg-[#abe5e8]
        border-[#176d73] ml-16 mt-[40px] xs:ml-48 xs:mt-[80px] md:ml-48 md:mt-[80px]' 
        disabled={password === '' || firstName === '' || lastName === '' || email !== confirmEmail ? true 
        : false} onClick={changePage}>
          Continue
        </button>
      </div>
    </div>
  )
}

export default SignUp2