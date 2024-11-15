"use client"

import MainLogo from '@/app/components/MainLogo'
import React, { use, useEffect } from 'react'
import Image from 'next/image'
import Clound from '../../../public/Clound.png'
import { SignedOut, SignIn, SignUp, useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'



export default function SignInPage() {
    const route = useRouter();
    const { userId } = useAuth()

    useEffect(() => {
        console.log(userId)

        if(userId){
            route.push('/')
        }
    }, [])

    return (
        <div className='w-full h-full'>
            {/* Top */}
            <div className='h-[45%] pt-[10%] relative'>
                <MainLogo />
                <Image src={Clound} alt='Clound' className='absolute bottom-[-1px] w-[100%]'></Image>
            </div>

            {/* Bottom */}
            <div className='bg-white flex flex-col gap-[20px] items-center border pb-[20px]'>
                <SignedOut>
                    <SignIn fallbackRedirectUrl='/' signUpUrl='/sign-up'/>
                </SignedOut>
            </div>
        </div>
    )
}
