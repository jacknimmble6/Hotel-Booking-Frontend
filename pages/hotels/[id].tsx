/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import axios from 'axios'
import Image from 'next/image'
import Loading from '../../components/Loading'
import { AiOutlineArrowRight, AiOutlineCoffee, AiOutlinePicture, AiOutlineWechat, 
  AiOutlineStop, AiOutlineWarning, AiOutlineCheck, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { IoChevronForwardCircleOutline, IoChevronBackCircleOutline } from 'react-icons/io5';
import { GrClose } from 'react-icons/gr'
import { GiPersonInBed, GiBroom, GiTowel } from 'react-icons/gi'
import { BsPeople, BsClockHistory } from 'react-icons/bs'
import { HiOutlineMap } from 'react-icons/hi'
import { TbBath } from 'react-icons/tb'
import { MdDialpad, MdWifi } from 'react-icons/md'
import HotelMap from '../../components/HotelMap'
import { BiTrain } from 'react-icons/bi'
import { CiParking1 } from 'react-icons/ci'
import { TfiWheelchair } from 'react-icons/tfi'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { url } from '../../baseUrl'
import Head from 'next/head'
import { RootState } from '../../reducers'

const Hotel = () => {
  const [hotelData, setHotelData] = useState<any>({})
  const [openSlider, setOpenSlider] = useState(false)
  const [openSlider1, setOpenSlider1] = useState(false)
  const [imageNumber, setImageNumber] = useState(0)
  const [imageNumber3, setImageNumber3] = useState(0)
  const [loading, setLoading] = useState(true)
  const [pageSection, setPageSection] = useState('')
  const [imageNumber1, setImageNumber1] = useState(0)
  const [imageNumber2, setImageNumber2] = useState(imageNumber1 + 1)
  const [roomName, setRoomName] = useState('')
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { push } = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()
  const checkIn = useSelector((state: RootState) => state.pageSearch.checkIn)
  const checkOut = useSelector((state: RootState) => state.pageSearch.checkOut)
  const guests = useSelector((state: RootState) => state.pageSearch.guests)
  const priceMin = useSelector((state: RootState) => state.pageSearch.priceMin)
  const priceMax = useSelector((state: RootState) => state.pageSearch.priceMax)
  
  useEffect(() => {
    if(!id) {
      return;
    }
    const fetch = async () => {
      await axios.get(`${url}/hotels/${id}`)
      .then(res => setHotelData(res.data))
      setLoading(false)
    }
    fetch()

    dispatch({ type: 'erase1'})
  }, [dispatch, id])

  const forward = () => {
    if (imageNumber === hotelData?.generalImages?.length - 1) {
      setImageNumber(0)
    } else {
      setImageNumber(imageNumber + 1)
    }
  }

  const increase = () => {
    dispatch({ type: 'addGuests1' })
  }

  const delete1 = () => {
    dispatch({ type: 'erase1' })
  }

  const decrease = () => {
    if (guests <= 0) {
      return;
    }
    dispatch({ type: 'decreaseGuests1'  })
  }

  const displayRange = () => {
    setOpen(!open)
  }

  
  const backward = () => {
    if (imageNumber <= 0) {
      setImageNumber(hotelData?.generalImages?.length - 1)
    } else {
      setImageNumber(imageNumber - 1)
    }
  }

  const forward2 = (index1: any) => {
    if (imageNumber3 === unique1[index1] - 1) {
      setImageNumber(0)
    } else {
      setImageNumber3(imageNumber3 + 1)
    }
  }

  const backward2 = (index1: any) => {
    if (imageNumber3 <= 0) {
      setImageNumber(unique1[index1] - 1)
    } else {
      setImageNumber3(imageNumber3 - 1)
    }
  }

  const forward1 = () => {
    if (imageNumber1 === 3) {
      setImageNumber1(0)
      setImageNumber2(1)
    } else if (imageNumber1 === 2) {
      setImageNumber2(0)
      setImageNumber1(imageNumber1 + 1)
    } else {
      setImageNumber1(imageNumber1 + 1)
      setImageNumber2(imageNumber2 + 1)
    }
    
  }

  const backward1 = () => {
    if (imageNumber1 <= 0) {
      setImageNumber1(0)
      setImageNumber2(1)
    } else {
      setImageNumber1(imageNumber1 - 1)
      setImageNumber2(imageNumber2 - 1)
    }
  }

  const handleFromSlider = (e: { target: { value: React.SetStateAction<any>; }; }) => {
    dispatch({ type: 'addPriceMin1', payload: { search: { priceMin: parseFloat(e.target.value) } }})
  }

  const handleToSlider = (e: { target: { value: React.SetStateAction<any>; }; }) => {
    dispatch({ type: 'addPriceMax1', payload: { search: { priceMax: parseFloat(e.target.value) } }})
  }

  const handleClick = () => {
    push("#overview")
    setPageSection("#overview")
  }

  const handleClick1 = () => {
    push("#availability and rates")
    setPageSection("#availability and rates")
  }

  const handleClick2 = () => {
    push("#amenities")
    setPageSection("#amenities")
  }

  const handleClick3 = () => {
    push("#The neighborhood")
    setPageSection("#The neighborhood")
  }

  const handleClick4 = () => {
    push("#Booking policies")
    setPageSection("#Booking policies")
  }

  const addCheckIn = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    dispatch({ type: 'addCheckIn1', payload: { search: { checkIn: e.target.value } } })
  }

  const addCheckOut = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    dispatch({ type: 'addCheckOut1', payload: { search: { checkOut: e.target.value } } })
  }

  const checkDate = (dates: any, name: any) => {
    let date1 = new Date(checkIn)
    let date2 = new Date(checkOut)
 
    const date = new Date(date1.getTime());

    const dates1: any = [];

    while (date <= date2) {
      dates1.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    const found = dates?.some((r: any) => {

      if (dates1.indexOf(r) >= 0) {
        return;
      } else {
        return hotelData.rooms
      }
    })

     const d = dates?.map((d: string | number | Date) => new Date(d))
     return found
  }
  
  const dateFilter = hotelData?.rooms?.filter((h: { bookedDates: any; name: any }, index: any) => checkDate(h.bookedDates, h.name))

  const unique = [...new Map(dateFilter?.map((m: { name: any }) => [m.name, m])).values()];

  const unique1 = unique.map((c: any) => c.images.length)

  const hotelFinalFilter = unique?.filter((h: any) => {
    return (
      h.numberOfGuests >= guests && h.price >= priceMin && h.price <= priceMax
    ) 
  })

  const findRoom = (room: any) => {
    localStorage.setItem('room', JSON.stringify(hotelData?.rooms?.filter((c: { name: any }) => c.name === room)))
  }

  return (
    <div className="">
      <Head>
        <title>{hotelData?.name}</title>
      </Head>
      {loading ? <Loading /> : (
      <>
      <Header />

        <div className="h-[480px] grid-cols-2 grid-rows-2 w-[1440px]">
          <Image src={hotelData?.generalImages?.[0] || ''} className="mt-[15px] col-span-1 row-span-2 z-0 
          select-none w-[950px] h-[480px] ml-8" alt="Picture" width={950} height={480}
          onClick={() => setOpenSlider(true)}/>
          <Image src={hotelData?.generalImages?.[1] || ''} className="-mt-[480px] col-span-1 row-span-1 z-0 
          select-none w-[350px] h-[230px] ml-[1000px]" alt="Picture" width={350} height={230} 
          onClick={() => setOpenSlider(true)}/>
          <Image src={hotelData?.generalImages?.[2] || ''} className="mt-[20px] col-span-1 row-span-1 z-0 
          select-none w-[350px] h-[230px] ml-[1000px]" onClick={() => setOpenSlider(true)} alt="Picture" 
          width={350} height={230}/>
        </div>
        <button className="absolute h-[42px] text-[#176d73] -mt-24 ml-32 pl-8 bg-[#bff3f6] w-[120px] rounded-full">
          <AiOutlinePicture className="absolute text-2xl -ml-4" onClick={() => setOpenSlider(true)}/>
          See All
        </button>
        
      {
        openSlider && (
          <div className="absolute w-screen -mt-[570px] xs:z-20 xs:h-[3500px] xs:w-[1440px] 
          bg-[#000000d5] z-10 h-screen md:w-[1440px] md:h-[2200px] md:z-20">
            <p className="absolute select-none md:mt-[500px] xs:mt-[900px] z-10 text-xl mt-[50px] ml-[640px]">
              {`${imageNumber + 1} of ${hotelData?.generalImages?.length}`}
            </p>
          {hotelData?.generalImages?.map((x: any, index: number) => (    
            <div className="absolute md:mt-[1050px] xs:mt-[1450px] mt-[550px]">
              
              {index === imageNumber && (
                <>
                  <Image src={x} className="-mt-[465px] xs:ml-[260px] xs:w-[850px] ease-in z-0 select-none h-[500px] justify-center ml-[320px]" 
                  alt="Picture" width={750} height={500}/>
    
                  <IoChevronForwardCircleOutline className="absolute text-8xl ml-[1250px] -mt-64 text-[#176d73]" 
                  onClick={forward}/>
                 
                  <IoChevronBackCircleOutline className="absolute -mt-[250px] text-8xl ml-[35px] text-[#176d73]" 
                  onClick={backward}/>    
                </> 
              )}
            </div>      
          ))}

          <GrClose className='text-2xl xs:text-5xl md:mt-[90px] md:text-5xl text-white ml-[1330px] mt-[30px]' 
          onClick={() => setOpenSlider(false)}/>
          </div>
        )
      }

      <div>
        <p className="text-5xl ml-16 mt-[50px] text-[#176d73]">{hotelData?.name}</p>
        <p className="text-2xl ml-16 mt-4 text-[#176d73]">
          {hotelData?.neighborhood}, {hotelData?.city}
        </p>
        <p id="overview" className="text-2xl w-[580px] ml-16 mt-8 text-[#176d73]">
          {hotelData?.OverviewDescription}
        </p>

        <p className="text-[#176d73] text-lg ml-[760px] xs:-mt-[450px] xs:w-[400px] -mt-[480px]">Top Amenities</p>
        <div className="flex flex-row ml-[750px] md:w-[600px] xs:w-[600px] mt-4 text-sm">
          {hotelData.amenities?.slice(0, 4).map((a: boolean | React.Key | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined) => (
            <p className="ml-2 bg-[#bff3f6] text-[#176d73] pt-px rounded-2xl text-center h-fit w-[110px]">
              {a}
            </p>
          ))}
        </div>
      </div>

      <div className="sticky bg-[#ddebed] top-0 z-10 h-[72px] border-b border-b-[#176d73] 
      text-[#176d73] mt-[480px] w-full md:w-[1400px] xs:w-[1400px]">
        <button className={`h-[72px] ml-16 ${pageSection === '#overview' ? 
        'border-b-[3px] ease-in duration-500 border-b-[#176d73]' : ''}`}
        onClick={handleClick}>
          <p className="text-2xl">Overview</p>
        </button>
        <button className={`h-[72px] ml-8 md:ml-24 xs:ml-24 ${pageSection === '#availability and rates' ? 
        'border-b-[3px] ease-in duration-500 border-b-[#176d73]' : ''}`}
        onClick={handleClick1}>
          <p className="text-2xl">Availability and Rates</p>
        </button>
        <button className={`h-[72px] ml-8 md:ml-24 xs:ml-24 ${pageSection === '#amenities' ? 
        'border-b-[3px] ease-in duration-500 border-b-[#176d73]' : ''} border-b-[#176d73]`}
        onClick={handleClick2}>
          <p className="text-2xl">Amenities</p>
        </button>
        <button className={`h-[72px] ml-8 md:ml-24 xs:ml-24 ${pageSection === '#The neighborhood' ? 
        'border-b-[3px] ease-in duration-500 border-b-[#176d73]' : ''} border-b-[#176d73]`}
        onClick={handleClick3}>
          <p className="text-2xl">The neighborhood</p>
        </button>
        <button className={`h-[72px] ml-8 md:ml-24 xs:ml-24 ${pageSection === '#Booking policies' ? 
        'border-b-[3px] ease-in duration-500 border-b-[#176d73]' : ''} border-b-[#176d73]`}
        onClick={handleClick4}>
          <p className="text-2xl">Booking policies</p>
        </button>
      </div>

      <div id="availability and rates">
        <p className="text-3xl ml-16 mt-16 text-[#176d73]">Availability and Rates</p>
       
        <input type='date' className="absolute rounded-l-full ml-16 h-[46px] bg-[#176d73] mt-8" 
        onChange={addCheckIn} value={checkIn}/>
      
        <p className="bg-[#176d73] mt-[32px] h-[46px] w-16 ml-[200px]">
          <AiOutlineArrowRight className=" absolute mt-[12px] z-0 text-2xl w-16 ml-[0px]"/>
        </p>
      
        <input type='date' className="absolute rounded-r-full font-sans ml-[264px] h-[46px] 
        bg-[#176d73] -mt-[46px]" onChange={addCheckOut} value={checkOut}/>

        <div className="ml-96 -mt-[66px]">
         <p className="absolute bg-[#176d73] h-[46px] pl-2 pt-2 w-[80px] text-xl mt-[21px] rounded-l-full 
          ml-[80px]">
            Guests
          </p>

          <AiOutlinePlus className="absolute select-none rounded-r-full w-[50px] pt-2 pb-2 h-[46px] bg-[#176d73] text-xl 
          ml-[230px] mt-[21px]"  onClick={increase}/>

          <p className='absolute mt-[21px] pt-2 pl-2 text-center w-[46px] text-xl bg-[#176d73] h-[46px] select-none 
          ml-[184px]'>
            {guests}
          </p>

          <AiOutlineMinus className="absolute select-none h-[46px] bg-[#176d73] text-2xl ml-[160px] mt-[21px]" 
           onClick={decrease}/>
        </div>

        
        <button className="bg-[#176d73] ml-[700px] mt-[22px] h-[46px] w-[110px] rounded-full text-2xl" 
        onClick={displayRange}>
          Price
        </button>

        {open ? (
            <div className="absolute z-[1] bg-[#7dc3c7] w-[380px] h-[200px] rounded-[15px] mt-8 ml-[650px]">
              <p className="absolute mt-[40px] ml-[20px] text-xl text-[#176d73]">Price per night</p>
              <div className="sliders_control">
                <input id="fromSlider" value={priceMin} className="absolute mt-[115px] h-0 ml-[9px] z-[1]" 
                type="range" min="0" max="1000" onChange={handleFromSlider} />
                <input id="toSlider" value={priceMax} className="absolute mt-[115px] ml-[11px]" type="range" 
                min="0" max="1000" onChange={handleToSlider} />
                <p className="absolute mt-[155px] ml-[20px] text-xl text-[#176d73]">${priceMin} - ${priceMax}</p>
              </div>
            </div>
          ) : '' 
        }

        <div className="mt-24 ml-16">
        {hotelFinalFilter.length === 0 ? 
          (
            <div>
              <p className="text-[#176d73] -ml-32 text-3xl text-center">
                No Results
              </p>
              <button className="border text-base rounded-full bg-[#ddebed] mt-[30px] h-[54px] 
              w-[140px] ml-[530px] text-[#176d73] border-[#176d73]" onClick={delete1}>
                Reset all Filters
              </button>
            </div> 
          )  : (
          hotelFinalFilter.map((c: any, index) => {
            const index1 = index

            return (
              <div className="mt-[50px] border-b w-[1200px] border-b-[#176d73] h-[330px]">
                <Image src={c.images[0]} className="w-[480px] h-[290px] rounded-3xl" height={290} width={480} alt=""/>
                <p className="text-2xl ml-[525px] -mt-[300px] text-[#176d73]">{c.name}</p>
                <p className="text-2xl ml-[1100px] text-[#176d73] -mt-[27px]">${c.price}</p>
                {checkIn === '' || checkOut === '' ? (
                  <button className="border absolute text-base rounded-full bg-[#ddebed] mt-[200px] h-[54px] 
                  w-[140px] ml-[1030px] text-[#176d73] border-[#176d73]" onClick={() => findRoom(c.name)}>
                    Select Dates
                  </button>
                  ) : (
                  <Link href={`/bookingPage/${hotelData._id}`}>
                    <button className="border absolute text-base rounded-full bg-[#ddebed] mt-[200px] h-[54px] 
                    w-[140px] ml-[1030px] text-[#176d73] border-[#176d73]" onClick={() => findRoom(c.name)}>
                      Book
                    </button>
                  </Link>
                  )
                }
                <div className="ml-[525px]">
                  <GiPersonInBed className="text-xl mt-4 ml-[0px] text-[#176d73]"/>
                  <p className="-mt-[20px] ml-[25px] text-base text-[#176d73]">
                    {c.numberOfBedrooms} {c.numberOfBedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                  </p>
                </div>

                <div className="ml-[645px] -mt-[39px]">
                  <BsPeople className="text-xl mt-4 ml-[0px] text-[#176d73]"/>
                  <p className="-mt-[20px] ml-[25px] text-base text-[#176d73]">
                    {c.numberOfGuests} Guests
                  </p>
                </div>

                <div className="ml-[750px] -mt-[39px]">
                  <TbBath className="text-xl mt-4 ml-[0px] text-[#176d73]"/>
                  <p className="-mt-[20px] ml-[25px] text-base text-[#176d73]">
                    {c.numberOfBathrooms} Bathroom
                  </p>
                </div>

                <div className="ml-[880px] -mt-[36px]">
                  <Image width={15} src="/square.png" alt="" height={15} className="text-xl mt-4 ml-[0px] text-[#176d73]"/>
                  <p className="-mt-[20px] ml-[35px] text-base text-[#176d73]">
                    {c.squareFeet} Sq Ft
                  </p>
                </div>

                <div className="ml-[525px] mt-[25px] text-[#176d73]">
                  <p className="text-lg">Features</p>
                  {
                    c.features.slice(0, 6).map((feature: string | number | boolean | React.ReactElement<any, string | 
                      React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined) => (
                      <div className="">
                        <li className="text-base">{feature}</li>
                      </div>
                    ))
                  }
                  <div className="-mt-[145px]">
                  {
                    c.features.slice(6).map((feature: string | number | boolean | React.ReactElement<any, string | 
                      React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined) => (
                      <div className="ml-56">
                        <li className="text-base">{feature}</li>
                      </div>
                    ))
                  }
                  </div>
                </div>

                <button className="absolute h-[42px] text-[#176d73] mt-8 ml-[360px] pl-8 
                bg-[#bff3f6] w-[80px] rounded-full" onClick={() => setRoomName(c.name)}>
                  <p className="text-2xl ml-4">{c.images.length}</p>
                  <AiOutlinePicture className="absolute text-3xl -ml-3 -mt-[29px]" 
                  onClick={() => setOpenSlider1(true)}/>
                </button>

                {
                  openSlider1 && c.name === roomName ? (
                    <div className="absolute w-screen mt-[-470px] md:-mt-[1672px] md:h-[2400px] md:w-[1447px]  
                    bg-[#000000d5] xs:w-[1440px] xs:-mt-[1672px] xs:h-[3200px] xs:-ml-[64px] z-10 h-[2000px] ml-[-70px]">
                      <p className="absolute xs:mt-[900px] md: select-none md:mt-[650px] z-10 text-xl mt-[50px] ml-[640px]">
                        {`${imageNumber3 + 1} of ${c?.images?.length}`}
                      </p>
                      {c?.images?.map((x: any,index: number) => {

                        return (            
                        <div className="absolute xs:mt-[1500px] mt-[600px] md:mt-[1200px]">
              
                          {index === imageNumber3 && (
                            <>
                              <Image src={x} className="-mt-[465px] ease-in z-0 select-none h-[500px] 
                              justify-center xs:-mt-[450px] ml-[320px] xs:w-[850px] xs:ml-[280px] xs:h-[650px]" 
                              alt="Picture" width={750} height={500}/>
    
                              <IoChevronForwardCircleOutline className="absolute text-8xl ml-[1250px] 
                              -mt-64 text-[#176d73] xs:-mt-80" onClick={() => forward2(index1)}/>
                 
                              <IoChevronBackCircleOutline className="absolute -mt-[250px] text-8xl 
                              ml-[35px] text-[#176d73] xs:-mt-80" onClick={() => backward2(index1)}/>    
                            </> 
                          )}
                        </div>      
                      )})}

                      <GrClose className='text-2xl xs:text-7xl md:text-7xl md:mt-16 
                      xs:mt-24 text-white ml-[1330px] mt-[30px]' 
                      onClick={() => setOpenSlider1(false)}/>
                    </div>
                  )
                : ''}
              </div>
           )
          })
        )}
        </div>

        <div id='amenities' className="border-b w-[1200px] h-[960px] border-b-[#176d73] 
        text-[#176d73] ml-16 mt-8 scroll-smooth">
          <p className="text-4xl">Amenities at {hotelData.name}</p>

          <div className="rounded-3xl mt-16 bg-[#bff3f6] h-[250px] w-[1200px]">
            <p className="text-[#176d73] pt-8 ml-[500px] text-2xl">The Standard</p>
            <p className="text-[#176d73] pt-4 ml-[280px]">
              Working, relaxing, and living. Our spaces have all the essentials you need for your stay.
            </p>
            
            <div className="ml-24 mt-8">
              <MdDialpad className="text-4xl ml-2"/>
              <p className="-ml-[40px] mt-2">Contactless Check In</p>
            </div>

            <div className="ml-72 -mt-[69px]">
              <MdWifi className="text-4xl -ml-[25px]"/>
              <p className="-ml-[40px] mt-2">Fast WiFi</p>
            </div>

            <div className="ml-[400px] -mt-[68px]">
              <GiBroom className="text-4xl -ml-[20px]"/>
              <p className="-ml-[45px] w-[100px] text-center mt-2">Professionally <br /> Cleaned</p>
            </div>

            <div className="ml-[540px] -mt-[92px]">
              <GiTowel className="text-4xl -ml-[20px]"/>
              <p className="-ml-[45px] w-[100px] text-center mt-2">Fresh Towels</p>
            </div>

            <div className="ml-[670px] -mt-[68px]">
              <AiOutlineWechat className="text-4xl -ml-[20px]"/>
              <p className="-ml-[45px] w-[100px] text-center mt-2">24/7 support</p>
            </div>

            <div className="ml-[800px] -mt-[68px]">
              <AiOutlineCoffee className="text-4xl -ml-[20px]"/>
              <p className="-ml-[45px] w-[100px] text-center mt-2">Artisan Coffee</p>
            </div>

            <div className="ml-[940px] -mt-[68px]">
              <GiPersonInBed className="text-4xl -ml-[20px]"/>
              <p className="-ml-[45px] w-[100px] text-center mt-2">Comfortable Bedding</p>
            </div>

            <div className="ml-[1080px] -mt-[88px]">
              <TbBath className="text-4xl -ml-[20px]"/>
              <p className="-ml-[45px] w-[100px] text-center mt-2">Shower Amenities</p>
            </div>
          </div>

          <div className="absolute mt-8">
            <Image src={hotelData.generalImages?.slice(0,4)?.[imageNumber1]} alt="" 
            className="absolute select-none mt-[1px] rounded-3xl h-[420px] w-[580px]" 
            height={420} width={580} />
            <Image src={hotelData.generalImages?.slice(0,4)?.[imageNumber2]} alt="" 
            className="ml-[615px] select-none mt-[1px] h-[420px] w-[580px] rounded-3xl" 
            height={420} width={580} /> 
            <IoChevronForwardCircleOutline className="absolute text-5xl ml-[1100px] -mt-56 text-[#176d73]" 
            onClick={forward1} />
            <IoChevronBackCircleOutline className="absolute -mt-[217px] text-5xl ml-[35px] text-[#176d73]" 
            onClick={backward1} />
          </div>

          <div className="flex -ml-8 flex-row mt-[470px] text-xl text-[#176d73]">
            {hotelData.amenities.slice(0,5).map((a: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined) => (
              <>
                <p className="ml-16">{a}</p>
              </>
            ))}
            <div className="mt-[50px] -ml-[983px]">
            {hotelData.amenities.slice(5).map((a: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined) => (
              <>
                <p className="ml-16">{a}</p>
              </>
            ))}
            </div>
          </div>
        </div>

        <div id="The neighborhood" className="ml-16 border-b h-fit w-[1200px] 
        border-b-[#176d73] scroll-smooth">
          <p className="mt-16 text-3xl text-[#176d73]">
            The neighborhood
          </p>
          <HotelMap hotelData={hotelData} />
          <p className="mt-16 text-3xl text-[#176d73]">
            {hotelData.neighborhood}
          </p>
          <p className="mt-8 text-base w-[600px] text-[#176d73]">
            {hotelData.NeighborhoodDescription}
          </p>

          <div className="mt-8 text-[#176d73]">
            <HiOutlineMap className="text-4xl"/>
            <p className="text-lg ml-[39px] -mt-8">Address</p>
            <p className="w-[200px] mt-4">{hotelData.Address}</p>
          </div>

          <div className="ml-[256px] -mt-24 text-[#176d73]">
            <BiTrain className="text-4xl text-[#176d73]"/>
            <p className="text-lg ml-[39px] -mt-8">Public Transit</p>
            <p className="w-[250px] mt-4">{hotelData.PublicTransit}</p>
          </div>

          <div className="ml-[586px] -mt-[145px] text-[#176d73]">
            <HiOutlineMap className="text-4xl text-[#176d73]"/>
            <p className="text-lg ml-[39px] -mt-8">Downtown</p>
            <p className="w-[250px] mt-4">{hotelData.Downtown}</p>
          </div>

          <div className="ml-[926px] -mt-[95px] text-[#176d73]">
            <CiParking1 className="text-4xl text-[#176d73]"/>
            <p className="text-lg ml-[39px] -mt-8">Parking</p>
            <p className="w-[250px] mt-4">
              {hotelData.Parking.map((p: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined) => (
                <li>{p}</li>
              ))}
            </p>
          </div>
        </div>

        <div id="Booking policies" className="border-b ml-16 scroll-smooth text-[#176d73] border-b-[#176d73]">
          <p className="mt-16 text-3xl">Booking Policies</p>

          <div>
            <BsClockHistory className='text-4xl mt-8'/>
            <p className="ml-[45px] -mt-8">Check-in is at {hotelData.checkInTime}</p>
            <p className="ml-[45px]">Check-out is at {hotelData.checkOutTime}</p>
            <p className="ml-[45px] w-[400px] mt-4">{hotelData.checkInPolicy}</p>
          </div>

          <div>
            <TfiWheelchair className='text-4xl mt-8'/>
            <p className="ml-[45px] -mt-8">Accessibility</p>
            <p className="ml-[45px] mt-4">
              {hotelData.Accessibility.map((c: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined) => <li className='mt-1'>{c}</li>)}
            </p>
          </div>

          <div>
            <AiOutlineStop className='text-4xl mt-8'/>
            <p className="ml-[45px] -mt-8">House Rules</p>
            <p className="ml-[45px] mt-4">
              {hotelData.houseRules.map((c: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined) => <li className='mt-1'>{c}</li>)}
            </p>
          </div>

          <div>
            <AiOutlineWarning className='text-4xl mt-8'/>
            <p className="ml-[45px] -mt-8">Please Note</p>
            <p className="ml-[45px] w-[500px] mt-4">
              {hotelData.notes.map((c: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined) => <li className='mt-1'>{c}</li>)}
            </p>
          </div>

          <div>
            <AiOutlineCheck className='text-4xl mt-8'/>
            <p className="ml-[45px] -mt-8">Flexible Cancellation</p>
            <p className="ml-[45px] w-[500px] mt-4">
              {hotelData.flexibleCancellation}
            </p>
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  )
}

export default Hotel