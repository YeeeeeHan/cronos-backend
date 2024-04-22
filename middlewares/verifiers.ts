// Checks if a given address is a valid EVM address
export const isValidAddress = (address: string) => {
  // Regular expression to check if the address is a valid EVM address
  const addressRegex = /^0x[a-fA-F0-9]{40}$/;
  return addressRegex.test(address);
};
