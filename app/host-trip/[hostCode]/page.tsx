"use client"

import { useRouter } from "next/navigation"
import { use, useEffect, useState } from "react"
import LoadingLogo from "@/app/components/LoadingLogo"
import BackButton from "@/app/components/BackButton"
import Image from 'next/image'
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import React from 'react'
import PartyMember from "@/app/components/PartyMember"
import emptyUser from '../../../public/EmptyUser.png'
import Link from "next/link"

export default function page({ params } : {params:any}) {
    const deleteRoomMutation = useMutation(api.room.deleteRoomByHostCode)
    const [partyName, setPartyName] = useState("")
    const [tripTitle, setTripTitle] = useState("")
    const [tripDescription, setTripDescription] = useState("")
    const [partyMembers, setPartyMembers] = useState<any[]>([])
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [hostMembers, setHostMembers] = useState<any[]>([])

    const route = useRouter();
    const { hostCode } : {hostCode:string} = React.use(params);
    const roomData = useQuery(api.room.getRoomByHostCode, { hostCode })

    const textLimit = (text: string) => {
        if (text.length >= 10) {
            return text.slice(0, 10) + "..."
        }

        return text;
    }

    useEffect(() => {
        if (roomData) {
            setTripTitle(roomData.tripTitle);
            setTripDescription(roomData.tripDescription);
            setPartyName(roomData.partyName);
            setFrom(roomData.from);
            setTo(roomData.to);
            setPartyMembers(roomData.partyMembers);
            setHostMembers(roomData.hostMembers || [])
        }
    }, [roomData]);

    const handleDelete = async () => {
        try{
            await deleteRoomMutation({ hostCode })
            route.push('/../')
        }catch(error:any){
            console.log("Error occured while deleting room : ", error)
        }
    }

    if (!roomData || hostMembers.length == 0) return <LoadingLogo />

    return (
        <div className='flex flex-col w-full h-full p-5 gap-[20px]'>
            <Link href="/" className='flex items-center gap-[10px] w-fit active:scale-95 duration-150' onClick={() => handleDelete()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
                    <path d="M8 1L1 7.5L8 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <h1 className='font-semibold text-white'>Back</h1>
            </Link>

            {/* Trip Code */}
            <div className='flex flex-col mt-[10%]'>
                <span className="text-sm mb-[-5px] text-white">YOUR TRIP CODE : </span>
                <h1 className="text-5xl text-white font-bold">{hostCode}</h1>
            </div>

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
                        {
                            hostMembers.map((member, index) => {
                                return (
                                    <PartyMember key={index} imageUrl={member.imageUrl} username={member?.username} />
                                )
                            })
                        }
                    </div>
                </div>

                <div className='flex flex-col gap-[10px] mb-[10px]'>
                    {/* Title */}
                    <div className='flex justify-between mt-[20px]'>
                        <div className='font-semibold'>Party Members</div>
                        <span className='text-xs mt-auto text-gray-400' onClick={() => route.push(`/host-trip/${hostCode}/see-all`)}>SEE ALL</span>
                    </div>

                    <div className='flex gap-[20px]'>
                        {partyMembers.length == 0 ?
                            <div className='flex flex-col'>
                                <Image src={emptyUser} alt='User Image' width={60} height={60} className='rounded-full'></Image>
                                <span className='font-semibold text-sm text-center'></span>
                            </div>
                            :
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
                    <button className="mx-auto w-[80%] bg-gradient-to-r from-[#00ff99] to-[#00995b] rounded-[20px] text-center py-3 text-white font-semibold text-xl active:scale-95 duration-100" onClick={() => route.push(`/host-trip/${hostCode}/check-in-out`)}>Check-in / Check-out</button>
                    <button className="flex justify-center items-center gap-[10px] mx-auto w-[80%] border-[#00ff99] border-[3px] rounded-[20px] text-center py-3 text-[#00ff99] font-semibold text-xl active:scale-95 duration-100" onClick={() => route.push(`/edit-trip/${hostCode}`)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M11.0984 3.80369H5.4119C3.52756 3.80369 2 5.3312 2 7.21548V18.5882C2 20.4725 3.52756 22 5.4119 22H16.7849C18.6692 22 20.1968 20.4725 20.1968 18.5882L20.1968 12.9018M7.68649 16.3136L11.8244 15.4799C12.044 15.4356 12.2457 15.3274 12.4041 15.1689L21.6671 5.90116C22.1112 5.45682 22.1109 4.73657 21.6664 4.2926L19.7042 2.33264C19.2599 1.88886 18.54 1.88916 18.0961 2.33332L8.8321 11.6021C8.674 11.7602 8.56605 11.9615 8.52175 12.1807L7.68649 16.3136Z" stroke="#00E187" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>Edit trip</button>
                </div>
            </div>

            <button className="text-white bg-gray-600 py-2 px-4 rounded-lg w-fit mx-auto active:scale-95 duration-150 active:bg-gray-700">End Trip ( ชั่วคราว )</button>
        </div>
    )
}