import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Space_Grotesk } from 'next/font/google';
import Image from 'next/image';

export default function Home() {
    return (
        <div className='flex flex-col justify-center'>
            {/* Navbar */}
            <div className='flex justify-center items-center w-full text-black text-2xl font-bold mt-4 gap-1'>
                <Image src="/assets/logo.svg" alt='logo' width={32} height={32} />
                Kaleido
            </div>
            {/* Hero */}
            <div className='flex mt-24 items-center justify-between max-sm:flex-col max-sm:mt-12'>
                {/* Text Part */}
                <div className='flex flex-col gap-4 w-1/2 max-sm:w-full'>
                    {/* Image 1 */}
                    {/* Header */}
                    <h1 className='text-6xl max-sm:text-3xl font-bold text-[#6F00FF]'>Reimagine what’s possible</h1>
                    {/* Paragraph */}
                    <p className='text-2xl max-sm:text-base'>Kaleido empowers you to generate unique content, connect with a vibrant community, and own your creations as NFTs.</p>
                    {/* Button */}
                    <ConnectButton />
                </div>
                {/* Image Part */}
                <Image src='/assets/hero.png' alt='hero' width={537} height={522} />
            </div>
            {/* Footer */}
            <div className='flex justify-center items-center w-full text-black text-sm font-normal mt-4 gap-1'>
                <p>© 2024 Kaleido</p>
            </div>

        </div>
    );
}
