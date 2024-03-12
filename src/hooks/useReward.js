/* eslint-disable no-unused-vars */
import { useState, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { methods } from 'utilities/ContractService';
import useRefresh from 'hooks/useRefresh';
import { useAsyncEffect } from 'hooks/useAsyncEffect';
import * as constants from 'utilities/constants';
import erc20Abi from 'utilities/abis/erc20.json';
import nftAbi from 'utilities/abis/nft.json';
import pairAbi from 'utilities/abis/pair.json';

export const useRewardData = (
  web3,
  chainId,
  strkPrice,
  ethPrice,
  totalReserve
) => {
  const numberFormat = Intl.NumberFormat('en-US');

  const { slowRefresh } = useRefresh();
  const [reserveApy, setReserveApy] = useState(0);

  const calls = useMemo(() => {
    if (!chainId) return [];
    return [
      {
        reference: 'lpBalance',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].pair,
        abi: pairAbi,
        calls: [
          {
            methodName: 'balanceOf',
            methodParameters: [constants.CONTRACT_ADDRESS[chainId].vault]
          }
        ]
      },
      {
        reference: 'nftBalance',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].nft,
        abi: nftAbi,
        calls: [
          {
            methodName: 'balanceOf',
            methodParameters: [constants.CONTRACT_ADDRESS[chainId].vault]
          }
        ]
      },
      {
        reference: 'lpTotalSupply',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].pair,
        abi: pairAbi,
        calls: [
          {
            methodName: 'totalSupply',
            methodParameters: []
          }
        ]
      },
      {
        reference: 'strkBalanceInLp',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].strk,
        abi: erc20Abi,
        calls: [
          {
            methodName: 'balanceOf',
            methodParameters: [constants.CONTRACT_ADDRESS[chainId].pair]
          }
        ]
      },
      {
        reference: 'nftPrice',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].nft,
        abi: nftAbi,
        calls: [
          {
            methodName: 'PRICE',
            methodParameters: []
          }
        ]
      }
    ];
  }, [chainId]);

  useAsyncEffect(async () => {
    if (strkPrice === 0) return;

    if (calls.length === 0) return;

    const web3ChainId = await web3.eth.net.getId();
    if (web3ChainId !== chainId) return;

    const data = await methods.ethMulticall(web3, calls);
    // console.log(data);

    const lpBalance = new BigNumber(
      data.results.lpBalance.callsReturnContext[0].returnValues[0].hex
    );
    const nftBalance = new BigNumber(
      data.results.nftBalance.callsReturnContext[0].returnValues[0].hex
    );
    const lpTotalSupply = new BigNumber(
      data.results.lpTotalSupply.callsReturnContext[0].returnValues[0].hex
    );
    const strkBalanceInLp = new BigNumber(
      data.results.strkBalanceInLp.callsReturnContext[0].returnValues[0].hex
    );
    const nftPrice = new BigNumber(
      data.results.nftPrice.callsReturnContext[0].returnValues[0].hex
    );
    const lpPrice = strkBalanceInLp
      .times(strkPrice)
      .times(2)
      .div(lpTotalSupply);

    const totalLockedPrice = lpPrice
      .times(lpBalance)
      .div(1e18)
      .plus(
        nftBalance
          .times(nftPrice)
          .times(ethPrice)
          .div(1e18)
      );

    setReserveApy(
      Number((totalReserve * 12 * 100) / totalLockedPrice.toNumber()).toFixed(1)
    );
  }, [web3, slowRefresh, calls]);

  return {
    totalReserveReward: numberFormat.format(totalReserve),
    reserveApy
  };
};
