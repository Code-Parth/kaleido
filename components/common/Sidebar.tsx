"use client";

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { Space_Grotesk } from 'next/font/google';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";


const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function Sidebar() {

    const handlePost = () => {
        // Get the value of the input field
        const name = (document.getElementById('name') as HTMLInputElement).value;
        // Get the value of the image field
        const imageInput = document.getElementById('image') as HTMLInputElement;
        const image = imageInput?.files?.[0];
        // Log the values to the console
        console.log(name, image);
    }

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
                <div className='fixed flex w-full justify-between'>
                    <div className="flex flex-col w-1/6 h-screen border-r border-[#A763FF] mx-20">
                        <div className='flex flex-col gap-10'>
                            {/* Logo */}
                            <Link href="/home" className={`${spaceGrotesk.className} flex items-center w-full text-black text-2xl font-bold mt-4 gap-1`}>
                                <Image src="/assets/logo.svg" alt='logo' width={32} height={32} />
                                Kaleido
                            </Link>
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
                            <Dialog>
                                <DialogTrigger>Create a Post</DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <div className="flex flex-col gap-2">
                                            <Image src="/assets/pfp.png" alt="profile-picture" className='pointer-events-none' width={36} height={36} />
                                            <input className="Input bg-[#AC6CFF] border-none font-medium p-2 w-full placeholder:text-[#333333]  rounded-md" id="name" placeholder="Write something here!" />
                                        </div>
                                        <div className='flex mt-2 cursor-pointer items-center gap-1 p-2 rounded-lg bg-[#6F00FF] w-fit'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M2.5 10C6.25 10 10 6.25 10 2.5C10 6.25 13.75 10 17.5 10C13.75 10 10 13.75 10 17.5C10 13.75 6.25 10 2.5 10Z" stroke="#CCACF7" stroke-width="1.5" stroke-linejoin="round" />
                                                <path d="M1.66675 16.25C2.36119 16.25 3.75008 14.8611 3.75008 14.1667C3.75008 14.8611 5.13897 16.25 5.83341 16.25C5.13897 16.25 3.75008 17.6389 3.75008 18.3333C3.75008 17.6389 2.36119 16.25 1.66675 16.25Z" stroke="#CCACF7" stroke-width="1.5" stroke-linejoin="round" />
                                                <path d="M13.3333 4.16666C14.1666 4.16666 15.8333 2.5 15.8333 1.66666C15.8333 2.5 17.4999 4.16666 18.3333 4.16666C17.4999 4.16666 15.8333 5.83333 15.8333 6.66666C15.8333 5.83333 14.1666 4.16666 13.3333 4.16666Z" stroke="#CCACF7" stroke-width="1.5" stroke-linejoin="round" />
                                            </svg>
                                            <p className='text-sm text-[#CCACF6]'>generate my own masterpiece! </p>
                                        </div>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <div className='w-full'>
                                            <div className='h-[1px] border-t-0 bg-[#1E1E1E]'>
                                            </div>
                                            <div className="flex items-center justify-between p-2">
                                                {/* Image */}
                                                <div>
                                                    <label htmlFor="image">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="18"
                                                            height="19"
                                                            viewBox="0 0 18 19"
                                                            fill="none"
                                                            style={{ cursor: 'pointer' }} // Add pointer cursor to indicate clickable
                                                        >
                                                            <path
                                                                d="M0 3C0 1.619 1.119 0.5 2.5 0.5H15.5C16.881 0.5 18 1.619 18 3V16C18 17.381 16.881 18.5 15.5 18.5H2.5C1.119 18.5 0 17.381 0 16V3ZM2.5 2.5C2.224 2.5 2 2.724 2 3V12.086L5 9.086L8 12.086L13 7.086L16 10.086V3C16 2.724 15.776 2.5 15.5 2.5H2.5ZM16 12.914L13 9.914L8 14.914L5 11.914L2 14.914V16C2 16.276 2.224 16.5 2.5 16.5H15.5C15.776 16.5 16 16.276 16 16V12.914ZM6.75 4.5C5.784 4.5 5 5.284 5 6.25C5 7.216 5.784 8 6.75 8C7.716 8 8.5 7.216 8.5 6.25C8.5 5.284 7.716 4.5 6.75 4.5Z"
                                                                fill="black"
                                                            />
                                                        </svg>
                                                    </label>
                                                    <input
                                                        id="image"
                                                        type="file"
                                                        accept="image/*"
                                                        style={{ display: 'none' }} // Hide the input element
                                                    />
                                                </div>
                                                {/* Button */}
                                                <DialogClose>
                                                    <button onClick={handlePost} className={`px-4 py-1 font-bold rounded-lg w-fit bg-[#CCACF6] ${spaceGrotesk.className}`} aria-label="Close">Post</button>
                                                </DialogClose>

                                            </div>
                                        </div>

                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                        </div>
                    </div >

                    <div className="flex flex-col justify-between w-1/6 h-screen border-l border-[#A763FF]  mx-20">
                        <ConnectButton />
                        <div className=' mb-2 flex justify-center text-black text-sm font-normal'>
                            <p>© 2024 Kaleido</p>
                        </div>
                    </div>
                </div>
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

                            <Dialog>
                                <DialogTrigger><Image src="/assets/create.svg" alt='create' width={36} height={36} /></DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <div className="flex flex-col gap-2">
                                            <Image src="/assets/pfp.png" alt="profile-picture" className='pointer-events-none' width={36} height={36} />
                                            <input className="Input bg-[#AC6CFF] border-none font-medium p-2 w-full placeholder:text-[#333333]  rounded-md" id="name" placeholder="Write something here!" />
                                        </div>
                                        <div className='flex mt-1 cursor-pointer items-center gap-1 p-2 rounded-lg bg-[#6F00FF] w-fit'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
                                                <path d="M2.5 10C6.25 10 10 6.25 10 2.5C10 6.25 13.75 10 17.5 10C13.75 10 10 13.75 10 17.5C10 13.75 6.25 10 2.5 10Z" stroke="#CCACF7" stroke-width="1.5" stroke-linejoin="round" />
                                                <path d="M1.66675 16.25C2.36119 16.25 3.75008 14.8611 3.75008 14.1667C3.75008 14.8611 5.13897 16.25 5.83341 16.25C5.13897 16.25 3.75008 17.6389 3.75008 18.3333C3.75008 17.6389 2.36119 16.25 1.66675 16.25Z" stroke="#CCACF7" stroke-width="1.5" stroke-linejoin="round" />
                                                <path d="M13.3333 4.16666C14.1666 4.16666 15.8333 2.5 15.8333 1.66666C15.8333 2.5 17.4999 4.16666 18.3333 4.16666C17.4999 4.16666 15.8333 5.83333 15.8333 6.66666C15.8333 5.83333 14.1666 4.16666 13.3333 4.16666Z" stroke="#CCACF7" stroke-width="1.5" stroke-linejoin="round" />
                                            </svg>
                                            <p className='text-sm text-[#CCACF6]'>generate my own masterpiece! </p>
                                        </div>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <div className='w-full'>
                                            <div className='h-[1px] border-t-0 bg-[#1E1E1E]'>
                                            </div>
                                            <div className="flex items-center justify-between p-2">
                                                {/* Image */}
                                                <div>
                                                    <label htmlFor="image">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="18"
                                                            height="19"
                                                            viewBox="0 0 18 19"
                                                            fill="none"
                                                            style={{ cursor: 'pointer' }} // Add pointer cursor to indicate clickable
                                                        >
                                                            <path
                                                                d="M0 3C0 1.619 1.119 0.5 2.5 0.5H15.5C16.881 0.5 18 1.619 18 3V16C18 17.381 16.881 18.5 15.5 18.5H2.5C1.119 18.5 0 17.381 0 16V3ZM2.5 2.5C2.224 2.5 2 2.724 2 3V12.086L5 9.086L8 12.086L13 7.086L16 10.086V3C16 2.724 15.776 2.5 15.5 2.5H2.5ZM16 12.914L13 9.914L8 14.914L5 11.914L2 14.914V16C2 16.276 2.224 16.5 2.5 16.5H15.5C15.776 16.5 16 16.276 16 16V12.914ZM6.75 4.5C5.784 4.5 5 5.284 5 6.25C5 7.216 5.784 8 6.75 8C7.716 8 8.5 7.216 8.5 6.25C8.5 5.284 7.716 4.5 6.75 4.5Z"
                                                                fill="black"
                                                            />
                                                        </svg>
                                                    </label>
                                                    <input
                                                        id="image"
                                                        type="file"
                                                        accept="image/*"
                                                        style={{ display: 'none' }} // Hide the input element
                                                    />
                                                </div>
                                                {/* Button */}
                                                <DialogClose>
                                                    <button onClick={handlePost} className={`px-4 py-1 text-sm font-bold rounded-lg w-fit bg-[#CCACF6] ${spaceGrotesk.className}`} aria-label="Close">Post</button>
                                                </DialogClose>

                                            </div>
                                        </div>

                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
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