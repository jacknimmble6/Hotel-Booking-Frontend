import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineArrowRight, AiOutlineSearch, AiOutlineTeam, AiOutlinePlus, 
AiOutlineMinus } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { url } from '../baseUrl';
import { RootState } from '../reducers';

const Searchbar = (hotel: any) => {
  const [hotelData, setHotelData] = useState([])
  const dispatch = useDispatch()
  const city = useSelector((state: RootState) => state.search.city)
  const checkIn = useSelector((state: RootState) => state.search.checkIn)
  const checkOut = useSelector((state: RootState) => state.search.checkOut)
  const guests = useSelector((state: RootState) => state.search.guests)

  useEffect(() => {
    axios.get(`${url}/hotels`)
    .then(res => setHotelData(res.data))
  
  }, [])

  
  const increase = () => {
    dispatch({ type: 'addGuests' })
  }
  
  const decrease = () => {
    dispatch({ type: 'decreaseGuests'  })
  }

  const addCity = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    dispatch({ type: 'addCity', payload: { search: { city: e.target.value } } })
  }

  const addCheckIn = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    dispatch({ type: 'addCheckIn', payload: { search: { checkIn: e.target.value } } })
  }

  const addCheckOut = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    dispatch({ type: 'addCheckOut', payload: { search: { checkOut: e.target.value } } })
  }

  return (
    <div className="absolute w-[1320px] font-['DM Sans'] rounded-t-full ml-24 z-0 -mt-16 h-[100px] bg-[#ddebed]">
      <AiOutlineSearch className="text-[#2f5253] absolute top-[45px] ml-[70px] text-4xl"/>

      <input type="text" placeholder='Select a city' className="mt-8 ml-16 bg-[#176d73] h-16 w-[360px] 
      rounded-l-full placeholder:left-64 placeholder:text-xl font-['DM Sans'] text-xl outline-none pl-16 text-left" 
      onChange={addCity} value={city} list='cities'/>

      <datalist id='cities'>
        {hotelData.map((h: any) => <option key={h._id}>{h.city}</option>)}
      </datalist>
      
      <input type='date' value={checkIn} className="absolute h-16 bg-[#176d73] mt-8" onChange={addCheckIn}/>

      <p className="bg-[#176d73] -mt-[64px] h-16 w-16 ml-[560px]">
        <AiOutlineArrowRight className=" absolute mt-[20px] z-0 text-2xl w-16 ml-[0px]"/>
      </p>

      <input type='date' value={checkOut} className="absolute font-sans ml-[620px] h-16 bg-[#176d73] -mt-16" 
      onChange={addCheckOut}/>

      <div className="bg-[#176d73] w-[490px] -mt-16 h-16 rounded-r-full ml-[756px]">
        <AiOutlineTeam className="absolute text-2xl ml-[40px] mt-[20px]"/>

        <p className='absolute mt-4 text-xl select-none ml-[85px]'>Guests</p>

        <AiOutlinePlus className="absolute select-none text-2xl ml-[230px] mt-[20px]" onClick={increase} />

        <p className='absolute mt-4 text-xl select-none ml-[200px]'>{guests}</p>

        <AiOutlineMinus className="absolute select-none text-2xl ml-[160px] mt-[20px]" onClick={decrease} />

        <Link href='/propertySearch'>
          <input type="submit" className="absolute select-none text-[#176d73] h-[45px] text-xl ml-[340px] 
          bg-[#7dc3c7] rounded-full w-32 mt-[10px]"/>
        </Link>
        
      </div>
    </div>
  )
}

export default Searchbar