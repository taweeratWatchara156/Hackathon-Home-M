"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import { useAuth, useUser } from '@clerk/nextjs'
import LoadingLogo from '../components/LoadingLogo'
import { Toaster, toast } from 'react-hot-toast';
import Image from 'next/image'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

export default function JoinTripPage() {
  const updateRoomMutation = useMutation(api.room.updateRoom);
  const route = useRouter();
  const { user } = useUser();
  const [hostCode, setHostCode] = useState("")
  const roomData = useQuery(api.room.getRoomByHostCode, { hostCode })
  const currentUserData = useQuery(api.user.getIn, { clerkId: user?.id as string })
  const [isHost, setIsHost] = useState(false)

  useEffect(() => {


    if (!user) {
      route.push("../sign-up")
    }
  }, [])

  const handleJoin = async () => {
    if (hostCode == "") {
      toast.error("You can't leave the field(s) empty!")
      return;
    }

    var updateRoomData;

    if(isHost){
      updateRoomData = {
        hostCode,
        hostMemberToAdd: {
          fullName: currentUserData?.fullName as string,
          username: currentUserData?.username as string,
          imageUrl: currentUserData?.imageUrl as string,
          clerkId: currentUserData?.clerkId as string,
          email: currentUserData?.email as string,
        }
      };
    }else{
      updateRoomData = {
        hostCode,
        memberToAdd: {
          fullName: currentUserData?.fullName as string,
          username: currentUserData?.username as string,
          imageUrl: currentUserData?.imageUrl as string,
          clerkId: currentUserData?.clerkId as string,
          email: currentUserData?.email as string,
        }
      };
    }

    if (roomData) {
      await updateRoomMutation(updateRoomData)
      route.push(`../join-trip/${hostCode}`)
    }else{
      toast.error(`Cannot find room with code '${hostCode}'`)
    }
  }

  if (!user) return <LoadingLogo />

  return (
    <div className='flex flex-col w-full h-[100%] p-5 gap-[20px]'>
      <BackButton />

      <h1 className='font-["licorice"] text-7xl text-white text-center'>Join a Party</h1>

      {/* Host Form */}
      <div className='bg-white h-fit rounded-lg p-[15px] flex flex-col gap-[10px]'>
        {/* Profile */}
        <div className='flex flex-col justify-center items-center'>
          <h1 className='font-bold text-3xl mb-[10px]'>{user.username}</h1>
          <Image src={user.imageUrl} alt='Profile Image' width={100} height={100} className='rounded-full'></Image>
        </div>

        <div className='flex flex-col'>
          <span className='font-semibold ml-2'>Trip Code</span>
          <input type="text" className='w-full h-[33px] rounded-lg border-[2px] border-gray-200 outline-none px-2 focus:border-gray-400 duration-150' onChange={(e) => setHostCode(e.target.value)} />
        </div>
        <div className='flex gap-[10px] items-center'>
          <input type="checkbox" className='size-[20px]' onChange={(e) => setIsHost(e.target.checked)}/>
          <span className='font-semibold min-w-[80px]'>Join as host</span>
        </div>

        <button className="mx-auto w-[90%] bg-gradient-to-r from-[#00ff99] to-[#00995b] rounded-[20px] text-center py-3 mt-[20px] text-white font-semibold text-xl active:scale-95 duration-100" onClick={() => handleJoin()}>Join</button>
      </div>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  )
}
