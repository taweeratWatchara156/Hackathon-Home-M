import Link from 'next/link'
import React from 'react'
import scanIcon from '../../../../public/scan-icon.png'
import Image from 'next/image'

export default function page({ params }: {params:any}) {
  const { hostCode } : { hostCode:string } = React.use(params)

  return (
    <div className='h-full w-full p-5 bg-[#363636]'>
      <Link href={`/host-trip/${hostCode}`} className='flex items-center gap-[10px] w-fit active:scale-95 duration-150'>
        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
          <path d="M8 1L1 7.5L8 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <h1 className='font-semibold text-white'>Back</h1>
      </Link>

      <h1 className='text-white text-center text-[32px] mt-[30px]'>Scan QR Code</h1>

      <div className='bg-white w-[300px] h-[300px] flex mx-auto mt-[20%] p-3 rounded-[50px]'>
        <Image src={scanIcon} alt='scan'></Image>
      </div>
    </div>
  )
}
