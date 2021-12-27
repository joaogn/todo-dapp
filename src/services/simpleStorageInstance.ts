import { SimpleStorageInstance } from '../../types/truffle-contracts/SimpleStorage';
import SimpleStorageContract from "../../build/contracts/SimpleStorage.json";
import { getWeb3 } from '../services/getWeb3'


export const getSimpleStorageMethods = async () =>{
  const web3 = await getWeb3();
  const networkId = await web3.eth.net.getId();

  const deployedNetwork = SimpleStorageContract.networks[networkId];

  const simpleStorageInstance = new web3.eth.Contract(
    SimpleStorageContract.abi as any,
    deployedNetwork && deployedNetwork.address,
  );
  
  const methods = simpleStorageInstance.methods as SimpleStorageInstance['methods'];
 
  return methods;
}