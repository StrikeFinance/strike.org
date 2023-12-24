import { Multicall } from 'ethereum-multicall';
import * as constants from './constants';
import erc20Abi from './abis/erc20.json';
import saleAbi from './abis/sale.json';

const call = (method, params) => {
  return new Promise((resolve, reject) => {
    method(...params)
      .call()
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const send = (method, params, from, value = null) => {
  return new Promise((resolve, reject) => {
    method(...params)
      .send({ from, value: value || undefined })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const ethMulticall = (web3, contractCallContext) => {
  const multicall = new Multicall({
    web3Instance: web3,
    tryAggregate: true
  });
  return multicall.call(contractCallContext);
};

export const getTokenContract = (web3, assetName, chainId = 1) => {
  return new web3.eth.Contract(
    erc20Abi,
    constants.CONTRACT_ADDRESS[chainId][assetName]
  );
};

export const getSaleContract = (web3, chainId = 1) => {
  return new web3.eth.Contract(
    saleAbi,
    constants.CONTRACT_ADDRESS[chainId].sale
  );
};

export const methods = {
  call,
  send,
  ethMulticall
};
