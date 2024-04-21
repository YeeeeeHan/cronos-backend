export interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
}

export interface Transaction {
  data: string;
  to: string;
}

export interface ErrorInfo {
  errorArgs: any[] | null;
  errorName: string | null;
  errorSignature: string | null;
}

export interface EVMError {
  reason: string | null;
  code: string;
  method: string;
  data: string;
  address: string;
  args: string[];
  transaction: Transaction;
  errorInfo: ErrorInfo;
}

export interface ResponseError {
  code: number;
  errorName: string;
  errorMessage: string;
}

export interface GetBalanceResponse {
  walletAddress: string;
  balance: string;
  formatBalance: string;
}

export interface GetTokenBalanceResponse {
  walletAddress: string;
  tokenAddress: string;
  balance: string;
  formatBalance: string;
  tokenName: string;
  tokenSymbol: string;
}
