import { useState } from 'react';
import axios from 'axios';
import * as constants from 'utilities/constants';
import useRefresh from 'hooks/useRefresh';
import { useAsyncEffect } from 'hooks/useAsyncEffect';
import { CHAIN_IDS } from 'connectors';

export const useSoldInfo = (round, reload) => {
  const { mediumRefresh } = useRefresh();
  const [totalSold, setTotalSold] = useState({
    usdAmount: 0,
    strkAmount: 0
  });
  const [roundSold, setRoundSold] = useState({
    usdAmount: 0,
    strkAmount: 0,
    offeringAmount: 0
  });

  useAsyncEffect(async () => {
    try {
      if (round < 0) return;
      const totalData0 = await axios.post(
        constants.SUBGRAPH_API_URL[CHAIN_IDS[0]],
        {
          query: `{
            saleStats {
              usdAmount
              soldAmount
              }
            }`
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const roundData0 = await axios.post(
        constants.SUBGRAPH_API_URL[CHAIN_IDS[0]],
        {
          query: `{
            poolInfos(where:{pid: ${round}})  {
              usdAmount
              soldAmount
              offeringAmount
              }
            }`
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      setTotalSold({
        usdAmount: Number(totalData0.data.data.saleStats[0].usdAmount),
        strkAmount: Number(totalData0.data.data.saleStats[0].soldAmount)
      });

      setRoundSold({
        usdAmount: Number(roundData0.data.data.poolInfos[0]?.usdAmount),
        strkAmount: Number(roundData0.data.data.poolInfos[0]?.soldAmount),
        offeringAmount: Number(
          roundData0.data.data.poolInfos[0]?.offeringAmount
        )
      });
    } catch (error) {
      console.log(error);
    }
  }, [reload, round, mediumRefresh]);

  return { totalSold, roundSold };
};
