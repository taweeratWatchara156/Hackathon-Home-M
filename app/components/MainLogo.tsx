import React from 'react'
import Image from 'next/image'
import logoArrow from '../../public/logoArrow.png'

export default function MainLogo() {
  return (
    <div className='flex flex-col justify-center items-center'>
        <h1 className="text-white text-[100px] font-['Licorice']">Journie</h1>
        <Image src={logoArrow} alt='Arrow' className='absolute'></Image>
        <div className="text-center text-white text-[13px] font-normal">Track every stop, check every trip</div>
    </div>
  )
}
