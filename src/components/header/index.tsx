"use client"

import {FiUser,FiLogOut,FiLoader,FiLock} from 'react-icons/fi'
import Link from 'next/link'

import {signIn, signOut, useSession} from 'next-auth/react'
import Image from 'next/image';
import logo from '../../assets/logo.png';

export function Header(){

    const {status,data} = useSession();



    async function handleLogin(){
        await signIn();

    }

    async function handleLogout(){
        await signOut();
    }





    return(
        <header className="w-full flex items-center px-2 bg-white p-2 shadow-sm">
            <div className='w-full flex items-center justify-between max-w-7xl mx-auto'>
                    
            <Link href='/'>
                    <Image
                        className="w-28 h-28"
                        src={logo}
                        alt="Logo of go nuts"
                        width={100}
                        height={100}
                        quality={100}
                        priority
                    />
                </Link>

                {status === "loading" &&(
                    <button className='animate-spin'>
                        <FiLoader size={26} color='#4b5563'/>
                    </button>
                )} 

                {status === "unauthenticated" && (
                    <button onClick={handleLogin}>
                    <FiLock size={26} color='#4b5563'/>
                </button>
                )} 

                    {
                        status === "authenticated" &&(
                            <div className='flex items-baseline gap-4'>

                        <Link href='/dashboard'>
                            <FiUser size={26} color='#4b5563'/>
                        </Link>
                                    
                        
                                        <button onClick={handleLogout}>
                        <FiLogOut size={26} color='#4b5563'/>
                                        </button>
                    </div>
                        )
                    }

              
            </div>
        </header>
    )
}