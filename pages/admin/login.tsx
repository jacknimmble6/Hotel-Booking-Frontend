import { useRouter } from 'next/router'
import React, { useState } from 'react'

const Login = () => {
  const [password, setPassword] = useState('')
  const router = useRouter()

  const login = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      router.push(`/admin/dashboard`)
    }
  }

  return (
    <>
    <div className='bg-[#bff3f6] text-[#176d73] h-[300px] mt-40 ml-[450px] w-[600px]'>
      <p className='text-2xl mt-32 text-center'>Admin Login</p>
      <input type="password" className="mt-[60px] h-[44px] ml-[160px] w-[300px] rounded-xl border 
      border-[#176d73] bg-[#ddebed]" onChange={(e) => setPassword(e.target.value)}/>
      <button className="absolute h-[50px] w-[210px] bg-[#176d73] -ml-[260px] mt-[180px] text-xl 
        text-white rounded-full" onClick={login}>
        Login
      </button>
    </div>
    </>
  )
}

export default Login