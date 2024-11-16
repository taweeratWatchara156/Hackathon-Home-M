import { api } from "@/convex/_generated/api"
import { useMutation, useQuery } from "convex/react"
import '../css/blur.css'
import { useState } from "react"
import { Toaster, toast } from "react-hot-toast"

export default function SeeAllUser({ index, clerkId, hostCode }: { index: number, clerkId: string, hostCode: string }) {
    const memberData = useQuery(api.user.getIn, { clerkId: clerkId })
    const [isOpen, setIsOpen] = useState(false)
    const [deleteInput, setDeleteInput] = useState("")
    const updateRoomMutation = useMutation(api.room.updateRoom);
    const [checkIn, setCheckIn] = useState(false)

    const handleDeleteMember = async () => {
        if (deleteInput != memberData?.username) {
            toast.error("Please cofirm delete by enter member username.")
            return;
        }
        const updateRoomData = {
            hostCode,
            memberToRemove: {
                fullName: memberData?.fullName as string,
                username: memberData?.username as string,
                imageUrl: memberData?.imageUrl as string,
                clerkId: memberData?.clerkId as string,
                email: memberData?.email as string,
            }
        };

        await updateRoomMutation(updateRoomData)
    }

    if (!memberData) return;

    return (
        <>
            <div className="flex justify-between border-b-[2px] font-semibold items-center py-[10px]">
                <div>
                    {index}
                    <span className="ml-[10px]">{memberData.fullName}</span>
                </div>

                <div className={`flex ${checkIn ? 'bg-green-500' : 'bg-red-500'} h-full w-[50px] rounded-full relative duration-200`} onClick={() => setCheckIn(!checkIn)}>
                    <div className={`absolute bg-white rounded-full w-[20px] h-[20px] top-[2px] ${checkIn ? 'left-[27px]' : 'left-[3px]'} duration-200`}>
                    </div>
                </div>
            </div>

            {/* Remove Room confirmation */}
            <div className={`${isOpen ? 'flex' : 'hidden'} blur-bg absolute bg-black w-full h-full top-0 left-0 opacity-100 justify-center items-center`}>
                <div className='bg-white rounded-lg w-[80%] px-3 py-5'>
                    <div className='flex flex-row-reverse active:scale-95 duration-150'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none" onClick={() => setIsOpen(false)}>
                            <path d="M16 1L1 16M16 16L1 1" stroke="black" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>

                    {/* Text */}
                    <div>
                        <h1 className='text-center mt-[20px] text-xl font-bold text-[#ff0022]'>
                            ARE YOU SURE TO REMOVE THIS MEMBER?
                        </h1>

                        <h1 className='text-center mt-[10px]'>
                            By removing this member, they can no longer be tracked, checked, or participate in this trip.
                        </h1>
                    </div>

                    {/* Check Box */}
                    <h1 className='text-center mt-[10px] text-xl font-bold text-[#ff0022]'>
                        PLEASE TYPE '{memberData.username}' TO CONFIRM
                    </h1>

                    <input type="text" name="" id="" className='w-full border-[2px] rounded-lg my-[20px] h-[33px] outline-none focus:border-gray-400 duration-150 px-2' placeholder={memberData.username} onChange={(e) => setDeleteInput(e.target.value)} />

                    <button className='bg-gradient-to-r from-[#ff0022] to-[#b30017] w-[90%] mx-auto flex justify-center py-3 rounded-lg text-xl font-semibold text-white active:scale-95 duration-150' onClick={() => handleDeleteMember()}>
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