"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import Image from 'next/image'
import { useAuth, useUser } from '@clerk/nextjs'
import LoadingLogo from '../components/LoadingLogo'
import emtpyUser from '../../public/EmptyUser.png'
import { Toaster, toast } from 'react-hot-toast';
import Link from 'next/link'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
export default function HostTripPage() {
  const addRoomMutation = useMutation(api.room.addRoom);

  const route = useRouter();
  const { user } = useUser();
  const [partyName, setPartyName] = useState("")
  const [tripTitle, setTripTitle] = useState("")
  const [tripDescription, setTripDescription] = useState("")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [isSchoolTrip, setIsSchoolTrip] = useState(false)
  const [isAgreeTerms, setIsAgreeTerms] = useState(false)
  const [hostCode, setHostCode] = useState("")

  useEffect(() => {
    if (hostCode == "") setHostCode(generateUniqueCode())

    if (!user) {
      route.push("../sign-up")
    }
  }, [])

  const generateUniqueCode = () => {
    const randomNum = Math.floor(Math.random() * 100);
    const randomStr = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${randomNum}${randomStr}${Math.floor(Math.random() * 10)}`;
  };

  const handleHost = async () => {
    if (!user) {
      toast.error("Error occured while creating room.")
      return;
    }

    if (partyName == "" || tripTitle == "" || tripDescription == "" || from == "" || to == "") {
      toast.error("You can't leave the field(s) empty !")
      return;
    }

    if (!isAgreeTerms) {
      toast.error("Please Check the term of services !")
      return;
    }

    const roomData = {
      hostCode,
      partyName,
      tripTitle,
      tripDescription,
      from,
      to,
      isSchoolTrip,
      hostId: user?.id, // Assuming `user.id` is available from Clerk
      partyMembers: [],
    };

    try {
      await addRoomMutation(roomData)
      toast.success("Room hosted successfully!")
      route.push(`../host-trip/${hostCode}`)
    } catch (error: any) {
      console.error("error hosting room : ", error)
      toast.error("Failed to host room!")
    }
  }

  const textLimit = (text: string) => {
    if (text.length >= 10) {
      return text.slice(0, 10) + "..."
    }

    return text;
  }

  if (!user) return <LoadingLogo />

  return (
    <div className='flex flex-col w-full h-[100%] p-5 gap-[20px]'>
      <BackButton />

      <h1 className='font-["licorice"] text-7xl text-white text-center'>Host a Trip</h1>

      {/* Host Form */}
      <div className='bg-white h-fit rounded-lg p-[15px] flex flex-col gap-[10px]'>
        {/* PartName and image */}
        <div className='flex gap-[10px]'>
          <div className='flex flex-col'>
            <span className='font-semibold ml-2'>Party Name</span>
            <input type="text" className='w-[115%] h-[33px] rounded-lg border-[2px] border-gray-200 outline-none px-2 focus:border-gray-400 duration-150' onChange={(e) => setPartyName(e.target.value)} />
          </div>

          {/* Image */}
          <div className='flex ml-auto relative active:scale-95 duration-150'>
            <svg xmlns="http://www.w3.org/2000/svg" width="74" height="74" viewBox="0 0 74 74" fill="none">
              <circle cx="37" cy="37" r="36" stroke="#D9D9D9" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4" />
            </svg>

            <svg className="absolute top-0 bottom-0 left-0 right-0 m-auto" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
              <path d="M8.77953 29.6569L21.6125 17.5788L27.6515 23.6179M8.77953 29.6569H23.8771C26.3786 29.6569 28.4064 27.6291 28.4064 25.1276V17.5788M8.77953 29.6569C6.27807 29.6569 4.25024 27.6291 4.25024 25.1276V10.03C4.25024 7.52856 6.27807 5.50073 8.77953 5.50073H18.593M26.8967 12.7905L26.8967 8.52025M26.8967 8.52025L26.8967 4.25M26.8967 8.52025L22.6264 8.52025M26.8967 8.52025L31.1669 8.52025M13.3088 12.2947C13.3088 13.5454 12.2949 14.5593 11.0442 14.5593C9.79344 14.5593 8.77953 13.5454 8.77953 12.2947C8.77953 11.0439 9.79344 10.03 11.0442 10.03C12.2949 10.03 13.3088 11.0439 13.3088 12.2947Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div className='flex flex-col'>
          <span className='font-semibold ml-2'>Trip Title</span>
          <input type="text" className='w-full h-[33px] rounded-lg border-[2px] border-gray-200 outline-none px-2 focus:border-gray-400 duration-150' onChange={(e) => setTripTitle(e.target.value)} />
        </div>

        <div className='flex flex-col'>
          <span className='font-semibold ml-2'>Trip Description</span>
          <input type="text" className='w-full h-[33px] rounded-lg border-[2px] border-gray-200 outline-none px-2 focus:border-gray-400 duration-150' onChange={(e) => setTripDescription(e.target.value)} />
        </div>

        <div className='flex flex-col'>
          <span className='font-semibold ml-2'>From</span>
          <input type="text" className='w-full h-[33px] rounded-lg border-[2px] border-gray-200 outline-none px-2 focus:border-gray-400 duration-150' onChange={(e) => setFrom(e.target.value)} />
        </div>

        <div className='flex flex-col mb-[20px]'>
          <span className='font-semibold ml-2'>To</span>
          <input type="text" className='w-full h-[33px] rounded-lg border-[2px] border-gray-200 outline-none px-2 focus:border-gray-400 duration-150' onChange={(e) => setTo(e.target.value)} />
        </div>

        <div className='flex flex-col gap-[10px] mb-[10px]'>
          {/* Title */}
          <div className='flex justify-between'>
            <div className='font-semibold'>Hosts <span className='text-xs text-gray-400'>Host Code : {hostCode}</span></div>
            <span className='text-xs mt-auto text-gray-400'>SEE ALL</span>
          </div>

          <div className='flex gap-[20px]'>
            <div className='flex flex-col'>
              <Image src={`${user?.imageUrl}`} alt='User Image' width={60} height={60} className='rounded-full mx-auto'></Image>
              <span className='font-semibold text-sm text-center'>{textLimit(user?.username || "")}</span>
            </div>

            <div className='flex flex-col'>
              <Image src={emtpyUser} alt='User Image' width={60} height={60} className='rounded-full'></Image>
              <span className='font-semibold text-sm text-center'></span>
            </div>
            <div className='flex flex-col'>
              <Image src={emtpyUser} alt='User Image' width={60} height={60} className='rounded-full'></Image>
              <span className='font-semibold text-sm text-center'></span>
            </div>
            <div className='flex flex-col'>
              <Image src={emtpyUser} alt='User Image' width={60} height={60} className='rounded-full'></Image>
              <span className='font-semibold text-sm text-center'></span>
            </div>
          </div>
        </div>

        {/* CheckBox */}
        <div className='flex flex-col gap-[10px] mb-[10px]'>
          <div className='flex items-center gap-[10px]'>
            <input type="checkbox" name="" id="" className='size-[16px]' onChange={(e) => setIsSchoolTrip(e.target.checked)} />
            <span className='font-semibold text-sm'>This is a school trip.</span>
          </div>

          <div className='flex items-center gap-[10px]'>
            <input type="checkbox" name="" id="" className='size-[16px]' onChange={(e) => setIsAgreeTerms(e.target.checked)} />
            <span className='font-semibold text-sm'>I have read and accepted&nbsp;<Link href="" className='text-blue-600 underline'>terms and conditions.</Link></span>
          </div>
        </div>

        <button className="mx-auto w-[70%] bg-gradient-to-r from-[#00ff99] to-[#00995b] rounded-[20px] text-center py-3 text-white font-semibold text-xl active:scale-95 duration-100" onClick={() => handleHost()}>Host a Trip</button>
      </div>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  )
}
