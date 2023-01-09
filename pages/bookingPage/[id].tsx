import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { useRouter } from 'next/router'
import axios from 'axios'
import { ImProfile } from 'react-icons/im'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import Payment from '../../components/Payment'
import Form from '../../components/Form'
import { url } from '../../baseUrl'
import Head from 'next/head'

const BookingPage = () => {
  const [hotelData, setHotelData] = useState<any>({})
  const router = useRouter()
  const { id } = router.query
  const checkIn = useSelector((state: PageSearchState) => state.checkIn)
  const checkOut = useSelector((state: PageSearchState) => state.checkOut)
  const [false1, setFalse1] = useState(false)

  useEffect(() => {
    if(!id) {
      return;
    }
    const fetch = async () => {
      await axios.get(`${url}/hotels/${id}`)
      .then(res => setHotelData(res.data))
    }
    fetch()

  }, [id])

  const hotel = JSON.parse(localStorage.getItem('room') || '{}')
  
  let date1 = new Date(checkIn)
  let date2 = new Date(checkOut)
 
  const date = new Date(date1.getTime());

  const dates1: any = [];

  while (date <= date2) {
    dates1.push(new Date(date).getTime());
    date.setDate(date.getDate() + 1);
  }  

  const bookDate = new Date(dates1[0] + 86400000)
  const bookDate1 = new Date(dates1[dates1.length - 1] + 86400000)

  const weekday = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const diffTime = Math.abs(new Date(bookDate1).valueOf() - new Date(bookDate).valueOf());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

  const price = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(hotel.map((h: { price: any }) => h.price)[0] * diffDays * 0.06 + (hotel.map((h: { price: any }) => h.price)[0] * diffDays));
  
  const searchArray = hotel.map((r: { bookedDates: any[] }) => {

    if (r.bookedDates.some((item: any) => dates1.includes(item))) {
      return;
    } else {
      return r
    }
  })

  const modifiedRooms: any[] = []

  hotelData.rooms?.map((r: { roomNumber: any; bookedDates: any[] }) => {
    if (r.roomNumber !== searchArray[0].roomNumber) {
      modifiedRooms.push(r)
    } 
    if (r.roomNumber === searchArray[0].roomNumber) {
      r.bookedDates.push(...dates1)
      modifiedRooms.push(r)
    }
  })


  const updateData = {
    city: hotelData.city,
    country: hotelData.country,
    state: hotelData.state,
    location: hotelData.location,
    generalImages: hotelData?.generalImages,
    OverviewDescription: hotelData.OverviewDescription,
    NeighborhoodDescription: hotelData.NeighborhoodDescription,
    Address: hotelData.Address,
    neighborhood: hotelData.neighborhood,
    PublicTransit: hotelData.PublicTransit,
    Downtown: hotelData.Downtown,
    Parking: hotelData.Parking,
    name: hotelData.name,
    amountOfRooms: hotelData.amountOfRooms,
    amenities: hotelData.amenities,
    rooms: modifiedRooms,
    checkInTime: hotelData.checkInTime,
    checkOutTime: hotelData.checkOutTime,
    flexibleCancellation: hotelData.flexibleCancellation,
    checkInPolicy: hotelData.checkInPolicy,
    houseRules: hotelData.houseRules,
    notes: hotelData.notes,
    latitude: hotelData.latitude,
    longitude: hotelData.longitude,
    typeOfRooms: hotelData.typeOfRooms,
    Accessibility: hotelData.Accessibility
  }

  return (
    <div className=''>
      <Header />

      <Head>
        <title>Booking</title>
      </Head>
      
      <div className='-mt-16 text-[#176d73]'>
        <ImProfile className='text-5xl ml-60 mt-32 text-[#176d73]'/>
        <p className='text-[#176d73] xs:w-[300px] ml-80 text-3xl -mt-[40px]'>Guest Info</p>
        
        <Form setFalse1={setFalse1} />
        <div className='mt-[40px]'>
          <Image src={hotel.map((h: { images: any[] }) => h.images[0])[0]} height={240} width={340} alt=''
          className="ml-[1000px] h-[200px] w-[340px] rounded-t-2xl -mt-[280px]" />
          <div className="w-[340px] ml-[1000px] border border-b-[#176d73] h-[150px] bg-[#bff3f6]">
            <p className="absolute md:w-[300px] ml-4 xs:text-sm text-base mt-4 xs:w-[300px]">
              {hotel.map((h: { name: any }) => h.name)[0]}
            </p>
            <p className='absolute ml-4 md:w-[300px] mt-[50px] xs:text-sm xs:w-[300px]'>
              {hotelData.name}
            </p>
            <p className='absolute ml-4 mt-[74px] md:w-[300px] md:mt-[80px] xs:w-[300px] xs:text-sm'>
              {hotelData.neighborhood}, {hotelData.city}
            </p>
            <p className='absolute text-base ml-4 mt-[110px] xs:text-sm md:w-[300px] md:mt-[120px] xs:w-[300px]'>
              {weekday[bookDate.getDay()]}, {months[bookDate.getMonth()]} {bookDate.getDate()} - 
              {weekday[bookDate1.getDay()]}, {months[bookDate1.getMonth()]} {bookDate1.getDate()}
              ({diffDays} nights)
            </p>
          </div>
          <div className='w-[340px] border xs:text-sm border-b-[#176d73] h-24 ml-[1000px] bg-[#bff3f6]'>
            <p className="ml-4 pt-4">
              US ${hotel.map((h: { price: any }) => h.price)[0]} x  {diffDays} nights
            </p>
            <p className="ml-4 pl-60 xs:text-sm -mt-[25px]">
              US ${(hotel.map((h: { price: any }) => h.price)[0] * diffDays)}
            </p>
            <p className="ml-4 xs:text-sm pt-4">
              Tax
            </p>
            <p className="ml-4 pl-60 xs:text-sm -mt-[25px]">
              US {Intl.NumberFormat("en-US", { style: "currency", currency: "USD",
              }).format(hotel.map((h: { price: any }) => h.price)[0] * diffDays * 0.06)}
            </p>
          </div>
          <div className="w-[340px] xs:text-sm h-[50px] ml-[1000px] bg-[#bff3f6] pl-4 pt-4 text-xl">
            Total
            <p className="ml-[230px] xs:-mt-4 -mt-8 xs:text-sm">
              {price}
            </p>
          </div>
        </div>
      </div>
    
      <Payment price={price} roomName={searchArray[0].name} updateData={updateData} false1={false1} 
      roomNumber={searchArray[0].roomNumber} hotelId={id}/>
    </div>
  )
}

export default BookingPage