import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header'
import axios from 'axios'
import { url } from '../baseUrl'
import { RootState } from '../reducers'

const FinalPage = () => {
  const [date, setDate] = useState<any>(new Date())
  const dispatch = useDispatch()
  const firstName = useSelector((state: RootState) => state.signUp.firstName)
  const lastName = useSelector((state: RootState) => state.signUp.lastName)
  const email = useSelector((state: RootState) => state.signUp.email)
  const birthDay = useSelector((state: RootState) => state.signUp.birthDay)
  const birthMonth = useSelector((state: RootState) => state.signUp.birthMonth)
  const birthYear = useSelector((state: RootState) => state.signUp.birthYear)
  const password = useSelector((state: RootState) => state.signUp.password)

  const getAge = () => {
    const birthDay = new Date(date).getTime()
    const today = new Date().getTime()
    const difference = Math.abs(today - birthDay) 

    return difference / 3600000
  }

  const age = getAge() / 8760

  const signUp = () => {
    const day = new Date(date).getDate()
    const month = new Date(date).getMonth()
    const year = new Date(date).getFullYear()

    dispatch({ type: 'addBirthDay', payload: { birthDay: day }})
    dispatch({ type: 'addBirthMonth', payload: { birthMonth: month }})
    dispatch({ type: 'addBirthYear', payload: { birthYear: year }})
 
    const data = {
      firstName,
      lastName,
      email,
      birthDay: day,
      birthMonth: month,
      birthYear: year,
      password
    }
    axios.post(`${url}/users/create`, data).then(res => {
      dispatch({ type: 'setUser', payload: { 
        firstName: res.data.firstName, 
        lastName: res.data.lastName, 
        password: res.data.password,
        email: res.data.email,
        id: res.data._id,
        birthDay: res.data.birthDay,
        birthMonth: res.data.birthMonth,
        birthYear: res.data.birthYear
      }})
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
      dispatch({ type: 'erase2' })
    })
  }

  
  return (
    <div>
      <Header />
      <div className="border-2 text-[#176d73] xs:text-2xl md:text-2xl ml-[550px] xs:mt-[1000px] text-center mt-8 
      border-black h-[170px] w-[400px] xs:w-[670px] xs:h-[400px] xs:ml-[400px] md:mt-[700px]
      md:w-[670px] md:h-[400px] md:ml-[400px]">
        <p className="mt-2 text-sm md:text-2xl xs:text-2xl">BIRTHDATE</p>
        <p className="mt-2 text-sm xs:mt-8 md:mt-8 xs:text-2xl md:text-2xl">
          You must be at least 18 years old to book spaces with HotelBooking.
        </p>
        <input type='date' className='bg-transparent md:w-[500px] xs:w-[500px] xs:mt-16 w-[340px] mt-2 
        border-2 border-[#176d73] md:mt-16' value={date} onChange={(e) => setDate(e.target.value)}/>
        
        <button className='w-[340px] mt-4 h-[32px] xs:mt-16 md:mt-16 border-2 border-[#176d73] 
        xs:w-[500px] md:w-[500px]'  
        disabled={age >= 18 ? false :true} onClick={signUp}>
          {age >= 18 ? 'Sign Up' : 'You need to be at least 18 years old.'}
        </button>
      </div>
    </div>
  )
}

export default FinalPage