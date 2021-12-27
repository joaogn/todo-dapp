import {useEffect,useState} from 'react';
import { SimpleStorageInstance } from '../../types/truffle-contracts/SimpleStorage';
import SimpleStorageContract from "../../build/contracts/SimpleStorage.json";
import { useWeb3Store } from '../stores/Web3Store';
import { AbiItem } from 'web3-utils';

export const useSimpleStorageMethods = () => {
 const web3 = useWeb3Store(state => state.web3);

 const [loading,setLoading] = useState(false);
 const [methods,setMethods] = useState<any>()

 
  useEffect(() =>{
    async function getSimpleStorageMethods(){
      setLoading(true);
      
      const networkId = await web3.eth.net.getId();
    
      const deployedNetwork = SimpleStorageContract.networks[networkId];
    
      const simpleStorageInstance = new web3.eth.Contract(
        SimpleStorageContract.abi as AbiItem[],
        deployedNetwork && deployedNetwork.address,
      );
      
      const methods = simpleStorageInstance.methods;
      setMethods(methods)
      setLoading(false);
    }
    if(web3){
      getSimpleStorageMethods();
    }
  },[web3])

  return { loading, methods };
};