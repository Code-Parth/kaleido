import axios from 'axios';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { marketplaceAddress } from '@/config';
import React, { useState, useContext, createContext, useEffect } from 'react';
import NFTMarketplace from '@/artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [contract, setContract] = useState(null);

    /**
     * Returns the contract
     * @returns contract
     */
    async function loadContract() {
        const provider = new ethers.providers.JsonRpcProvider(
            process.env.RPC_URL
        );
        const contract = new ethers.Contract(
            marketplaceAddress,
            NFTMarketplace.abi,
            provider
        );
        setContract(contract);
    }

    useEffect(() => {
        loadContract();
    }, []);

    /**
     * Returns all listed unsold NFTs
     * @returns listed unsold NFTs
     */
    async function fetchUnsoldListedNFTs() {
        try {
            const data = await contract.fetchMarketItems();
            /*
             *  map over items returned from smart contract and format
             *  them as well as fetch their token metadata
             */
            const items = await Promise.all(
                data.map(async (i) => {
                    const tokenUri = await contract.tokenURI(i.tokenId);
                    const meta = await axios.get(tokenUri);
                    let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
                    let item = {
                        price,
                        tokenId: i.tokenId.toNumber(),
                        seller: i.seller,
                        owner: i.owner,
                        image: meta.data.image,
                        name: meta.data.name,
                        description: meta.data.description,
                    };
                    return item;
                })
            );
            return items;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Returns the user's listed NFTs
     * @returns listedNFTs
     */
    async function fetchUserListedNFTs() {
        const web3Modal = new Web3Modal({
            network: 'mainnet',
            cacheProvider: true,
        });
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
            marketplaceAddress,
            NFTMarketplace.abi,
            signer
        );
        try {
            const data = await contract.fetchItemsListed();

            const items = await Promise.all(
                data.map(async (i) => {
                    const tokenUri = await contract.tokenURI(i.tokenId);
                    const meta = await axios.get(tokenUri);
                    let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
                    let item = {
                        price,
                        tokenId: i.tokenId.toNumber(),
                        seller: i.seller,
                        owner: i.owner,
                        image: meta.data.image,
                    };
                    return item;
                })
            );
            return items;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Returns the user's owned NFTs
     * @returns User OwnedNFTs
     */
    async function fetchUserOwnedNFTs() {
        const web3Modal = new Web3Modal({
            network: 'mainnet',
            cacheProvider: true,
        });
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const marketplaceContract = new ethers.Contract(
            marketplaceAddress,
            NFTMarketplace.abi,
            signer
        );
        try {
            const data = await marketplaceContract.fetchMyNFTs();

            const items = await Promise.all(
                data.map(async (i) => {
                    const tokenURI = await marketplaceContract.tokenURI(i.tokenId);
                    const meta = await axios.get(tokenURI);
                    let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
                    let item = {
                        price,
                        tokenId: i.tokenId.toNumber(),
                        seller: i.seller,
                        owner: i.owner,
                        image: meta.data.image,
                        tokenURI,
                    };
                    return item;
                })
            );
            return items;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <StateContext.Provider
            value={{
                contract,
                fetchUserListedNFTs,
                fetchUserOwnedNFTs,
                fetchUnsoldListedNFTs,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);