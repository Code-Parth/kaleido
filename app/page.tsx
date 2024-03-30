"use client";

import Image from 'next/image';
import { useEffect } from 'react';
import { useAccount } from "wagmi";
import { useRouter } from 'next/navigation';
import { Space_Grotesk } from 'next/font/google';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function Home() {
    const { address, isConnected } = useAccount();

    if (isConnected) {
        console.log(`Connected with address: ${address}`);
    }

    const router = useRouter();
    useEffect(() => {
        if (isConnected) {
            router.push('/home');
        }
    }, [isConnected, router]);

    return (
        <div className='flex flex-col justify-center mx-20 max-sm:mx-5'>
            {/* Navbar */}
            <div className={`${spaceGrotesk.className} flex justify-center items-center w-full text-black text-2xl font-bold mt-4 gap-1`}>
                <Image src="/assets/logo.svg" alt='logo' width={32} height={32} />
                Kaleido
            </div>
            {/* Hero */}
            <div className='flex mt-24 items-center justify-between max-sm:flex-col max-sm:mt-12'>
                {/* Text Part */}
                <div className='flex flex-col gap-4 w-1/2 max-sm:items-center max-sm:w-full'>
                    {/* Image 1 */}
                    {/* Header */}
                    <h1 className={`${spaceGrotesk.className} text-6xl max-sm:text-center max-sm:text-3xl font-bold text-[#6F00FF]`}>{`Reimagine what's possible`}</h1>
                    {/* Paragraph */}
                    <p className='text-2xl max-sm:text-base max-sm:text-center'>Kaleido empowers you to generate unique content, connect with a vibrant community, and own your creations as NFTs.</p>
                    {/* Button */}
                    <ConnectButton />
                </div>
                {/* Image Part */}
                <Image src='/assets/hero.png' alt='hero' width={537} height={522} />
            </div>

            {/* Footer */}
            <div className='fixed bottom-5 flex w-full justify-center items-center text-black text-sm font-normal'>
                <p>© 2024 Kaleido</p>
            </div>

        </div>
    );
}
