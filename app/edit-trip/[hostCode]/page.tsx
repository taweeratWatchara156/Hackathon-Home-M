"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useAuth, useUser } from '@clerk/nextjs'
import emtpyUser from '../../../public/EmptyUser.png'
import { Toaster, toast } from 'react-hot-toast';
import Link from 'next/link'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import LoadingLogo from '@/app/components/LoadingLogo'
import '../../css/blur.css'
import PartyMember from '@/app/components/PartyMember'

export default function EditTripPage({ params }: {params:any}) {
    const updateRoomMutation = useMutation(api.room.updateRoom);
    const deleteRoomMutation = useMutation(api.room.deleteRoomByHostCode);
    const route = useRouter();
    const { user } = useUser();
    const [partyName, setPartyName] = useState("")
    const [tripTitle, setTripTitle] = useState("")
    const [tripDescription, setTripDescription] = useState("")
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [hostMembers, setHostMembers] = useState<any[]>([])
    const [deleteInput, setDeleteInput] = useState("")

    const [isDelete, setIsDelete] = useState(false)

    const { hostCode } : { hostCode : string } = React.use(params)
    const roomData = useQuery(api.room.getRoomByHostCode, { hostCode })

    const handleDelete = async () => {
        if(!deleteInput || deleteInput != partyName){
            toast.error("Please cofirm delete by enter party name.")
            return;
        }

        try{
            await deleteRoomMutation({ hostCode })
            route.push('/../')
        }catch(error:any){
            console.log("Error occured while deleting room : ", error)
        }
    }

    useEffect(() => {
        if (roomData) {
            setTripTitle(roomData.tripTitle);
            setTripDescription(roomData.tripDescription);
            setPartyName(roomData.partyName);
            setFrom(roomData.from);
            setTo(roomData.to);
            setHostMembers(roomData.hostMembers)
        }
    }, [roomData]);

    useEffect(() => {
        if (!user) {
            route.push("../sign-up")
        }
    }, [])

    const handleSave = async () => {
        if (hostCode == "") {
            toast.error("You can't leave the field(s) empty!")
            return;
        }

        const updateRoomData = {
            hostCode,
            partyName,
            tripTitle,
            tripDescription,
            from,
            to
        };

        if (roomData) {
            await updateRoomMutation(updateRoomData)
            route.push(`../host-trip/${hostCode}`)
        }
    }

    if (!user || hostMembers.length == 0) return <LoadingLogo />

    return (
        <>
            <div className='flex flex-col w-full h-[100%] p-5 gap-[20px]'>
                <Link href={`/host-trip/${hostCode}`} className='flex items-center gap-[10px] w-fit active:scale-95 duration-150'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
                        <path d="M8 1L1 7.5L8 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <h1 className='font-semibold text-white'>Back</h1>
                </Link>

                <h1 className='font-["licorice"] text-7xl text-white text-center'>Host a Trip</h1>

                {/* Host Form */}
                <div className='bg-white h-fit rounded-lg p-[15px] flex flex-col gap-[10px]'>
                    {/* PartName and image */}
                    <div className='flex gap-[10px]'>
                        <div className='flex flex-col'>
                            <span className='font-semibold ml-2'>Party Name</span>
                            <input type="text" className='w-[115%] h-[33px] rounded-lg border-[2px] border-gray-200 outline-none px-2 focus:border-gray-400 duration-150' onChange={(e) => setPartyName(e.target.value)} value={partyName} />
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
                        <input type="text" className='w-full h-[33px] rounded-lg border-[2px] border-gray-200 outline-none px-2 focus:border-gray-400 duration-150' onChange={(e) => setTripTitle(e.target.value)} value={tripTitle} />
                    </div>

                    <div className='flex flex-col'>
                        <span className='font-semibold ml-2'>Trip Description</span>
                        <input type="text" className='w-full h-[33px] rounded-lg border-[2px] border-gray-200 outline-none px-2 focus:border-gray-400 duration-150' onChange={(e) => setTripDescription(e.target.value)} value={tripDescription} />
                    </div>

                    <div className='flex flex-col'>
                        <span className='font-semibold ml-2'>From</span>
                        <input type="text" className='w-full h-[33px] rounded-lg border-[2px] border-gray-200 outline-none px-2 focus:border-gray-400 duration-150' onChange={(e) => setFrom(e.target.value)} value={from} />
                    </div>

                    <div className='flex flex-col mb-[20px]'>
                        <span className='font-semibold ml-2'>To</span>
                        <input type="text" className='w-full h-[33px] rounded-lg border-[2px] border-gray-200 outline-none px-2 focus:border-gray-400 duration-150' onChange={(e) => setTo(e.target.value)} value={to} />
                    </div>

                    <div className='flex flex-col gap-[10px] mb-[10px]'>
                        {/* Title */}
                        <div className='flex justify-between'>
                            <div className='font-semibold'>Hosts <span className='text-xs text-gray-400'>Host Code : {hostCode}</span></div>
                            <span className='text-xs mt-auto text-gray-400'>SEE ALL</span>
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

                    <button className="mx-auto w-[70%] bg-gradient-to-r mb-[10px] from-[#00ff99] to-[#00995b] rounded-[20px] text-center py-3 text-white font-semibold text-xl active:scale-95 duration-100" onClick={() => handleSave()}>Save</button>
                    <button className="mx-auto w-[70%] border-red-600 border-[3px] rounded-[20px] text-center py-3 text-red-600 font-semibold text-xl active:scale-95 duration-100" onClick={() => setIsDelete(true)}>Delete Trip</button>
                </div>

                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>

            {/* Remove Room confirmation */}
            <div className={`${!isDelete ? 'hidden' : 'flex'} blur-bg absolute bg-black w-full h-full top-0 opacity-100 justify-center items-center`}>
                <div className='bg-white rounded-lg w-[80%] h-[45%] p-5'>
                    <div className='flex flex-row-reverse active:scale-95 duration-150' onClick={() => setIsDelete(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                            <path d="M16 1L1 16M16 16L1 1" stroke="black" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>

                    {/* Text */}
                    <div>
                        <h1 className='text-center mt-[20px] text-xl font-bold text-[#ff0022]'>
                            ARE YOU SURE YOU WANT TO DELETE THIS TRIP?
                        </h1>

                        <h1 className='text-center mt-[10px]'>
                            By removing this trip, members in this trip will no longer be connected to you via Journie.
                        </h1>
                    </div>

                    {/* Check Box */}
                    <h1 className='text-center mt-[10px] text-xl font-bold text-[#ff0022]'>
                        PLEASE TYPE '{partyName}' TO CONFIRM
                    </h1>

                    <input type="text" name="" id="" className='w-full border-[2px] rounded-lg my-[20px] h-[33px] outline-none focus:border-gray-400 duration-150 px-2' placeholder={partyName} onChange={(e) => setDeleteInput(e.target.value)}/>

                    <button className='bg-gradient-to-r from-[#ff0022] to-[#b30017] w-[90%] mx-auto flex justify-center py-3 rounded-lg text-xl font-semibold text-white active:scale-95 duration-150' onClick={() => handleDelete()}>
                        Delete Trip
                    </button>
                </div>
            </div>

            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </>
    )
}
