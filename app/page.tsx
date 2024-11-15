"use client"

import React from 'react'
import MainLogo from './components/MainLogo'
import Image from 'next/image'
import Clound from '../public/Clound.png'
import Link from 'next/link'
import { useAuth, UserButton, useUser } from '@clerk/nextjs'

export default function Home() {
  const { userId } = useAuth();
  const { user } = useUser();

  return (
    <div className='w-full h-full'>
      {/* Top */}
      <div className={`m-3 ${userId ? 'flex' : 'hidden'} gap-[10px]`}>
        <UserButton />
        <div className='text-white font-semibold'>{user?.username}</div>
      </div>
      <div className='h-[45%] pt-[10%] relative'>
        <MainLogo/>
        <Image src={Clound} alt='Clound' className='absolute bottom-[-1px] w-[100%]'></Image>
      </div>

      {/* Bottom */}
      <div className='bg-white h-[55%] flex flex-col gap-[20px] pt-[20%] items-center'>
        <Link href="/host-trip" className="w-[70%] bg-gradient-to-r from-[#00ff99] to-[#00995b] rounded-[20px] text-center py-3 text-white font-semibold text-xl active:scale-95 duration-100">Host a Trip</Link>
        <Link href="/join-trip"  className="w-[70%] border-[3px] border-[#00ff99] rounded-[20px] text-center py-3 text-[#00ff99] font-semibold text-xl active:scale-95 duration-100">Join a trip</Link>
        <div className={`${userId ? 'hidden' : 'flex'} text-sm text-gray-600 leading-tight`}>Login for host <Link href="/sign-up" className='text-[#01c274] font-semibold'>&nbsp;Sign up!</Link></div>
      </div>
    </div>
  )
}
