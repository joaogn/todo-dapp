import create from 'zustand';
import Web3 from "web3";

declare global {
  interface Window {
      ethereum: any;
      web3: any;
  }
}

interface Web3StoreState {
  web3: Web3 | null;
  getWeb3: () => void;
}

export const useWeb3Store = create<Web3StoreState>((set) => ({
  web3: null,
  getWeb3: async() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        set(state => ({web3}))
      } catch (error) {
        throw new Error(error)
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      const web3 = window.web3;
      console.log("Injected web3 detected.");
      set(state => ({web3}))
    }
    else {
      const provider = new Web3.providers.HttpProvider(
        "http://127.0.0.1:7545"
      );
      const web3 = new Web3(provider);
      console.log("No web3 instance injected, using Local web3.");
      set(state => ({web3}))
    }
  }
}) )