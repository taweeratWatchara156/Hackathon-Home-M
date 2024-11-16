import React from 'react'
import Image from 'next/image'

export default function PartyMember({ imageUrl, username } : { imageUrl:string, username:string }) {
    const textLimit = (text:string) => {
        if(text.length >= 10){
            return text.slice(0, 10) + "..."
        }

        return text;
    }

    return (
        <div className='flex flex-col '>
            <Image src={imageUrl} alt='User Image' width={60} height={60} className='flex rounded-full mx-auto'></Image>
            <span className='font-semibold text-sm text-center'>{textLimit(username)}</span>
        </div>
    )
}
