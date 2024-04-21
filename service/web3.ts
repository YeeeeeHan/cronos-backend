import dotenv from 'dotenv';
import { ethers, providers } from 'ethers';
import { config } from '../config/config';
import { TokenInfo } from '../utils/types/types';
import { ERC20ABI } from './abi/ERC20ABI';
dotenv.config();

// Returns the provider based on the chain
export function getProvider(): providers.Provider {
  if (config.isMainnet) {
    return new ethers.providers.JsonRpcProvider(config.RPC_MAINNET);
  } else {
    return new ethers.providers.JsonRpcProvider(config.RPC_TESTNET);
  }
}

// Returns the contract instance of the CRC20 token
export function getCRC20Contract(address: string): ethers.Contract {
  return new ethers.Contract(address, ERC20ABI, getProvider());
}

// Get the balance of the CRC20 token for the given address
export async function getCRC20Balance(
  tokenAddress: string,
  walletAddress: string
): Promise<string> {
  const contract = getCRC20Contract(tokenAddress);
  const balance = await contract.balanceOf(walletAddress);
  return balance.toString();
}

// Get the information of the CRC20 token
export async function getCRC20Information(
  tokenAddress: string
): Promise<TokenInfo> {
  const contract = getCRC20Contract(tokenAddress);
  const name = await contract.name();
  const symbol = await contract.symbol();
  const decimals = await contract.decimals();
  const tokenInfo: TokenInfo = {
    address: tokenAddress,
    name,
    symbol,
    decimals,
  };
  return tokenInfo;
}

// Get the balance of the CRO token for the given address
export async function getCROBalance(address: string): Promise<string> {
  const provider = getProvider();
  const balance = await provider.getBalance(address);
  return balance.toString();
}
