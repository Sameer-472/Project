import { ethers, providers, Contract } from "ethers";
import { createContext, useState, useEffect, useRef } from "react";
import { contractAddress, abi } from "../Constant";
import Web3Modal from "web3modal";

export const Context = createContext();
export const ContextProvider = ({ children }) => {
  const web3ModalRef = useRef();

  const getProviderorSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    } 
    return web3Provider;
  };

  const readContract = async () => {
    try {
      const provider = await getProviderorSigner();
      const contract = new Contract(contractAddress, abi, provider);
      return contract;
    } catch (error) {
      console.log(error);
    }
  };

  const writeContract = async()=>{
    const signer = await getProviderorSigner(true);
    const contract = new Contract(contractAddress , abi , signer)
    return contract;
  }

  useEffect(() => {
      web3ModalRef.current = new Web3Modal({
        network: "hardhat",
        providerOptions: {
         
        },
        disableInjectedProvider: false,
      });
  }, []);

  return (
    <Context.Provider
      value={{
        readContract,
        writeContract
      }}
    >
      {children}
    </Context.Provider>
  );
};
