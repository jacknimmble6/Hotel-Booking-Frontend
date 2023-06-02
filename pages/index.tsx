import Head from 'next/head'
import Header from '../components/Header'
import ImageSlider from '../components/ImageSlider'
import Searchbar from '../components/Searchbar'

const Home = () => {

  return (
    <div className="font-['DM Sans']">
      <Head>
        <title>HotelBooking</title>
      </Head>
      <Header />
      <ImageSlider />
      <Searchbar />

      <p className='text-[#176d73] text-6xl ml-40 mt-32'>A world of choice</p>
      <p className='text-[#176d73] text-3xl ml-40 w-[490px] mt-8 xs:w-[700px]'>
        From a room for a night to a loft for as long as you like, there’s a Sonder for every occasion.
      </p>

      <p className='text-[#176d73] text-4xl ml-40 w-[490px] mt-16 xs:w-[700px] underline'>
        Cities Available
      </p>

      <ul className='text-[#176d73] text-3xl ml-40 w-[490px] mt-8 xs:w-[700px]'>
        <li className='mt-4'>Chicago</li>
        <li className='mt-4'>Pittsburgh</li>
      </ul>
    </div>
  )
}

export default Home