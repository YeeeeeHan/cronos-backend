import { BigNumber, ethers } from 'ethers';

// Rounds down the number to the specified decimal places
function roundDown(number: number, decimalPlaces: number) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.floor(number * factor) / factor;
}
// Accepts BigNumber, number, string
export const parseBalance = (
  value: BigNumber | number | string,
  decimalsToDisplay = 3
) => {
  if (value === undefined || value === '') {
    return '0';
  }
  if (typeof value === 'number') {
    return String(roundDown(value, decimalsToDisplay));
  } else if (typeof value === 'string') {
    return String(roundDown(parseFloat(value), decimalsToDisplay));
  }

  return roundDown(
    Number(ethers.utils.formatEther(value)),
    decimalsToDisplay
  ).toLocaleString(undefined);
};
