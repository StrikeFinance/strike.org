import BigNumber from 'bignumber.js';

const commaNumber = require('comma-number');

const format = commaNumber.bindWith(',', '.');

export const currencyFormatter = labelValue => {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9
  
    ? `$${format(new BigNumber(`${Math.abs(Number(labelValue)) / 1.0e+9}`).dp(2, 1))}B`
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6
  
    ? `$${format(new BigNumber(`${Math.abs(Number(labelValue)) / 1.0e+6}`).dp(2, 1))}M`
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3
  
    ? `$${format(new BigNumber(`${Math.abs(Number(labelValue)) / 1.0e+3}`).dp(2, 1))}K`
  
    : `$${format(new BigNumber(`${Math.abs(Number(labelValue))}`).dp(2, 1))}`;
  };

export const getBigNumber = value => {
  if (!value) {
    return new BigNumber(0);
  }
  if (BigNumber.isBigNumber(value)) {
    return value;
  }
  return new BigNumber(value);
};

export const checkIsValidNetwork = () => {
    if (window.ethereum) {
      const netId = window.ethereum.networkVersion ? +window.ethereum.networkVersion : +window.ethereum.chainId
      if (netId) {
        if (netId === 1 || netId === 3) {
          if (netId === 3 && process.env.REACT_APP_ENV === 'prod') {
            return false;
          }
          if (netId === 1 && process.env.REACT_APP_ENV === 'dev') {
            return false;
          }
          return true;
        }
        return false;
      }
    }
    return false;
  };
