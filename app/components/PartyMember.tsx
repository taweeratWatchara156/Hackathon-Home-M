import React from 'react'
import Image from 'next/image'

export default function PartyMember({ imageUrl, username } : { imageUrl:string, username:string }) {
    return (
        <div className='flex flex-col '>
            <Image src={imageUrl} alt='User Image' width={60} height={60} className='rounded-full'></Image>
            <span className='font-semibold text-sm text-center'>{username}</span>
        </div>
    )
}
