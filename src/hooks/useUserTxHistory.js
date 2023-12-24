import { useState } from 'react';
import axios from 'axios';
import * as constants from 'utilities/constants';
import useRefresh from 'hooks/useRefresh';
import { useAsyncEffect } from 'hooks/useAsyncEffect';
import { CHAIN_IDS } from 'connectors';
import { CHAINS } from 'chain';
import { getReadableNumber } from 'utilities/common';
import { getAssetDecimal, getAssetName } from 'utilities/constants';

export const useUserTxHistory = account => {
  const { slowRefresh } = useRefresh();
  const [txHistory, setTxHistory] = useState([]);

  useAsyncEffect(async () => {
    try {
      if (!account) return;
      const ethTxHistoryData = await axios.post(
        constants.SUBGRAPH_API_URL[CHAIN_IDS[0]],
        {
          query: `{
            users(where: {id: "${account.toLowerCase()}"}) {
              deposits {
                pid
                plan
                token
                amount
                boughtAmount
                transactionHash
                blockTimestamp
              }
              harvests {
                pid
                plan
                offeringAmount
                transactionHash
                blockTimestamp
              }
              releases {
                amount
                transactionHash
                blockTimestamp
              }
            }
          }`
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const ethTxHistory = [];
      if (ethTxHistoryData.data.data.users.length > 0) {
        (ethTxHistoryData.data.data.users[0].deposits || []).forEach(item => {
          ethTxHistory.push({
            ...item,
            chain: process.env.REACT_APP_ENV === 'prod' ? 'Ethereum' : 'Goerli',
            plan: Number(item.plan) === 0 ? 'Vesting 1' : 'Vesting 2',
            txHash: `${CHAINS[CHAIN_IDS[0]].blockExplorerUrls}tx/${
              item.transactionHash
            }`,
            amount: getReadableNumber(
              item.amount,
              getAssetDecimal(item.token, CHAIN_IDS[0])
            ),
            asset: getAssetName(item.token, CHAIN_IDS[0]),
            boughtAmount: getReadableNumber(item.boughtAmount, 36),
            date: new Date(item.blockTimestamp * 1000).toLocaleString('en', {
              year: 'numeric',
              month: '2-digit',
              day: 'numeric'
            })
          });
        });

        (ethTxHistoryData.data.data.users[0].harvests || []).forEach(item => {
          ethTxHistory.push({
            ...item,
            chain: process.env.REACT_APP_ENV === 'prod' ? 'Ethereum' : 'Goerli',
            plan: Number(item.plan) === 0 ? 'Vesting 1' : 'Vesting 2',
            txHash: `${CHAINS[CHAIN_IDS[0]].blockExplorerUrls}tx/${
              item.transactionHash
            }`,
            boughtAmount: getReadableNumber(item.offeringAmount, 18),
            date: new Date(item.blockTimestamp * 1000).toLocaleString('en', {
              year: 'numeric',
              month: '2-digit',
              day: 'numeric'
            })
          });
        });

        (ethTxHistoryData.data.data.users[0].releases || []).forEach(item => {
          ethTxHistory.push({
            ...item,
            amount: '',
            chain: process.env.REACT_APP_ENV === 'prod' ? 'Ethereum' : 'Goerli',
            txHash: `${CHAINS[CHAIN_IDS[0]].blockExplorerUrls}tx/${
              item.transactionHash
            }`,
            boughtAmount: getReadableNumber(item.amount, 18),
            date: new Date(item.blockTimestamp * 1000).toLocaleString('en', {
              year: 'numeric',
              month: '2-digit',
              day: 'numeric'
            })
          });
        });
      }

      const allTxHistory = [...ethTxHistory];
      allTxHistory.sort(function(a, b) {
        if (a.blockTimestamp < b.blockTimestamp) return -1;
        if (a.blockTimestamp > b.blockTimestamp) return 1;
        return 0;
      });

      setTxHistory([...allTxHistory]);
    } catch (error) {
      console.log(error);
    }
  }, [account, slowRefresh]);

  return [...txHistory];
};
