"use client"

import LoadingLogo from '@/app/components/LoadingLogo'
import PartyMember from '@/app/components/PartyMember'
import { api } from '@/convex/_generated/api'
import { useMutation, useQuery } from 'convex/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'

export default function Page({ params }) {
    const {user} = useUser()
    const updateRoomMutation = useMutation(api.room.updateRoom);
    const [partyName, setPartyName] = useState("")
    const [tripTitle, setTripTitle] = useState("")
    const [tripDescription, setTripDescription] = useState("")
    const [partyMembers, setPartyMembers] = useState<any[]>([])
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [hostId, setHostId] = useState("")

    const textLimit = (text:string) => {
        if(text.length >= 10){
            return text.slice(0, 10) + "..."
        }

        return text;
    }

    const route = useRouter();
    const { hostCode } : { hostCode:string} = React.use(params);
    const roomData = useQuery(api.room.getRoomByHostCode, { hostCode })
    const currentUserData = useQuery(api.user.getIn, { clerkId: user?.id as string })

    const handleBack = async () => {
        const updateRoomData = {
            hostCode,
            memberToRemove: {
                fullName: currentUserData?.fullName as string,
                username: currentUserData?.username as string,
                imageUrl: currentUserData?.imageUrl as string,
                clerkId: currentUserData?.clerkId as string,
                email: currentUserData?.email as string,
            }
        };

        if (roomData) {
            await updateRoomMutation(updateRoomData)
            route.push(`../`)
        }
    }

    useEffect(() => {
        if (roomData) {
            setTripTitle(roomData.tripTitle);
            setTripDescription(roomData.tripDescription);
            setPartyName(roomData.partyName);
            setFrom(roomData.from);
            setTo(roomData.to);
            setPartyMembers(roomData.partyMembers);
            setHostId(roomData.hostId)
        }
    }, [roomData]);


    const hostData = useQuery(api.user.getIn, { clerkId: hostId })

    if (!roomData || !hostData) return <LoadingLogo />

    return (
        <div className='flex flex-col w-full h-full p-5 gap-[20px]'>
            <button className='flex items-center gap-[10px] w-fit active:scale-95 duration-150' onClick={() => handleBack()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
                    <path d="M8 1L1 7.5L8 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <h1 className='font-semibold text-white'>Back</h1>
            </button>

            {/* Form */}
            <div className="flex flex-col bg-white h-fit rounded-lg p-5">
                <h1 className="text-black text-[32px] font-bold text-center">{tripTitle}</h1>
                <span className="text-center mb-[20px]">{tripDescription}</span>


                <div className="flex flex-col gap-[5px]">
                    <span className="font-semibold text-lg">Party Name : <span className="font-sans">{partyName}</span></span>
                    <span className="font-semibold text-lg">From : <span className="font-sans ml-[55px]">{from}</span></span>
                    <span className="font-semibold text-lg">To : <span className="font-sans ml-[80px]">{to}</span></span>
                </div>

                <div className='flex flex-col gap-[10px] mb-[10px]'>

                    {/* Title */}
                    <div className=' mt-[20px]'>
                        <div className='font-semibold'>Host Members</div>
                    </div>

                    <div className='flex gap-[20px]'>
                        <div className='flex flex-col'>
                            <Image src={`${hostData?.imageUrl}`} alt='User Image' width={60} height={60} className='rounded-full mx-auto'></Image>
                            <span className='font-semibold text-sm text-center'>{textLimit(hostData?.username)}</span>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-[10px] mb-[10px]'>
                    {/* Title */}
                    <div className='flex justify-between mt-[20px]'>
                        <div className='font-semibold'>Party Members</div>
                        <span className='text-xs mt-auto text-gray-400'>SEE ALL</span>
                    </div>

                    <div className='flex gap-[20px]'>
                        {
                            partyMembers.map((member, index) => {
                                return (
                                    <PartyMember key={index} imageUrl={member.imageUrl} username={member?.username} />
                                )
                            })
                        }
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-[15px] mt-[20px]">
                    <button className="mx-auto w-[80%] bg-gradient-to-r from-[#00ff99] to-[#00995b] rounded-[20px] text-center py-3 text-white font-semibold text-xl active:scale-95 duration-100">Check-in / Check-out</button>
                    <button className="flex justify-center items-center gap-[10px] mx-auto w-[80%] border-[#00ff99] border-[3px] rounded-[20px] text-center py-3 text-[#00ff99] font-semibold text-xl active:scale-95 duration-100">
                        My Profile</button>
                </div>
            </div>
        </div>
    )
}