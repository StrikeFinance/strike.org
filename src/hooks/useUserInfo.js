import { useState, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { methods } from 'utilities/ContractService';
import useRefresh from 'hooks/useRefresh';
import { useAsyncEffect } from 'hooks/useAsyncEffect';
import * as constants from 'utilities/constants';
import saleAbi from 'utilities/abis/sale.json';

const initUserInfo = [
  {
    vestingId0: '',
    vestingId1: '',
    totalAmount0: new BigNumber(0),
    claimedAmount0: new BigNumber(0),
    claimableAmount0: new BigNumber(0),
    totalAmount1: new BigNumber(0),
    claimedAmount1: new BigNumber(0),
    claimableAmount1: new BigNumber(0),
    harvest: false
  },
  {
    vestingId0: '',
    vestingId1: '',
    totalAmount0: new BigNumber(0),
    claimedAmount0: new BigNumber(0),
    claimableAmount0: new BigNumber(0),
    totalAmount1: new BigNumber(0),
    claimedAmount1: new BigNumber(0),
    claimableAmount1: new BigNumber(0),
    harvest: false
  },
  {
    vestingId0: '',
    vestingId1: '',
    totalAmount0: new BigNumber(0),
    claimedAmount0: new BigNumber(0),
    claimableAmount0: new BigNumber(0),
    totalAmount1: new BigNumber(0),
    claimedAmount1: new BigNumber(0),
    claimableAmount1: new BigNumber(0),
    harvest: false
  },
  {
    vestingId0: '',
    vestingId1: '',
    totalAmount0: new BigNumber(0),
    claimedAmount0: new BigNumber(0),
    claimableAmount0: new BigNumber(0),
    totalAmount1: new BigNumber(0),
    claimedAmount1: new BigNumber(0),
    claimableAmount1: new BigNumber(0),
    harvest: false
  },
  {
    vestingId0: '',
    vestingId1: '',
    totalAmount0: new BigNumber(0),
    claimedAmount0: new BigNumber(0),
    claimableAmount0: new BigNumber(0),
    totalAmount1: new BigNumber(0),
    claimedAmount1: new BigNumber(0),
    claimableAmount1: new BigNumber(0),
    harvest: false
  }
];

export const useUserInfo = (web3, chainId, account, reload) => {
  const { slowRefresh } = useRefresh();
  const [userInfo, setUserInfo] = useState({
    isWhitelisted: false,
    shortRewards: [
      new BigNumber(0),
      new BigNumber(0),
      new BigNumber(0),
      new BigNumber(0),
      new BigNumber(0)
    ],
    longRewards: [
      new BigNumber(0),
      new BigNumber(0),
      new BigNumber(0),
      new BigNumber(0),
      new BigNumber(0)
    ],
    userInfos: [...initUserInfo]
  });

  const calls = useMemo(() => {
    if (!account) return [];
    return [
      {
        reference: 'reward',
        contractAddress: constants.CONTRACT_ADDRESS[chainId]?.sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'viewUserOfferingAmountsForPools',
            methodParameters: [account, [0, 1, 2, 3, 4]]
          }
        ]
      },
      {
        reference: 'vestingId00',
        contractAddress: constants.CONTRACT_ADDRESS[chainId]?.sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'computeVestingScheduleIdForAddressAndPid',
            methodParameters: [account, 0, 0]
          }
        ]
      },
      {
        reference: 'vestingId01',
        contractAddress: constants.CONTRACT_ADDRESS[chainId]?.sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'computeVestingScheduleIdForAddressAndPid',
            methodParameters: [account, 0, 1]
          }
        ]
      },
      {
        reference: 'vestingId10',
        contractAddress: constants.CONTRACT_ADDRESS[chainId]?.sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'computeVestingScheduleIdForAddressAndPid',
            methodParameters: [account, 1, 0]
          }
        ]
      },
      {
        reference: 'vestingId11',
        contractAddress: constants.CONTRACT_ADDRESS[chainId]?.sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'computeVestingScheduleIdForAddressAndPid',
            methodParameters: [account, 1, 1]
          }
        ]
      },
      {
        reference: 'vestingId20',
        contractAddress: constants.CONTRACT_ADDRESS[chainId]?.sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'computeVestingScheduleIdForAddressAndPid',
            methodParameters: [account, 2, 0]
          }
        ]
      },
      {
        reference: 'vestingId21',
        contractAddress: constants.CONTRACT_ADDRESS[chainId]?.sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'computeVestingScheduleIdForAddressAndPid',
            methodParameters: [account, 2, 1]
          }
        ]
      },
      {
        reference: 'vestingId30',
        contractAddress: constants.CONTRACT_ADDRESS[chainId]?.sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'computeVestingScheduleIdForAddressAndPid',
            methodParameters: [account, 3, 0]
          }
        ]
      },
      {
        reference: 'vestingId31',
        contractAddress: constants.CONTRACT_ADDRESS[chainId]?.sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'computeVestingScheduleIdForAddressAndPid',
            methodParameters: [account, 3, 1]
          }
        ]
      },
      {
        reference: 'vestingId40',
        contractAddress: constants.CONTRACT_ADDRESS[chainId]?.sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'computeVestingScheduleIdForAddressAndPid',
            methodParameters: [account, 4, 0]
          }
        ]
      },
      {
        reference: 'vestingId41',
        contractAddress: constants.CONTRACT_ADDRESS[chainId]?.sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'computeVestingScheduleIdForAddressAndPid',
            methodParameters: [account, 4, 1]
          }
        ]
      },
      {
        reference: 'userInfo',
        contractAddress: constants.CONTRACT_ADDRESS[chainId]?.sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'viewUserInfo',
            methodParameters: [account, [0, 1, 2, 3, 4]]
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

    const vestingId00 =
      data.results.vestingId00.callsReturnContext[0].returnValues[0];
    const vestingId01 =
      data.results.vestingId01.callsReturnContext[0].returnValues[0];
    const vestingId10 =
      data.results.vestingId10.callsReturnContext[0].returnValues[0];
    const vestingId11 =
      data.results.vestingId11.callsReturnContext[0].returnValues[0];
    const vestingId20 =
      data.results.vestingId20.callsReturnContext[0].returnValues[0];
    const vestingId21 =
      data.results.vestingId21.callsReturnContext[0].returnValues[0];
    const vestingId30 =
      data.results.vestingId30.callsReturnContext[0].returnValues[0];
    const vestingId31 =
      data.results.vestingId31.callsReturnContext[0].returnValues[0];
    const vestingId40 =
      data.results.vestingId40.callsReturnContext[0].returnValues[0];
    const vestingId41 =
      data.results.vestingId41.callsReturnContext[0].returnValues[0];

    const harvest0 =
      data.results.userInfo.callsReturnContext[0].returnValues[1][0];
    const harvest1 =
      data.results.userInfo.callsReturnContext[0].returnValues[1][1];
    const harvest2 =
      data.results.userInfo.callsReturnContext[0].returnValues[1][2];
    const harvest3 =
      data.results.userInfo.callsReturnContext[0].returnValues[1][3];
    const harvest4 =
      data.results.userInfo.callsReturnContext[0].returnValues[1][4];

    const claimableRewardCalls = [
      {
        reference: 'vestingSchedule00',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'getVestingSchedule',
            methodParameters: [vestingId00]
          }
        ]
      },
      {
        reference: 'claimableAmount00',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'computeReleasableAmount',
            methodParameters: [vestingId00]
          }
        ]
      },
      {
        reference: 'vestingSchedule01',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'getVestingSchedule',
            methodParameters: [vestingId01]
          }
        ]
      },
      {
        reference: 'claimableAmount01',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'computeReleasableAmount',
            methodParameters: [vestingId01]
          }
        ]
      },
      {
        reference: 'vestingSchedule10',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'getVestingSchedule',
            methodParameters: [vestingId10]
          }
        ]
      },
      {
        reference: 'claimableAmount10',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'computeReleasableAmount',
            methodParameters: [vestingId10]
          }
        ]
      },
      {
        reference: 'vestingSchedule11',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'getVestingSchedule',
            methodParameters: [vestingId11]
          }
        ]
      },
      {
        reference: 'claimableAmount11',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'computeReleasableAmount',
            methodParameters: [vestingId11]
          }
        ]
      },
      {
        reference: 'vestingSchedule20',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'getVestingSchedule',
            methodParameters: [vestingId20]
          }
        ]
      },
      {
        reference: 'claimableAmount20',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'computeReleasableAmount',
            methodParameters: [vestingId20]
          }
        ]
      },
      {
        reference: 'vestingSchedule21',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'getVestingSchedule',
            methodParameters: [vestingId21]
          }
        ]
      },
      {
        reference: 'claimableAmount21',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'computeReleasableAmount',
            methodParameters: [vestingId21]
          }
        ]
      },
      {
        reference: 'vestingSchedule30',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'getVestingSchedule',
            methodParameters: [vestingId30]
          }
        ]
      },
      {
        reference: 'claimableAmount30',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'computeReleasableAmount',
            methodParameters: [vestingId30]
          }
        ]
      },
      {
        reference: 'vestingSchedule31',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'getVestingSchedule',
            methodParameters: [vestingId31]
          }
        ]
      },
      {
        reference: 'claimableAmount31',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'computeReleasableAmount',
            methodParameters: [vestingId31]
          }
        ]
      },
      {
        reference: 'vestingSchedule40',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'getVestingSchedule',
            methodParameters: [vestingId40]
          }
        ]
      },
      {
        reference: 'claimableAmount40',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'computeReleasableAmount',
            methodParameters: [vestingId40]
          }
        ]
      },
      {
        reference: 'vestingSchedule41',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'getVestingSchedule',
            methodParameters: [vestingId41]
          }
        ]
      },
      {
        reference: 'claimableAmount41',
        contractAddress: constants.CONTRACT_ADDRESS[chainId].sale,
        abi: saleAbi,
        calls: [
          {
            methodName: 'computeReleasableAmount',
            methodParameters: [vestingId41]
          }
        ]
      }
    ];
    const claimableRewardData = await methods.ethMulticall(
      web3,
      claimableRewardCalls
    );

    setUserInfo({
      isWhitelisted:
        data.results.isWhitelisted.callsReturnContext[0].returnValues[0],
      shortRewards: [
        new BigNumber(
          data.results.reward.callsReturnContext[0].returnValues[0][0].hex
        ),
        new BigNumber(
          data.results.reward.callsReturnContext[0].returnValues[1][0].hex
        ),
        new BigNumber(
          data.results.reward.callsReturnContext[0].returnValues[2][0].hex
        ),
        new BigNumber(
          data.results.reward.callsReturnContext[0].returnValues[3][0].hex
        ),
        new BigNumber(
          data.results.reward.callsReturnContext[0].returnValues[4][0].hex
        )
      ],
      longRewards: [
        new BigNumber(
          data.results.reward.callsReturnContext[0].returnValues[0][1].hex
        ),
        new BigNumber(
          data.results.reward.callsReturnContext[0].returnValues[1][1].hex
        ),
        new BigNumber(
          data.results.reward.callsReturnContext[0].returnValues[2][1].hex
        ),
        new BigNumber(
          data.results.reward.callsReturnContext[0].returnValues[3][1].hex
        ),
        new BigNumber(
          data.results.reward.callsReturnContext[0].returnValues[4][1].hex
        )
      ],
      userInfos: [
        {
          vestingId0: vestingId00,
          vestingId1: vestingId01,
          claimableAmount0: harvest0
            ? new BigNumber(
                claimableRewardData.results.claimableAmount00
                  .callsReturnContext[0].returnValues[0]?.hex || 0
              )
            : new BigNumber(0),
          totalAmount0: new BigNumber(
            claimableRewardData.results.vestingSchedule00.callsReturnContext[0].returnValues[4].hex
          ),
          claimedAmount0: new BigNumber(
            claimableRewardData.results.vestingSchedule00.callsReturnContext[0].returnValues[5].hex
          ),
          claimableAmount1: harvest0
            ? new BigNumber(
                claimableRewardData.results.claimableAmount01
                  .callsReturnContext[0].returnValues[0]?.hex || 0
              )
            : new BigNumber(0),
          totalAmount1: new BigNumber(
            claimableRewardData.results.vestingSchedule01.callsReturnContext[0].returnValues[4].hex
          ),
          claimedAmount1: new BigNumber(
            claimableRewardData.results.vestingSchedule01.callsReturnContext[0].returnValues[5].hex
          ),
          harvest: harvest0
        },
        {
          vestingId0: vestingId10,
          vestingId1: vestingId11,
          claimableAmount0: harvest1
            ? new BigNumber(
                claimableRewardData.results.claimableAmount10
                  .callsReturnContext[0].returnValues[0]?.hex || 0
              )
            : new BigNumber(0),
          totalAmount0: new BigNumber(
            claimableRewardData.results.vestingSchedule10.callsReturnContext[0].returnValues[4].hex
          ),
          claimedAmount0: new BigNumber(
            claimableRewardData.results.vestingSchedule10.callsReturnContext[0].returnValues[5].hex
          ),
          claimableAmount1: harvest1
            ? new BigNumber(
                claimableRewardData.results.claimableAmount11
                  .callsReturnContext[0].returnValues[0]?.hex || 0
              )
            : new BigNumber(0),
          totalAmount1: new BigNumber(
            claimableRewardData.results.vestingSchedule11.callsReturnContext[0].returnValues[4].hex
          ),
          claimedAmount1: new BigNumber(
            claimableRewardData.results.vestingSchedule11.callsReturnContext[0].returnValues[5].hex
          ),
          harvest: harvest1
        },
        {
          vestingId0: vestingId20,
          vestingId1: vestingId21,
          claimableAmount0: harvest2
            ? new BigNumber(
                claimableRewardData.results.claimableAmount20
                  .callsReturnContext[0].returnValues[0]?.hex || 0
              )
            : new BigNumber(0),
          totalAmount0: new BigNumber(
            claimableRewardData.results.vestingSchedule20.callsReturnContext[0].returnValues[4].hex
          ),
          claimedAmount0: new BigNumber(
            claimableRewardData.results.vestingSchedule20.callsReturnContext[0].returnValues[5].hex
          ),
          claimableAmount1: harvest2
            ? new BigNumber(
                claimableRewardData.results.claimableAmount21
                  .callsReturnContext[0].returnValues[0]?.hex || 0
              )
            : new BigNumber(0),
          totalAmount1: new BigNumber(
            claimableRewardData.results.vestingSchedule21.callsReturnContext[0].returnValues[4].hex
          ),
          claimedAmount1: new BigNumber(
            claimableRewardData.results.vestingSchedule21.callsReturnContext[0].returnValues[5].hex
          ),
          harvest: harvest2
        },
        {
          vestingId0: vestingId30,
          vestingId1: vestingId31,
          claimableAmount0: harvest3
            ? new BigNumber(
                claimableRewardData.results.claimableAmount30
                  .callsReturnContext[0].returnValues[0]?.hex || 0
              )
            : new BigNumber(0),
          totalAmount0: new BigNumber(
            claimableRewardData.results.vestingSchedule30.callsReturnContext[0].returnValues[4].hex
          ),
          claimedAmount0: new BigNumber(
            claimableRewardData.results.vestingSchedule30.callsReturnContext[0].returnValues[5].hex
          ),
          claimableAmount1: harvest3
            ? new BigNumber(
                claimableRewardData.results.claimableAmount31
                  .callsReturnContext[0].returnValues[0]?.hex || 0
              )
            : new BigNumber(0),
          totalAmount1: new BigNumber(
            claimableRewardData.results.vestingSchedule31.callsReturnContext[0].returnValues[4].hex
          ),
          claimedAmount1: new BigNumber(
            claimableRewardData.results.vestingSchedule31.callsReturnContext[0].returnValues[5].hex
          ),
          harvest: harvest3
        },
        {
          vestingId0: vestingId40,
          vestingId1: vestingId41,
          claimableAmount0: harvest4
            ? new BigNumber(
                claimableRewardData.results.claimableAmount40
                  .callsReturnContext[0].returnValues[0]?.hex || 0
              )
            : new BigNumber(0),
          totalAmount0: new BigNumber(
            claimableRewardData.results.vestingSchedule40.callsReturnContext[0].returnValues[4].hex
          ),
          claimedAmount0: new BigNumber(
            claimableRewardData.results.vestingSchedule40.callsReturnContext[0].returnValues[5].hex
          ),
          claimableAmount1: harvest4
            ? new BigNumber(
                claimableRewardData.results.claimableAmount41
                  .callsReturnContext[0].returnValues[0]?.hex || 0
              )
            : new BigNumber(0),
          totalAmount1: new BigNumber(
            claimableRewardData.results.vestingSchedule41.callsReturnContext[0].returnValues[4].hex
          ),
          claimedAmount1: new BigNumber(
            claimableRewardData.results.vestingSchedule41.callsReturnContext[0].returnValues[5].hex
          ),
          harvest: harvest4
        }
      ]
    });
  }, [web3, slowRefresh, calls, reload]);

  return userInfo;
};
