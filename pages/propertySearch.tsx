import Head from 'next/head';
import React, { useState } from 'react'
import { AiOutlineArrowRight, AiOutlineMinus, AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { url } from '../baseUrl';
import FilteredHotel from '../components/FilteredHotel';
import Header from '../components/Header';
import Map from '../components/Map';
import { RootState } from '../reducers';

const PropertySearch = (hotel:any) => {
  const guests = useSelector((state: RootState) => state.search.guests)
  const searchText = useSelector((state: RootState) => state.search.city)   
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const beds = useSelector((state: RootState) => state.search.beds)
  const bathrooms = useSelector((state: RootState) => state.search.bathrooms)
  const bedrooms = useSelector((state: RootState) => state.search.bedrooms)
  const checkIn = useSelector((state: RootState) => state.search.checkIn)
  const checkOut = useSelector((state: RootState) => state.search.checkOut)
  const airConditioning = useSelector((state: RootState) => state.search.airConditioning)
  const elevatorAccess = useSelector((state: RootState) => state.search.elevatorAccess)
  const parking = useSelector((state: RootState) => state.search.parking)
  const outdoorSpace = useSelector((state: RootState) => state.search.outdoorSpace)
  const kidFriendly = useSelector((state: RootState) => state.search.kidFriendly)
  const inSuiteLaundry = useSelector((state: RootState) => state.search.inSuiteLaundry)
  const priceMin = useSelector((state: RootState) => state.search.priceMin)
  const priceMax = useSelector((state: RootState) => state.search.priceMax)

  const hotelGuests = hotel.hotel.filter((hotel: { city: string; }) => hotel.city === searchText)
  .map((hotel: { rooms: any; }) => hotel.rooms)?.[0]?.[0]?.numberOfGuests

  const hotelBedrooms = hotel.hotel.filter((hotel: { city: string; }) => hotel.city === searchText)
  .map((hotel: { rooms: any; }) => hotel.rooms)?.[0]?.[0]?.numberOfBedrooms

  const hotelBathrooms = hotel.hotel.filter((hotel: { city: string; }) => hotel.city === searchText)
  .map((hotel: { rooms: any; }) => hotel.rooms)?.[0]?.[0]?.numberOfBathrooms

  const hotelBeds = hotel.hotel.filter((hotel: { city: string; }) => hotel.city === searchText)
  .map((hotel: { rooms: any; }) => hotel.rooms)?.[0]?.[0]?.numberOfBeds

  const hotelPrice = hotel.hotel.filter((hotel: { city: string; }) => hotel.city === searchText)
  .map((hotel: { rooms: any; }) => hotel.rooms)?.[0]?.[0]?.price
  
  const hotelInSuiteLaundry = inSuiteLaundry ? 
  hotel.hotel.filter((hotel: { city: string; }) => hotel.city === searchText)
  .map((hotel: { rooms: any; }) => hotel.rooms)?.[0]?.[0]?.features.includes('In unit laundry')  
  : ''

  const hotelOutdoorSpace = outdoorSpace ? 
  hotel.hotel.filter((hotel: { city: string; }) => hotel.city === searchText)
  .map((hotel: { rooms: any; }) => hotel.rooms)?.[0]?.[0]?.features.includes('Outdoor space')  
  : ''

  const hotelKidFriendly = kidFriendly ? 
  hotel.hotel.filter((hotel: { city: string; }) => hotel.city === searchText)
  .map((hotel: { rooms: any; }) => hotel.rooms)?.[0]?.[0]?.features.includes('Kid friendly')  
  : ''

  const hotelParking = parking ? 
  hotel.hotel.filter((hotel: { city: string; }) => hotel.city === searchText)
  .map((hotel: { rooms: any; }) => hotel.rooms)?.[0]?.[0]?.features.includes('Parking')  
  : ''

  const hotelAirConditioning = airConditioning ? 
  hotel.hotel.filter((hotel: { city: string; }) => hotel.city === searchText)
  .map((hotel: { rooms: any; }) => hotel.rooms)?.[0]?.[0]?.features.includes('Air conditioning')  
  : ''

  const hotelElevatorAccess = elevatorAccess ? 
  hotel.hotel.filter((hotel: { city: string; }) => hotel.city === searchText)
  .map((hotel: { rooms: any; }) => hotel.rooms)?.[0]?.[0]?.features.includes('Elevator access')  
  : ''

  const hotelFinalFilter = hotel.hotel.filter((hotel: { city: string; }) => hotel.city === searchText &&
   hotelGuests >= guests && hotelPrice >= priceMin && hotelPrice <= priceMax &&
   hotelBedrooms >= bedrooms && hotelBathrooms >= bathrooms && hotelBeds >= beds
   && hotelInSuiteLaundry !== false && hotelElevatorAccess !== false && hotelParking !== false
   && hotelAirConditioning !== false && hotelKidFriendly !== false && hotelOutdoorSpace !== false)

  const booked: number[] = []

  const checkDate = (hotelData: { rooms: any[]; }) => {

    let date1 = new Date(checkIn)
    let date2 = new Date(checkOut)
 
    const date = new Date(date1.getTime());

    const dates1: number[] = [];

    while (date <= date2) {
      dates1.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    const merge: any[] = []

    hotelData.rooms.map(b => b.bookedDates?.map((b: any) =>  merge.push(b)))
    
    merge?.some(r => {
      booked.push(dates1.indexOf(r))
    })

    if (booked.includes(-1) === true) {
      return hotelData
    } else {
      return;
    }     
  }

  const dateFilter = hotelFinalFilter?.filter((h: { rooms: any[]; }) => checkDate(h))

  const handleAirConditioning = () => {
    dispatch({ type: 'changeAirConditioning', payload: { search: { airConditioning: !airConditioning } }})
  }

  const handleElevatorAccess = () => {
    dispatch({ type: 'changeElevatorAccess', payload: { search: { elevatorAccess: !elevatorAccess } }})
  }

  const handleParking = () => {
    dispatch({ type: 'changeParking', payload: { search: { parking: !parking } }})
  }

  const handleOutdoorSpace = () => {
    dispatch({ type: 'changeOutdoorSpace', payload: { search: { outdoorSpace: !outdoorSpace } }})
  }

  const handleKidFriendly = () => {
    dispatch({ type: 'changeKidFriendly', payload: { search: { kidFriendly: !kidFriendly } } })
  }

  const handleInSuiteLaundry = () => {
    dispatch({ type: 'changeInSuiteLaundry', payload: { search: { inSuiteLaundry: !inSuiteLaundry } }})
  }

  const increase = () => {
    dispatch({ type: 'addGuests' })
  }

  const handleBedIncrease = () => {
    dispatch({ type: 'increaseBeds'})
  }

  const handleBedDecrease = () => {
    if (beds === 0) {
      return null
    } else {
      dispatch({ type: 'decreaseBeds'})
    }
  }

  const handleBedroomIncrease = () => {
    dispatch({ type: 'increaseBedrooms'})
  }

  const handleBedroomDecrease = () => {
    if (bedrooms === 0) {
      return null
    } else {
      dispatch({ type: 'decreaseBedrooms'})
    }
  }

  const handleBathroomIncrease = () => {
    dispatch({ type: 'increaseBathrooms'})
  }

  const handleBathroomDecrease = () => {
    if (bathrooms === 0) {
      return null
    } else {
      dispatch({ type: 'decreaseBathrooms'})
    }
  }

  const displayRange = () => {
    setOpen(!open)
    setOpen2(false)
  }

  const displayRange2 = () => {
    setOpen2(!open2)
    setOpen(false)
  }

  const handleFromSlider = (e: { target: { value: React.SetStateAction<any>; }; }) => {
    dispatch({ type: 'changePriceMin', payload: { search: { priceMin: parseFloat(e.target.value) } }})
  }

  const handleToSlider = (e: { target: { value: React.SetStateAction<any>; }; }) => {
    dispatch({ type: 'changePriceMax', payload: { search: { priceMax: parseFloat(e.target.value) } }})
  }

  const decrease = () => {
    if (guests === 0) {
      return null
    } else {
      dispatch({ type: 'decreaseGuests' })
    }
  }

  const addCity = (e: {target: { value: React.SetStateAction<string>; };}) => {     
      dispatch({ type: 'addCity', payload: { search: { city: e.target.value } } }) 
  }

  const addCheckIn = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    dispatch({ type: 'addCheckIn', payload: { search: { checkIn: e.target.value } } })
  }

  const addCheckOut = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    dispatch({ type: 'addCheckOut', payload: { search: { checkOut: e.target.value } } })
  }

  return (
    <div className='grid-cols-2 grid-rows-3'>
      <Head>
        <title>Hotel Search</title>
      </Head>

      <div className='col-span-2 row-span-1'>
        <Header />
      </div>
      
      <div className="col-span-2 row-span-2">
        <AiOutlineSearch className="text-[#2f5253] absolute top-[105px] ml-[40px] text-4xl"/>
      
        <input list='cities' type="text" onChange={addCity} value={searchText} className="h-[46px] font-['DM Sans'] 
        text-xl w-[200px] ml-8 mt-8 bg-[#176d73] rounded-full pl-16 outline-none" />

        <datalist id='cities'>
          {hotel.hotel.map((h: { _id: React.Key | null | undefined; city: string | number | boolean | React.ReactElement<any, string 
            | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => 
            <option key={h._id}>{h.city}</option>)}
        </datalist>
        <input type='date' className="absolute rounded-l-full ml-16 h-[46px] bg-[#176d73] mt-8" 
        value={checkIn}  onChange={(e) => {addCheckIn(e)}}/>
      
        <p className="bg-[#176d73] -mt-[46px] h-[46px] w-16 ml-[432px]">
          <AiOutlineArrowRight className=" absolute mt-[12px] z-0 text-2xl w-16 ml-[0px]"/>
        </p>
      
        <input type='date' className="absolute rounded-r-full font-sans ml-[496px] h-[46px] bg-[#176d73] -mt-[46px]" 
        value={checkOut} onChange={(e) => {addCheckOut(e)}}/>

        <div className=" outline-red-500 outline-8 ml-[600px] -mt-[65px]">        
          <p className="absolute bg-[#176d73] h-[46px] pl-2 pt-2 w-[80px] text-xl mt-[21px] rounded-l-full 
          ml-[80px]">
            Guests
          </p>

          <AiOutlinePlus className="absolute select-none rounded-r-full w-[50px] pt-2 pb-2 h-[46px] bg-[#176d73] text-xl 
          ml-[230px] mt-[21px]" onClick={increase} />

          <p className='absolute mt-[21px] pt-2 pl-2 text-center w-[46px] text-xl bg-[#176d73] h-[46px] select-none 
          ml-[184px]'>
            {guests}
          </p>

          <AiOutlineMinus className="absolute select-none h-[46px] bg-[#176d73] text-2xl ml-[160px] mt-[21px]" 
          onClick={decrease} />

          <button className="bg-[#176d73] ml-80 mt-[22px] h-[46px] w-[110px] rounded-full text-2xl" 
          onClick={displayRange}>
            Price
          </button>

          <button className="absolute bg-[#176d73] ml-[40px] xs:ml-[520px] xs:-mt-[43px] mt-[23px] h-[46px] 
          w-[110px] rounded-full text-2xl md:ml-[500px] md:-mt-[43px]" 
          onClick={displayRange2}>
            Filter
          </button>

          {open ? (
            <div className="absolute z-[1] bg-[#7dc3c7] w-[380px] h-[200px] rounded-[15px] mt-8 ml-16">
              <p className="absolute mt-[40px] ml-[20px] text-xl text-[#176d73]">Price per night</p>
              <div className="sliders_control">
                <input id="fromSlider" value={priceMin} className="absolute mt-[115px] h-0 ml-[9px] z-[1]" 
                type="range" min="0" max="1000" onChange={handleFromSlider} />
                <input id="toSlider" value={priceMax} className="absolute mt-[115px] ml-[11px]" type="range" 
                min="0" max="1000" onChange={handleToSlider} />
                <p className="absolute mt-[155px] ml-[20px] text-xl text-[#176d73]">${priceMin} - ${priceMax}</p>
              </div>
            </div>
          ) : '' }

          {open2 ? (
            <div className="absolute z-[1] bg-[#7dc3c7] w-[650px] h-[270px] rounded-[15px] mt-8 ml-16">
              <p className="text-[#176d73] absolute text-xl ml-4 mt-4">Filters</p>
 
              <div>
                <p className="text-lg absolute ml-4 text-[#176d73] mt-16">Bedrooms (min)</p>
                <p className="text-xl absolute ml-[180px] text-[#176d73] mt-16">{bedrooms}</p>
                <AiOutlinePlus className="absolute mt-[66px] ml-[200px] text-[#176d73] text-2xl select-none" 
                onClick={handleBedroomIncrease}/>
                <AiOutlineMinus className="absolute mt-[66px] ml-[145px] text-[#176d73] text-2xl select-none" 
                onClick={handleBedroomDecrease}/>
              </div>

              <div>
                <p className="text-lg absolute ml-4 text-[#176d73] mt-[115px]">Beds (min)</p>
                <p className="text-xl absolute ml-[140px] text-[#176d73] mt-[115px]">{beds}</p>
                <AiOutlinePlus className="absolute mt-[117px] ml-[160px] text-[#176d73] text-2xl select-none" 
                onClick={handleBedIncrease}/>
                <AiOutlineMinus className="absolute mt-[117px] ml-[105px] text-[#176d73] text-2xl select-none" 
                onClick={handleBedDecrease}/>
              </div>
  
              <div>
                <p className="text-lg absolute ml-4 text-[#176d73] mt-[165px]">Bathrooms (min)</p>
                <p className="text-xl absolute ml-[182px] text-[#176d73] mt-[165px]">{bathrooms}</p>
                <AiOutlinePlus className="absolute select-none mt-[167px] ml-[202px] text-[#176d73] text-2xl" 
                onClick={handleBathroomIncrease}/>
                <AiOutlineMinus className="absolute select-none mt-[167px] ml-[147px] text-[#176d73] text-2xl" 
                onClick={handleBathroomDecrease}/>
              </div>

              <p className='text-[#176d73] absolute text-xl ml-[400px] mt-4'>Other Features</p>

              <div className='text-[#176d73] absolute text-sm ml-[300px] mt-[70px]'>
                <input type='checkbox' checked={airConditioning} onClick={handleAirConditioning}
                 value='Air Conditioning' />
                <p className="ml-[25px] -mt-[20px]">
                  Air Conditioning
                </p>
              </div>

              <div className='text-[#176d73] absolute text-sm ml-[300px] mt-[110px]'>
                <input type='checkbox' checked={elevatorAccess} onClick={handleElevatorAccess}
                value='Elevator Access' />
                <p className="ml-[25px] -mt-[20px]">
                  Elevator Access
                </p>
              </div>

              <div className='text-[#176d73] absolute text-sm ml-[300px] mt-[150px]'>
                <input type='checkbox' checked={parking} onClick={handleParking} value='Parking' />
                <p className="ml-[25px] -mt-[20px]">
                  Parking
                </p>
              </div>

              <div className='text-[#176d73] absolute text-sm ml-[300px] mt-[190px]'>
                <input type='checkbox' checked={outdoorSpace} onClick={handleOutdoorSpace} value='Outdoor Space' />
                <p className="ml-[25px] -mt-[20px]">
                  Outdoor Space
                </p>
              </div>

              <div className='text-[#176d73] absolute text-sm ml-[480px] mt-[70px]'>
                <input type='checkbox' checked={kidFriendly} onClick={handleKidFriendly} value='Kid Friendly' />
                <p className="ml-[25px] -mt-[20px]">
                  Kid Friendly
                </p>
              </div>

              <div className='text-[#176d73] absolute text-sm ml-[480px] mt-[110px]'>
                <input type='checkbox' checked={inSuiteLaundry} onClick={handleInSuiteLaundry} value='In unit Laundry' />
                <p className="ml-[25px] -mt-[20px]">
                  In-Suite Laundry
                </p>
              </div>
            </div>
          ) : ''}
        </div>
      </div>
      
      <div className="col-span-1 row-span-1">
        <Map hotelData={hotelFinalFilter} />
      </div>
      <div className="col-span-1 row-span-1">
        <FilteredHotel hotelData={dateFilter} />
      </div>
    </div>
  )
}

{/*export const getServerSideProps = async () => {
  const res = await fetch(
    `${url}/hotels`
  );
  const hotel = await res.json()

  console.log(hotel);
  
  return {
    props: {
      hotel,
    },
  };
};*/}

export default PropertySearch