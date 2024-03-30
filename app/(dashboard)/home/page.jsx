"use client";

import axios from "axios";
import { useState } from "react";
import MarketplaceJSON from "@/Marketplace.json";

export default function Marketplace() {
    const sampleData = [
        {
            "name": "NFT#1",
            "description": "Cute Dog",
            "website": "http://axieinfinity.io",
            "image": "https://gateway.pinata.cloud/ipfs/QmTcQR1wMsnxakNikzePPJee77NxDtuRBkzvWeHva9vmfq",
            "price": "0.03ETH",
            "currentlySelling": "True",
            "address": "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
        },
        {
            "name": "NFT#2",
            "description": "Fantastic Dog",
            "website": "http://axieinfinity.io",
            "image": "https://gateway.pinata.cloud/ipfs/QmdUXeAUvjiwmS3htSYECxrr6ewjF27B3FYhuLfF33W1Bq",
            "price": "0.03ETH",
            "currentlySelling": "True",
            "address": "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
        },
        {
            "name": "NFT#3",
            "description": "Next Generation of Dog",
            "website": "http://axieinfinity.io",
            "image": "https://gateway.pinata.cloud/ipfs/QmbkEvueGNBbHduz3DAUX4vVzcYn8M4CVfitzQP1nw9tRG",
            "price": "0.03ETH",
            "currentlySelling": "True",
            "address": "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
        },
    ];
    const [data, updateData] = useState(sampleData);
    const [dataFetched, updateFetched] = useState(false);

    async function getAllNFTs() {
        const ethers = require('ethers');
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        console.log(provider);

        const signer = provider.getSigner();
        let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer);
        let transaction = await contract.getAllNFTs();

        // Fetch all the details of every NFT from the contract and display
        const items = await Promise.all(transaction.map(async i => {
            const tokenURI = await contract.tokenURI(i.tokenId);
            let meta = await axios.get(tokenURI);
            meta = meta.data;

            let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.image,
                name: meta.name,
                description: meta.description,
            }
            return item;
        }))

        updateFetched(true);
        updateData(items);
    }

    if (!dataFetched) {
        getAllNFTs();
    }

    return (
        <>

        </>
    );

}