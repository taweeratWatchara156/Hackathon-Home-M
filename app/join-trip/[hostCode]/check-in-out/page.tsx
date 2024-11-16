"use client"

import React, { useEffect, useState } from 'react'
import Link from "next/link";
import qrCode from '../../../../public/qrcode.png'
import Image from 'next/image';
import { Toaster } from 'react-hot-toast';
import { useUser } from '@clerk/nextjs';
import LoadingLogo from '@/app/components/LoadingLogo';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function SeeAllPage({ params }: { params: any }) {
  const { hostCode }: { hostCode: string } = React.use(params)
  const { user } = useUser()
  const roomData = useQuery(api.room.getRoomByHostCode, { hostCode })

  const checkIsHost = () => {
    roomData?.hostMembers.map((member) => {
      if (member.clerkId == user?.id) return true;
    })

    return false
  }

  if (!user) return <LoadingLogo />

  return (
    <div className='flex flex-col w-full h-[100%] p-5 gap-[20px] pb-[20px]'>
      <Link href={`/join-trip/${hostCode}`} className='flex items-center gap-[10px] w-fit active:scale-95 duration-150'>
        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
          <path d="M8 1L1 7.5L8 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <h1 className='font-semibold text-white'>Back</h1>
      </Link>

      <div className='bg-white h-fit rounded-lg p-[15px] py-[20px] flex flex-col gap-[20px] relative'>
        <h1 className='text-center text-2xl font-bold'>My QR Code</h1>
        <div className='border-[3px] border-black rounded-xl p-2 w-[300px] mx-auto mt-[20px]'>
          <Image src={qrCode} alt='qr'></Image>
        </div>

        <button className="mx-auto w-[80%] bg-gradient-to-r from-[#00ff99] to-[#00995b] rounded-[20px] text-center py-3 text-white font-semibold text-xl active:scale-95 duration-100 mt-[20px]">Download</button>

        {/* Buttons */}
        {/* <div className='flex gap-[10px]'>
                    <button className='flex flex-col bg-[#F0F0F0] py-5 px-5 rounded-lg gap-[5px] active:scale-95 duration-200 active:bg-gray-200'>
                        <Image src={call} alt='callIcon'></Image>
                        <span className='text-lg font-semibold'>Call</span>
                    </button>
                </div> */}
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  )
}