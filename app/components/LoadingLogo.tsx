import React from 'react'
import loadingLogo from '../../public/LoadingLogo.svg'
import Image from 'next/image'

export default function LoadingLogo() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <Image src={loadingLogo} alt='Loading' className='animate-spin duration-300'></Image>
    </div>
  )
}
