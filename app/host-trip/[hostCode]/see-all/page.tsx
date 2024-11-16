"use client"

import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Image from 'next/image';
import LoadingLogo from '@/app/components/LoadingLogo';
import SeeAllUser from '@/app/components/SeeAllUserHost';
import { Router } from 'next/router';
import PartyMember from '@/app/components/PartyMember';

export default function SeeAllPage({ params }: { params: any }) {
    const route = useRouter()
    const { hostCode }: { hostCode: string } = React.use(params)
    const [partyMembers, setPartyMembers] = useState<any[]>([])
    const [hostMembers, setHostMembers] = useState<any[]>([])
    const roomData = useQuery(api.room.getRoomByHostCode, { hostCode })

    const textLimit = (text: string) => {
        if (text.length >= 10) {
            return text.slice(0, 10) + "..."
        }

        return text;
    }

    useEffect(() => {
        if (roomData) {
            setPartyMembers(roomData.partyMembers);
            setHostMembers(roomData.hostMembers)
        }

        console.log(partyMembers)
    }, [roomData]);

    if(!roomData || hostMembers.length == 0) return <LoadingLogo/>

    return (
        <div className='flex flex-col w-full h-[100%] p-5 gap-[20px] pb-[20px]'>
            <Link href={`/host-trip/${hostCode}`} className='flex items-center gap-[10px] w-fit active:scale-95 duration-150'>
                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
                    <path d="M8 1L1 7.5L8 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <h1 className='font-semibold text-white'>Back</h1>
            </Link>

            {/* Host Form */}
            <div className='bg-white h-fit rounded-lg p-[15px] flex flex-col gap-[10px] mt-[15%]'>
                {/* PartName and image */}
                <div className='flex gap-[10px]'>
                    <h1 className="text-2xl font-bold">Host</h1>
                </div>

                <div className='flex gap-[20px] mt-[10px]'>
                        {
                            hostMembers.map((member, index) => {
                                return (
                                    <PartyMember key={index} imageUrl={member.imageUrl} username={member?.username} />
                                )
                            })
                        }
                </div>


                <div className='mt-[20px] flex flex-col'>
                    <div className='flex justify-between font-semibold'>
                        <span className='ml-[20px]'>Name</span>
                        <span>Status</span>
                    </div>

                    <div className='flex flex-col'>
                        {
                            partyMembers.map((member, index) => {
                                return <SeeAllUser key={index} index={index + 1} clerkId={member.clerkId} hostCode={hostCode}/>
                            })
                        }
                    </div>
                </div>

                <button className="mx-auto w-[70%] bg-gradient-to-r from-[#00ff99] mt-[20px] to-[#00995b] rounded-[20px] text-center py-3 text-white font-semibold text-xl active:scale-95 duration-100" onClick={() => route.push(`${window.location.pathname}/members-location`)}>Members Location</button>
            </div>

            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    )
}