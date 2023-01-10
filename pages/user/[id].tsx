import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { url } from '../../baseUrl'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import { useDispatch } from 'react-redux'

const UserPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [user, setUser] = useState<any>({})
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [orders, setOrders] = useState([])
  const [roomPicture, setRoomPicture] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    if (id === undefined) {
      return;
    }
    axios.get(`${url}/users/${id}`)
    .then(res => {
        setUser(res.data)
        setFirstName(res.data.firstName)
        setLastName(res.data.lastName)
        setEmail(res.data.email)
    })
    axios.get(`${url}/orders/${id}`)
    .then(res => setOrders(res.data))

    axios.get(`${url}/hotels`)
    .then(res => setRoomPicture(res.data))
    
  }, [id])

  const formatPhoneNumber = (phoneNumberString: string) => {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  }

  const deleteUser = () => {
    axios.delete(`${url}/users/${id}`)
    dispatch({ type: 'logOut' })
    router.push('/')
  }

  const updateUser = () => {
    const data = {
      firstName,
      lastName,
      password: user.password,
      email,
      birthMonth: user.birthMonth,
      birthYear: user.birthYear,
      birthDay: user.birthDay
    }

    axios.patch(`${url}/users/${id}`, data)
    .then(res => {
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
    })
  }

  return (
    <>
      <Header />
      <div className="text-[#176d73] ml-16">
        <p className="text-2xl mt-24">Update Account</p>

        <label className='block mt-8'>
          <span className="block after:content-['*'] after:text-red-400 after:ml-1">First Name</span>
          <input className="mt-2 h-[44px] w-[300px] rounded-xl border border-[#176d73] bg-[#ddebed]" 
          value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        </label>

        <label className='block -mt-[77px] ml-[320px]'>
          <span className="block after:content-['*'] after:text-red-400 after:ml-1">Last Name</span>
          <input className="mt-2 h-[44px] w-[300px] rounded-xl border border-[#176d73] bg-[#ddebed]" 
          value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        </label>

        <label className='block mt-8'>
          <span className="block after:content-['*'] after:text-red-400 after:ml-1">Email</span>
          <input className="mt-2 h-[44px] w-[621px] rounded-xl border border-[#176d73] bg-[#ddebed]" 
          value={email} onChange={(e) => setEmail(e.target.value)}/>
        </label>

        <button className='h-[50px] w-[210px] bg-[#176d73] mt-[40px] text-xl ml-48 
        text-white rounded-full' onClick={updateUser}>
          Save Updated Info
        </button>

        <button className='absolute h-[50px] w-[210px] bg-[#176d73] -ml-[210px] mt-[130px] text-xl 
        text-white rounded-full xs:ml-48 xs:mt-[80px]' onClick={deleteUser}>
          Delete User
        </button>

        <p className="text-2xl ml-[1000px] -mt-[330px]">Bookings</p>

        <div>
          {orders.length !== 0 ? (
            orders.map((o: any) => (
              <div key={o._id} className="w-[400px] h-[325px] border border-[#176d73] mt-[40px] ml-[850px]">
                <p className='text-center text-lg mt-4'>{o.roomName}</p>
                <p className='text-center text-lg mt-4'>Room Number: {o.roomNumber}</p>
                <p className='text-center text-lg mt-4'>Phone Number: {formatPhoneNumber(o.phoneNumber)}</p>
                <p className='text-center text-lg mt-4'>Email: {o.email}</p>
                <p className='text-center text-lg mt-4'>Check-In: {o.checkIn}</p>
                <p className='text-center text-lg mt-4'>Check-Out: {o.checkOut}</p>
                <p className='text-center text-lg mt-4'>Total: {o.total}</p>
              </div>
            ))) : <p className="text-3xl mt-[70px] ml-[970px]">No Bookings</p>
          }
        </div>
      </div>
    </>
  )
}

export default UserPage