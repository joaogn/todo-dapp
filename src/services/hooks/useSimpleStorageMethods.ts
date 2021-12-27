import {useEffect,useState} from 'react';
import { SimpleStorageInstance } from '../../../types/truffle-contracts/SimpleStorage';
import SimpleStorageContract from "../../../build/contracts/SimpleStorage.json";
import { getWeb3 } from '../../services/getWeb3'

export const useSimpleStorageMethods = () => {
 const [loading,setLoading] = useState(false);
 const [methods,setMethods] = useState<any>()
 const [account,setAccount] = useState<string>()

  useEffect(() =>{
    async function getSimpleStorageMethods(){
      setLoading(true);
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
    
      const deployedNetwork = SimpleStorageContract.networks[networkId];
    
      const simpleStorageInstance = new web3.eth.Contract(
        SimpleStorageContract.abi as any,
        deployedNetwork && deployedNetwork.address,
      );
      
      const methods = simpleStorageInstance.methods as SimpleStorageInstance['methods'];
      setMethods(methods)
      setAccount(accounts[0])
      setLoading(false);
    }
    getSimpleStorageMethods();
  },[])

  return { loading, methods, account };
};