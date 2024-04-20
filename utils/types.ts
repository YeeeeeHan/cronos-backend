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
