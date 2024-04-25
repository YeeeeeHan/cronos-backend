import { ethers } from 'ethers';
import { ERC20ABI } from '../service/abi/ERC20ABI';
import {
  getCRC20Balance,
  getCRC20Contract,
  getCROBalance,
  getProvider,
} from '../service/web3';
import { NETWORK_ERROR } from '../utils/constants';

const walletAddress = '0xe208376740faa7b5c7ac4ce17b038bf8e1f15f48';
const tokenAddress = '0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23';
const invalidRPC = 'https://invalid-url';
// Path: test/web3.test.ts
describe('Web3', () => {
  it('should return the provider based on the chain', () => {
    const provider = getProvider();
    expect(provider).toBeDefined();
  });

  it('should return the contract instance of the CRC20 token', () => {
    const contract = getCRC20Contract(tokenAddress);
    expect(contract).toBeDefined();
  });

  it('should return the balance of the CRC20 token for the given address', async () => {
    const balance = await getCRC20Balance(tokenAddress, walletAddress);
    expect(balance).toBeDefined();
  });

  it('should return the balance of the CRO token for the given address', async () => {
    const balance = await getCROBalance(walletAddress);
    expect(balance).toBeDefined();
  });

  it('should throw NETWORK_ERROR if RPC url is invalid', async () => {
    const faultyProvider = new ethers.providers.JsonRpcProvider(invalidRPC);
    const contract = new ethers.Contract(
      tokenAddress,
      ERC20ABI,
      faultyProvider
    );

    try {
      await contract.balanceOf(walletAddress);
      // Code should not reach here
      throw new Error('Expected an error to be thrown.');
    } catch (e: any) {
      expect(e.code).toBe(NETWORK_ERROR);
    }
  });
});
