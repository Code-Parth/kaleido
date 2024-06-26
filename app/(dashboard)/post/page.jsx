"use client";

import { useState } from "react";
// import { useLocation } from "react-router";
import Marketplace from '@/Marketplace.json';
import { uploadFileToIPFS, uploadJSONToIPFS } from "@/context/pinata";
import Image from 'next/image';
import { Space_Grotesk } from 'next/font/google';
import Link from 'next/link';

import Sidebar from "@/components/common/Sidebar";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function SellNFT() {
    const [formParams, updateFormParams] = useState({ name: '', description: '', price: '0.00001' });
    const [fileURL, setFileURL] = useState(null);
    const ethers = require("ethers");
    const [message, updateMessage] = useState('');
    // const location = useLocation();

    // upload NFT image to IPFS
    async function OnChangeFile(e) {
        var file = e.target.files[0];
        try {
            const response = await uploadFileToIPFS(file);
            if (response.success === true) {
                console.log(`Uploaded image to pinata: ${response.pinataURL}`);
                setFileURL(response.pinataURL);
            }
        }
        catch (e) {
            console.log(`Error during file upload ${e}`);
        }
    }

    // upload metadata to IPFS
    async function uploadMetadataToIPFS() {
        const { name, description, price } = formParams;
        // Make sure that none of the fields are empty.
        if (!name || !description || !price || !fileURL)
            return null;
        const nftJSON = {
            name, description, price, image: fileURL
        };
        try {
            const response = await uploadJSONToIPFS(nftJSON);
            if (response.success === true) {
                console.log(`Uploaded JSON to Pinata: ${response}`);
                return response.pinataURL;
            }
        }
        catch (e) {
            console.log(`error uploading JSON metadata: ${e}`);
            return null;
        }
    }

    async function listNFT(e) {
        e.preventDefault();

        try {
            const metadataURL = await uploadMetadataToIPFS();
            if (metadataURL == null) {
                updateMessage(`Please chekc all fields filled`);
                return;
            }
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            updateMessage(`Please wait... uploading`);

            let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer);
            const price = ethers.utils.parseUnits(formParams.price, 'ether');
            let listingPrice = await contract.getListPrice();
            listingPrice = listingPrice.toString();

            // actually create the NFT
            let transaction = await contract.createToken(metadataURL, price, { value: listingPrice });
            await transaction.wait();

            alert('Successfuly listed your NFT!');
            updateMessage('');
            updateFormParams({
                name: '', description: '', price: '0.00001'
            });
            window.location.replace('/');
        }
        catch (e) {
            alert(`Upload error ${e}`);
        }
    }

    return (
        <>
            <div className="flex flex-row">
                <Sidebar />
                <div className="flex w-full h-screen justify-center items-center">
                    <div className="flex flex-col place-items-center mt-10" id="nftForm">
                        <form className="shadow-md rounded px-8 pt-4 pb-8 mb-4">
                            {/* <h3 className="text-center font-bold text-purple-500 mb-8">Upload your NFT to the marketplace</h3> */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold leading-6 text-gray-900" htmlFor="name">NFT Name</label>
                                <input className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" id="name" type="text" placeholder="KLD#4563" onChange={e => updateFormParams({ ...formParams, name: e.target.value })} value={formParams.name}></input>
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-semibold leading-6 text-gray-900" htmlFor="description">Post Description</label>
                                <textarea className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" cols="40" rows="5" id="description" type="text" placeholder="NFT Description" value={formParams.description} onChange={e => updateFormParams({ ...formParams, description: e.target.value })}></textarea>
                            </div>
                            {/* <div className="mb-6">
                                <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="price">Price (in ETH)</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Min 0.01 ETH" step="0.01" value={formParams.price} onChange={e => updateFormParams({ ...formParams, price: e.target.value })}></input>
                            </div> */}
                            <div>
                                <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="image">Upload Image</label>
                                <input type={"file"} onChange={OnChangeFile}></input>
                            </div>
                            <br></br>
                            <div className="text-green text-center">{message}</div>
                            <button onClick={listNFT} className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg">
                                List NFT
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}