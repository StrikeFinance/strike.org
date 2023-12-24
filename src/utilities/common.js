import BigNumber from 'bignumber.js';

const commaNumber = require('comma-number');

const format = commaNumber.bindWith(',', '.');

export const currencyFormatter = labelValue => {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? `$${format(
        new BigNumber(`${Math.abs(Number(labelValue)) / 1.0e9}`).dp(2, 1)
      )}B`
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? `$${format(
        new BigNumber(`${Math.abs(Number(labelValue)) / 1.0e6}`).dp(2, 1)
      )}M`
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? `$${format(
        new BigNumber(`${Math.abs(Number(labelValue)) / 1.0e3}`).dp(2, 1)
      )}K`
    : `$${format(new BigNumber(`${Math.abs(Number(labelValue))}`).dp(2, 1))}`;
};

export const shortenNumberFormatter = labelValue => {
  // Nine Zeroes for Quintillion
  return Math.abs(Number(labelValue)) >= 1.0e18
    ? `${format(
        new BigNumber(`${Math.abs(Number(labelValue)) / 1.0e18}`).dp(2, 1)
      )}Q`
    : // Nine Zeroes for Quadrillion
    Math.abs(Number(labelValue)) >= 1.0e15
    ? `${format(
        new BigNumber(`${Math.abs(Number(labelValue)) / 1.0e15}`).dp(2, 1)
      )}q`
    : // Nine Zeroes for Trillions
    Math.abs(Number(labelValue)) >= 1.0e12
    ? `${format(
        new BigNumber(`${Math.abs(Number(labelValue)) / 1.0e12}`).dp(2, 1)
      )}T`
    : // Nine Zeroes for Billions
    Math.abs(Number(labelValue)) >= 1.0e9
    ? `${format(
        new BigNumber(`${Math.abs(Number(labelValue)) / 1.0e9}`).dp(2, 1)
      )}B`
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? `${format(
        new BigNumber(`${Math.abs(Number(labelValue)) / 1.0e6}`).dp(2, 1)
      )}M`
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? `${format(
        new BigNumber(`${Math.abs(Number(labelValue)) / 1.0e3}`).dp(2, 1)
      )}K`
    : `${format(new BigNumber(`${Math.abs(Number(labelValue))}`).dp(2, 1))}`;
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

export const getReadableNumber = (
  number,
  decimal = 0,
  formatFlag = true,
  position = 2,
  round = 0
) => {
  if (formatFlag)
    return format(
      getBigNumber(number)
        .div(new BigNumber(10).pow(decimal))
        .dp(position, round)
        .toString(10)
    );
  return getBigNumber(number)
    .div(new BigNumber(10).pow(decimal))
    .dp(position, round)
    .toString(10);
};

export function shortenAddr(addr, first = 6, last = 4) {
  return [String(addr).slice(0, first), String(addr).slice(-last)].join('...');
}
