import Image from 'next/image';

const ImageSlider = () => {

  const src = `https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-4.0
  .3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`

  return (
    <div className="xs:w-[1414px] md:w-[1442px]"> 
      <Image loader={() => src} src={src} alt={''} width={1536} style={{ width: '100%'}} 
      className='h-[550px] xs:w-[1440px] md:w-[1520px]' height={10} />
      <p className='absolute w-[400px] top-[210px] left-[50px] text-[80px] text-[#176d73]'>A better way to stay</p>
    </div>
  )
}

export default ImageSlider