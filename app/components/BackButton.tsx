import Link from 'next/link'
import React from 'react'

export default function BackButton() {
    return (
        <Link href="../" className='flex items-center gap-[10px] w-fit active:scale-95 duration-150'>
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
                <path d="M8 1L1 7.5L8 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <h1 className='font-semibold text-white'>Back</h1>
        </Link>
    )
}
