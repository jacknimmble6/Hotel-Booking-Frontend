import Link from 'next/link'
import React, { useState } from 'react'
import SignUp from './SignUp';
import SignUp2 from './SignUp2';
import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';

const Header = () => {
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const [signUp1, setSignUp1] = useState(true)
  const [signUp2, setSignUp2] = useState(false)
  const userName = useSelector((state: RootState) => state.user.firstName)
  const id = useSelector((state: RootState) => state.user.id)
  const dispatch = useDispatch()

  const handleOpen = () => {
    setOpen(!open)
    if (open === false) {
      setSignUp1(true)
      setSignUp2(false)
    }
  }

  const handleOpen1 = () => {
    setOpen1(!open1)
  }

  const handleStep = () => {
    setSignUp1(false)
    setSignUp2(true)
  }

  const logout = () => {
    dispatch({ type: 'logOut' })
  }

  return (
    <>
    <div className="bg-[#bff3f6] xs:w-[1400px] md:w-[1440px] font-['DM Sans'] h-[67px]">
      <Link href='/'>
        <p className="text-[#176d73] xs:text-3xl absolute top-2 ml-8 text-4xl">HotelBooking</p>
      </Link>
      {userName === "" ? (
        <>
        <button className="text-[#176d73] md:w-[100px] absolute xs:w-[100px] top-4 ml-[1100px] text-xl" onClick={handleOpen}>
          Sign Up
        </button>
        <button className="text-[#176d73] absolute top-4 ml-[1250px] text-xl" onClick={handleOpen1}>
          Login
        </button>
        </>
      ) : (
        <>
          <Link href={`/user/${id}`}>
            <p className='text-[#176d73] xs:ml-[1100px] md:ml-[1100px] md:w-[200px] xs:w-[200px] absolute top-4 
            ml-[1100px] text-xl'>Hello, {userName}</p>
          </Link>
          <button className='text-[#176d73] xs:w-[200px] xs:ml-[1200px] absolute top-4 
          ml-[1250px] text-xl md:w-[200px] md:ml-[1200px]' onClick={logout}>
            Log Out
          </button>
        </>
      )}
    </div>

    {
      open && signUp1 ? <SignUp handleOpen={handleOpen} handleStep={handleStep} /> : null
    }
    {
      open && signUp2 ? <SignUp2 handleOpen={handleOpen} /> : ''
    }
    {
      open1 ? <Login handleOpen1={handleOpen1} /> : ''
    }
    </>
  )
}

export default Header