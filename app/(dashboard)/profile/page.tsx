"use client";

import { useEffect, useState } from "react";
import { useStateContext } from "@/context";

export default function Home() {
    const [nfts, setNfts] = useState([]);
    const [loadingState, setLoadingState] = useState("not-loaded");
    const [isLoading, setIsLoading] = useState(false);

    const { fetchUserOwnedNFTs } = useStateContext();

    useEffect(() => {
        loadNFTs();
    }, []);

    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

    async function loadNFTs() {
        try {
            setIsLoading(true);
            const userOwnedNFTs = await fetchUserOwnedNFTs();
            setNfts(userOwnedNFTs);
            setLoadingState("loaded");
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    if (loadingState === "loaded" && !nfts.length) {
        return (
            <div>
                <h1>No NFTs found</h1>
            </div>
        );
    }
    if (isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <></>
    );
}
