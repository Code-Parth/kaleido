"use client";

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { Space_Grotesk } from 'next/font/google';
import Link from 'next/link';
import { useEffect, useState } from 'react';


const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function Sidebar() {
    const [windowWidth, setWindowWidth] = useState<number | null>(null);

    useEffect(() => {
        // Only run this effect client-side
        if (typeof window !== 'undefined') {
            const handleResize = () => setWindowWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);

            // Call the handleResize function immediately
            handleResize();

            // Cleanup the event listener on component unmount
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);


    return (
        <>
            {windowWidth && windowWidth > 1024 ? (
                // Desktop Sidebar
                < div className="fixed flex flex-col w-1/6 h-screen border-r border-[#A763FF] mx-20 ">
                    <div className='flex flex-col gap-10'>
                        {/* Logo */}
                        <div className={`${spaceGrotesk.className} flex items-center w-full text-black text-2xl font-bold mt-4 gap-1`}>
                            <Image src="/assets/logo.svg" alt='logo' width={32} height={32} />
                            Kaleido
                        </div>
                        {/* Menu */}
                        <div className='flex flex-col gap-6'>
                            <div className={`${spaceGrotesk.className} flex flex-col gap-6`}>
                                <div className='flex gap-1 text-lg items-center'>
                                    <Image src="/assets/home.svg" alt='home' width={24} height={24} />
                                    <Link href="/home">Home</Link>
                                </div>
                                <div className='flex gap-1 text-lg items-center'>
                                    <Image src="/assets/discover.svg" alt='discover' width={24} height={24} />
                                    <Link href="/discover">Discover</Link>
                                </div>
                                <div className='flex gap-1 text-lg items-center'>
                                    <Image src="/assets/community.svg" alt='community' width={24} height={24} />
                                    <Link href="/community">Community</Link>
                                </div>
                                <div className='flex gap-1 text-lg items-center'>
                                    <Image src="/assets/profile.svg" alt='profile' width={24} height={24} />
                                    <Link href="/profile">Profile</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Post Button */}
                    <div className={`${spaceGrotesk} fixed bottom-4 cursor-pointer w-fit rounded-full text-[#DCC1FF] hover:text-white hover:bg-[#6F00FF] transition-all items-center px-8 py-2 bg-[#9D51FF] `}>
                        Create a Post
                    </div>
                </div >
            ) : (
                // Mobile Sidebar
                <>
                    {/* Header */}
                    <div className="flex w-full fixed justify-between items-center px-5 py-4 border-b-[1px] border-[#6F00FF] ">
                        <Link href="/home" className={`${spaceGrotesk.className} flex items-center cursor-pointer text-black text-2xl font-bold gap-1`}>
                            <Image src="/assets/logo.svg" alt='logo' width={20} height={20} />
                            Kaleido
                        </Link>
                        <Image src="/assets/settings.svg" alt='settings' width={20} height={20} />
                    </div>
                    <div className='fixed items-center flex bottom-0 bg-[#CCACF6] p-4 w-full'>
                        <div className='flex justify-between items-center w-full'>
                            <Link href="/home">
                                <Image src="/assets/home.svg" alt='home' width={24} height={24} />
                            </Link>
                            <Link href="/discover">
                                <Image src="/assets/discover.svg" alt='discover' width={24} height={24} />
                            </Link>
                            <Link href="/create" >
                                <Image src="/assets/create.svg" alt='create' width={40} height={40} />
                            </Link>
                            <Link href="/community">
                                <Image src="/assets/community.svg" alt='community' width={24} height={24} />
                            </Link>
                            <Link href="/profile">
                                <Image src="/assets/profile.svg" alt='profile' width={24} height={24} />
                            </Link>
                        </div>
                    </div>
                </>

            )
            }
        </>
    );
}