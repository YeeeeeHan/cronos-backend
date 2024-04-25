import { BigNumber } from 'ethers';
import { isValidAddress, parseBalance } from '../utils/utils';

describe('isValidAddress()', () => {
  it('should return true for a valid address', () => {
    const validAddress = '0xe208376740faa7b5c7ac4ce17b038bf8e1f15f48';
    expect(isValidAddress(validAddress)).toBe(true);
  });

  it('should return false for an invalid address', () => {
    const invalidAddress = '123';
    expect(isValidAddress(invalidAddress)).toBe(false);

    const invalidAddress2 = '0x123';
    expect(isValidAddress(invalidAddress2)).toBe(false);

    const invalidAddress3 = '0xe208376';
    expect(isValidAddress(invalidAddress3)).toBe(false);
  });
});

describe('parseBalance()', () => {
  it('should ', () => {
    const balance = '1234.12345';
    expect(parseBalance(balance)).toBe('1,234.123');
  });

  it('should ', () => {
    const balance = BigNumber.from('1234123000000000000000');
    expect(parseBalance(balance)).toBe('1,234.123');
  });

  it('should ', () => {
    const balance = 1234.12345;
    expect(parseBalance(balance)).toBe('1,234.123');
  });
});
