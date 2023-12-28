/* eslint-disable no-unused-vars */
import { useState, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { methods } from 'utilities/ContractService';
import useRefresh from 'hooks/useRefresh';
import { useAsyncEffect } from 'hooks/useAsyncEffect';
import * as constants from 'utilities/constants';
import saleAbi from 'utilities/abis/sale.json';

const initUserInfo = {
  vestingId0: '',
  vestingId1: '',
  totalAmount0: new BigNumber(0),
  claimedAmount0: new BigNumber(0),
  claimableAmount0: new BigNumber(0),
  totalAmount1: new BigNumber(0),
  claimedAmount1: new BigNumber(0),
  claimableAmount1: new BigNumber(0),
  harvest: false
};

export const useUserInfo = (web3, chainId, account, reload) => {
  const { slowRefresh } = useRefresh();
  const [userInfo, setUserInfo] = useState({
    isWhitelisted: false,
    shortRewards: [
      ...[...Array(10)].map(item => {
        return new BigNumber(0);
      })
    ],
    longRewards: [
      ...[...Array(10)].map(item => {
        return new BigNumber(0);
      })
    ],
    userInfos: [
      ...[...Array(10)].map(item => {
        return {
          ...initUserInfo
        };
      })
    ]
  });

  const calls = useMemo(() => {
    if (!account) return [];
    return [
      {
        reference: 'reward',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'viewUserOfferingAmountsForPools',
            methodParameters: [account, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]]
          }
        ]
      },
      ...[...Array(10)].map((item, index) => {
        return {
          reference: `vestingId${index}0`,
          contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
          abi: saleAbi,
          calls: [
            {
              methodName: 'computeVestingScheduleIdForAddressAndPid',
              methodParameters: [account, index, 0]
            }
          ]
        };
      }),
      ...[...Array(10)].map((item, index) => {
        return {
          reference: `vestingId${index}1`,
          contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
          abi: saleAbi,
          calls: [
            {
              methodName: 'computeVestingScheduleIdForAddressAndPid',
              methodParameters: [account, index, 1]
            }
          ]
        };
      }),
      {
        reference: 'userInfo',
        contractAddress: constants.CONTRACT_ADDRESS[chainId]?.sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'viewUserInfo',
            methodParameters: [account, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]]
          }
        ]
      },
      {
        reference: 'isWhitelisted',
        contractAddress: constants.CONTRACT_ADDRESS[chainId]?.sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'isWhitelisted',
            methodParameters: [account]
          }
        ]
      }
    ];
  }, [chainId, account]);

  useAsyncEffect(async () => {
    if (calls.length === 0) return;

    const web3ChainId = await web3.eth.net.getId();
    if (web3ChainId !== chainId) return;

    const data = await methods.ethMulticall(web3, calls);

    const claimableRewardCalls = [
      ...[...Array(10)].map((item, index) => {
        return {
          reference: `vestingSchedule${index}0`,
          contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
          abi: saleAbi,
          calls: [
            {
              methodName: 'getVestingSchedule',
              methodParameters: [
                data.results[`vestingId${index}0`].callsReturnContext[0]
                  .returnValues[0]
              ]
            }
          ]
        };
      }),
      ...[...Array(10)].map((item, index) => {
        return {
          reference: `claimableAmount${index}0`,
          contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
          abi: saleAbi,
          calls: [
            {
              methodName: 'computeReleasableAmount',
              methodParameters: [
                data.results[`vestingId${index}0`].callsReturnContext[0]
                  .returnValues[0]
              ]
            }
          ]
        };
      }),
      ...[...Array(10)].map((item, index) => {
        return {
          reference: `vestingSchedule${index}1`,
          contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
          abi: saleAbi,
          calls: [
            {
              methodName: 'getVestingSchedule',
              methodParameters: [
                data.results[`vestingId${index}1`].callsReturnContext[0]
                  .returnValues[0]
              ]
            }
          ]
        };
      }),
      ...[...Array(10)].map((item, index) => {
        return {
          reference: `claimableAmount${index}1`,
          contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
          abi: saleAbi,
          calls: [
            {
              methodName: 'computeReleasableAmount',
              methodParameters: [
                data.results[`vestingId${index}1`].callsReturnContext[0]
                  .returnValues[0]
              ]
            }
          ]
        };
      })
    ];
    const claimableRewardData = await methods.ethMulticall(
      web3,
      claimableRewardCalls
    );

    setUserInfo({
      isWhitelisted:
        data.results.isWhitelisted.callsReturnContext[0].returnValues[0],
      shortRewards: [
        ...[...Array(10)].map((item, index) => {
          return new BigNumber(
            data.results.reward.callsReturnContext[0].returnValues[index][0].hex
          );
        })
      ],
      longRewards: [
        ...[...Array(10)].map((item, index) => {
          return new BigNumber(
            data.results.reward.callsReturnContext[0].returnValues[index][1].hex
          );
        })
      ],
      userInfos: [
        ...[...Array(10)].map((item, index) => {
          return {
            vestingId0:
              data.results[`vestingId${index}0`].callsReturnContext[0]
                .returnValues[0],
            vestingId1:
              data.results[`vestingId${index}1`].callsReturnContext[0]
                .returnValues[0],
            claimableAmount0: data.results.userInfo.callsReturnContext[0]
              .returnValues[1][index]
              ? new BigNumber(
                  claimableRewardData.results[`claimableAmount${index}0`]
                    .callsReturnContext[0].returnValues[0]?.hex || 0
                )
              : new BigNumber(0),
            totalAmount0: new BigNumber(
              claimableRewardData.results[
                `vestingSchedule${index}0`
              ].callsReturnContext[0].returnValues[4].hex
            ),
            claimedAmount0: new BigNumber(
              claimableRewardData.results[
                `vestingSchedule${index}0`
              ].callsReturnContext[0].returnValues[5].hex
            ),
            claimableAmount1: data.results.userInfo.callsReturnContext[0]
              .returnValues[1][index]
              ? new BigNumber(
                  claimableRewardData.results[`claimableAmount${index}1`]
                    .callsReturnContext[0].returnValues[0]?.hex || 0
                )
              : new BigNumber(0),
            totalAmount1: new BigNumber(
              claimableRewardData.results[
                `vestingSchedule${index}1`
              ].callsReturnContext[0].returnValues[4].hex
            ),
            claimedAmount1: new BigNumber(
              claimableRewardData.results[
                `vestingSchedule${index}1`
              ].callsReturnContext[0].returnValues[5].hex
            ),
            harvest:
              data.results.userInfo.callsReturnContext[0].returnValues[1][index]
          };
        })
      ]
    });
  }, [web3, slowRefresh, calls, reload]);

  return userInfo;
};
