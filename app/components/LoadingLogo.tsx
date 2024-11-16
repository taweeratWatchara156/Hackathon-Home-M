import React from 'react'
import loadingLogo from '../../public/LoadingLogo.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function LoadingLogo() {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <Link href="/" className='flex items-center gap-[10px] w-fit active:scale-95 duration-150 absolute top-5 left-5'>
        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
          <path d="M8 1L1 7.5L8 14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

        <h1 className='font-semibold text-white'>Back</h1>
      </Link>
      <Image src={loadingLogo} alt='Loading' className='animate-spin duration-300'></Image>

      <div className='text-base text-center text-white absolute bottom-5'>

      </div>
    </div>
  )
}
