import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../reducers'

const Form = ({ setFalse1 }: any) => {
  const dispatch = useDispatch()
  const firstName = useSelector((state: RootState) => state.user.firstName)
  const lastName = useSelector((state: RootState) => state.user.lastName)
  const email = useSelector((state: RootState) => state.user.email)
  const birthMonth = useSelector((state: RootState) => state.user.birthMonth)
  const birthYear = useSelector((state: RootState) => state.user.birthYear)
  const birthDay = useSelector((state: RootState) => state.user.birthDay)
  const [confirmEmail, setConfirmEmail] = useState('')

  const handleEmail = (e: { target: { value: any } }) => {
    dispatch({ type: 'addEmail1', payload: { email: e.target.value } })
  }
      
  const handleFirstName = (e: { target: { value: any } }) => {
    dispatch({ type: 'addFirstName1', payload: { firstName: e.target.value } })
  }
    
  const handleLastName = (e: { target: { value: any } }) => {
    dispatch({ type: 'addLastName1', payload: { lastName: e.target.value } })
  }
    
  const handleBirthDay = (e: { target: { value: any } }) => {
    dispatch({ type: 'addBirthDay1', payload: { birthDay: e.target.value } })
  }
    
  const handleBirthMonth = (e: { target: { value: any } }) => {
    dispatch({ type: 'addBirthMonth1', payload: { birthMonth: e.target.value } })
  }
    
  const handleBirthYear = (e: { target: { value: any } }) => {
    dispatch({ type: 'addBirthYear1', payload: { birthYear: e.target.value } })
  }

  const validate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmEmail(e.target.value)
   
  }

  if (email !== confirmEmail) {
    setFalse1(true)
  }
  if (confirmEmail === email) {
    setFalse1(false)
  }

  return (
    <div>
      <form className='ml-60 mt-8 w-[560px] text-[#176d73]' >
          <input type="text" className="h-[44px] w-[250px] rounded-lg bg-[#ddebed] border focus:outline-none 
          border-[#176d73]" value={email} placeholder="Email" onChange={handleEmail} />
          <input type="text" className={`h-[44px] ml-8 w-[250px] rounded-lg bg-[#ddebed] border border-[#176d73] 
          focus:outline-none `} placeholder="Confirm Email"
          onChange={(e) => validate(e)} value={confirmEmail} />
          <input type="text" className="h-[44px] mt-8 w-[250px] rounded-lg focus:outline-none bg-[#ddebed] border 
          border-[#176d73]" value={firstName} placeholder="First Name"  onChange={handleFirstName} />
          <input type="text" className="h-[44px] focus:outline-none ml-8 w-[250px] rounded-lg bg-[#ddebed] border 
          border-[#176d73]" value={lastName} placeholder="Last Name" onChange={handleLastName} />
          <input type="text" className="h-[44px] mt-8 w-[156px] rounded-lg bg-[#ddebed] border focus:outline-none 
          border-[#176d73]" value={birthMonth} placeholder="Month(mm)" onChange={handleBirthMonth}/>
          <input type="text" className="h-[44px] ml-8 w-[156px] rounded-lg bg-[#ddebed] border focus:outline-none 
          border-[#176d73]" value={birthDay} placeholder="Day(dd)" onChange={handleBirthDay} />
          <input type="text" className="h-[44px] ml-8 w-[156px] rounded-lg bg-[#ddebed] border focus:outline-none 
          border-[#176d73]" value={birthYear} placeholder="Year(yyyy)" onChange={handleBirthYear} />

          
          
        </form>
    </div>
  )
}

export default Form