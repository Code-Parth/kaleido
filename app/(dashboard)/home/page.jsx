"use client";

import axios from "axios";
import { useState } from "react";
import MarketplaceJSON from "@/Marketplace.json";
// import { json } from "stream/consumers";

export default function Marketplace() {
    const [data, updateData] = useState([]);
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
            // console.log(tokenURI);
            const meta = fetch(tokenURI).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
                .then(data => {
                    console.log('Data received:', data);
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
            // console.log("----------------------------",meta);
            // const meta = await axios.get(tokenURI);
            // console.log(meta);

            // let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
            // let item = {
            //     price,
            //     tokenId: i.tokenId.toNumber(),
            //     seller: i.seller,
            //     owner: i.owner,
            //     image: meta.image,
            //     name: meta.name,
            //     description: meta.description,
            // }
            // return item;
        }))

        // updateFetched(true);
        // updateData(items);
    }

    if (!dataFetched) {
        getAllNFTs();
    }

    // console.log(data);

    return (
        <>

        </>
    );

}