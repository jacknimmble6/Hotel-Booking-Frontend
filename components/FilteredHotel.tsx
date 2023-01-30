/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import { IoChevronForwardCircleOutline, IoChevronBackCircleOutline } from 'react-icons/io5';

const FilteredHotel = ({ hotelData }: any) => {
  const [visible, setVisible] = useState(false)
  const [imageNumber, setImageNumber] = useState(0)
  
  const forward = (id: any) => {
    if (imageNumber >= 4) {
      return;
    }
    if (hotelData.filter((h: { _id: any; }) => h._id === id)) {
      setImageNumber(imageNumber + 1)
    }
    
  }

  const changeSlide = (index: React.SetStateAction<number>) => {
    setImageNumber(index)
  }

  const backward = () => {
    if (imageNumber <= 0) {
      return;
    } else {
      setImageNumber(imageNumber - 1)
    }
  }

  return (
    <div className="select-none">
      <p className="-mt-[460px] ml-8 text-2xl text-[#176d73]">
        {hotelData.length} { hotelData.length === 1 ? 'property': 'properties'} in {hotelData.map((hotel: { city: any; }) => hotel.city)[0]}
      </p>

      <div className="-mt-8">
        {hotelData.map((hotel: { _id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | 
        React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; location: string | number | boolean 
        | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | 
        undefined; city: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | 
        React.ReactFragment | React.ReactPortal | null | undefined; amenities: any[]; typeOfRooms: any[]; generalImages: any[]; }) => {
          return (
            <div key={hotel._id}>
              <p className="text-[#176d73] ml-8 mt-16 text-2xl">{hotel.name}</p>
              <p className="text-[#4a7173] ml-8 mt-3 text-xl">{hotel.location}, {hotel.city}</p>

              <div className="flex flex-row text-[#4a7173] xs:w-[500px] ml-64 -mt-16 xs:text-sm text-base">
                {hotel.amenities?.slice(0, 4).map(a => (
                  <p key={a} className="ml-4 xs:w-[240px] bg-[#bff3f6] pt-px rounded-2xl text-center h-fit w-[120px]">{a}</p>
                ))}
                 {hotel.amenities?.length > 4 ? (       
                   <p onMouseOver={() => setVisible(true)}  onMouseOut={() => setVisible(false)}
                   className="ml-4 bg-[#bff3f6] pt-1 text-sm rounded-3xl text-center h-[30px] w-[80px]">
                     +{hotel.amenities?.length - 4} more
                   </p>
                 ) : ''}
                  <div className={`text-sm -ml-40 mt-[45px] w-40 ${visible ? 'opacity-100' : 'opacity-0'} 
                  text-center rounded-2xl bg-[#bff3f6] xs:w-[200px] xs:mt-[50px] h-fit pt-1`}>
                    {hotel.amenities?.slice(4).map(a => (
                      <li key={Math.random()} className="">{a}</li>
                    ))}
                  </div>
                </div>

              <p className="text-[#176d73] xs:w-[250px] xs:mt-4 mt-8 ml-[520px]">Room Types & Nightly Rates</p>

              {hotel.typeOfRooms?.map(type => (
                <div className="text-[#176d73] border-b w-[370px] border-b-[#176d73] mt-4 ml-[520px]">
                  <p>{type.name}</p>
                  <p className='ml-72 -mt-[23px]'>from {type.price}</p>
                </div>
              ))}
              
              <div className='mt-4'>
              {hotel.generalImages?.map((x,index) => {
                
                return (    
                <>
                  {index === imageNumber && (
                    <>
                      <Image src={x} className="-mt-[145px] z-0 select-none h-[280px] rounded-3xl ml-8" 
                      alt="Picture" width={450} height={280}/>
                      {imageNumber > 4 ? '' : 
                        <IoChevronForwardCircleOutline className="absolute text-5xl xs:ml-[350px] ml-[430px] -mt-40 text-[#176d73]" 
                        onClick={() => forward(hotel._id)}/>
                      }
                      {imageNumber < 0 ? '' :
                        <IoChevronBackCircleOutline className="absolute -mt-[160px] text-5xl ml-[35px] text-[#176d73]" 
                        onClick={() => backward()}/>
                      }
                    </> 
                  )}
                </>      
              )})}
              </div>

              <div className="absolute ml-[140px] -mt-4 flex flex-row">
              {
                hotel.generalImages?.slice(0, 5).map((x , index) => (
                  <>
                    <p onClick={() => changeSlide(index)} className="rounded-full h-[10px] w-[10px] bg-[#517a7c] z-10 ml-8"></p>          
                  </>
                ))
              }
              </div>
              <Link href={`/hotels/${hotel._id}`}>
                <button className='absolute text-base ml-[700px] text-[#176d73] bg-[#bff3f6] h-[50px] select-none
                w-[200px] rounded-full -mt-[65px]'>
                  See what's available
                </button>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FilteredHotel