import { useState, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { methods } from 'utilities/ContractService';
import useRefresh from 'hooks/useRefresh';
import { useAsyncEffect } from 'hooks/useAsyncEffect';
import * as constants from 'utilities/constants';
import saleAbi from 'utilities/abis/sale.json';

const initSalePoolInfo = {
  startTime: 0,
  endTime: 0,
  offeringAmount: new BigNumber(0),
  soldAmount: new BigNumber(0),
  minStrkAmount: new BigNumber(0),
  userLimitAmount: new BigNumber(0),
  shortPrice: new BigNumber(0),
  longPrice: new BigNumber(0),
  shortVestingPercentage: 0,
  longVestingPercentage: 0,
  shortVestingDuration: 0,
  longVestingDuration: 0,
  whitelistEnable: false
};

export const useSaleInfo = (web3, chainId) => {
  const { slowRefresh } = useRefresh();
  const [saleInfo, setSaleInfo] = useState({
    poolLength: 0,
    poolInfos: [
      ...[...Array(10)].map((item, index) => {
        return {
          index,
          ...initSalePoolInfo
        };
      })
    ],
    harvestAllowed: false,
    ethPrice: new BigNumber(0),
    wbtcPrice: new BigNumber(0)
  });

  const calls = useMemo(() => {
    return [
      ...[...Array(10)].map((item, index) => {
        return {
          reference: `poolInfo${index}`,
          contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
          abi: saleAbi,
          calls: [
            {
              methodName: 'viewPoolInformation',
              methodParameters: [index]
            }
          ]
        };
      }),
      ...[...Array(10)].map((item, index) => {
        return {
          reference: `whitelistEnable${index}`,
          contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
          abi: saleAbi,
          calls: [
            {
              methodName: 'isWhitelistSale',
              methodParameters: [index]
            }
          ]
        };
      }),
      {
        reference: 'harvestAllowed',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'harvestAllowed'
          }
        ]
      },
      {
        reference: 'ethPrice',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'computeAmounts',
            methodParameters: [
              constants.ZERO_ADDRESS,
              '1000000000000000000',
              0,
              0
            ]
          }
        ]
      },
      {
        reference: 'wbtcPrice',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'computeAmounts',
            methodParameters: [
              constants.CONTRACT_ADDRESS[chainId].wbtc,
              '100000000',
              0,
              0
            ]
          }
        ]
      }
    ];
  }, [chainId]);

  useAsyncEffect(async () => {
    const web3ChainId = await web3.eth.net.getId();
    if (web3ChainId !== chainId) return;
    const data = await methods.ethMulticall(web3, calls);
    let poolLength = 0;
    for (let i = 0; i < 10; i += 1) {
      if (
        new BigNumber(
          data.results[`poolInfo${i}`].callsReturnContext[0].returnValues[0].hex
        ).toNumber() === 0
      )
        break;
      poolLength += 1;
    }
    setSaleInfo({
      poolLength,
      poolInfos: [
        ...[...Array(10)].map((item, index) => {
          return {
            index,
            startTime: new BigNumber(
              data.results[
                `poolInfo${index}`
              ].callsReturnContext[0].returnValues[0].hex
            ).toNumber(),
            endTime: new BigNumber(
              data.results[
                `poolInfo${index}`
              ].callsReturnContext[0].returnValues[1].hex
            ).toNumber(),
            offeringAmount: new BigNumber(
              data.results[
                `poolInfo${index}`
              ].callsReturnContext[0].returnValues[2].hex
            ),
            soldAmount: new BigNumber(
              data.results[
                `poolInfo${index}`
              ].callsReturnContext[0].returnValues[3].hex
            ),
            minStrkAmount: new BigNumber(
              data.results[
                `poolInfo${index}`
              ].callsReturnContext[0].returnValues[4].hex
            ),
            userLimitAmount: new BigNumber(
              data.results[
                `poolInfo${index}`
              ].callsReturnContext[0].returnValues[5].hex
            ),
            shortPrice: new BigNumber(
              data.results[
                `poolInfo${index}`
              ].callsReturnContext[0].returnValues[11].hex
            ),
            longPrice: new BigNumber(
              data.results[
                `poolInfo${index}`
              ].callsReturnContext[0].returnValues[12].hex
            ),
            shortVestingPercentage: new BigNumber(
              data.results[
                `poolInfo${index}`
              ].callsReturnContext[0].returnValues[7].hex
            ).toNumber(),
            longVestingPercentage: new BigNumber(
              data.results[
                `poolInfo${index}`
              ].callsReturnContext[0].returnValues[8].hex
            ).toNumber(),
            shortVestingDuration: new BigNumber(
              data.results[
                `poolInfo${index}`
              ].callsReturnContext[0].returnValues[9].hex
            )
              .div(86400 * 30)
              .dp(2, 1)
              .toNumber(),
            longVestingDuration: new BigNumber(
              data.results[
                `poolInfo${index}`
              ].callsReturnContext[0].returnValues[10].hex
            )
              .div(86400 * 30)
              .dp(2, 1)
              .toNumber(),
            whitelistEnable:
              data.results[`whitelistEnable${index}`].callsReturnContext[0]
                .returnValues[0]
          };
        })
      ],
      harvestAllowed:
        data.results.harvestAllowed.callsReturnContext[0].returnValues[0],
      ethPrice: data.results.ethPrice.callsReturnContext[0].returnValues[0].hex,
      wbtcPrice:
        data.results.wbtcPrice.callsReturnContext[0].returnValues[0].hex
    });
  }, [web3, slowRefresh, calls]);

  return saleInfo;
};
