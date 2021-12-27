import { accounts, contract } from '@openzeppelin/test-environment';
import { SimpleStorageInstance } from '../types/truffle-contracts/SimpleStorage'

const SimpleStorage = contract.fromArtifact('SimpleStorage');
let simpleStorageInstance:SimpleStorageInstance;

describe('SimpleStorage', function () {
  const [ owner ] = accounts;

  beforeEach(async function () {
    simpleStorageInstance = await SimpleStorage.new({ from: owner });
  });

  it("...should store the value 89.", async () => {
   
   // const simpleStorageInstance = await SimpleStorage.deployed();
    // Set value of 89
    await simpleStorageInstance.set(89, { from: owner });

    // Get stored value
    const storedData =  (await simpleStorageInstance.get()).toNumber();

    expect(storedData).toEqual(89)

  });
})
