"use client"

import Image from 'next/image';
import { useAccount } from "wagmi";
import { useEffect, useState } from 'react';

export default function Post() {

    const { address, isConnected } = useAccount();
    const [connectAdress, setConnectAdress] = useState<string | null>(null);

    useEffect(() => {
        if (isConnected) {
            const shortenedAddress = address.slice(0, 6) + "..." + address.slice(-4);
            setConnectAdress(shortenedAddress);

        }
        else {
            setConnectAdress('');
        }
    }, [address, isConnected]);

    return (
        <div className="flex justify-center p-2 gap-2">
            <Image src="/assets/pfp.png" alt="pfp" width={50} height={50} className="rounded-full" />
            <div className="flex flex-col">
                <h1 className="text-lg font-bold">Username</h1>
                <p className="text-sm">@ {connectAdress}</p>

            </div>
        </div>
    );
}