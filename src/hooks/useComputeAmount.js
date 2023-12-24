/* eslint-disable consistent-return */
import { useCallback } from 'react';
import { useSaleContract } from 'hooks/useContract';
import * as constants from 'utilities/constants';
import { methods } from 'utilities/ContractService';
import useRefresh from 'hooks/useRefresh';
import BigNumber from 'bignumber.js';
import { ASSET } from 'utilities/constants';

export const useComputeAmount = chainId => {
  const { slowRefresh } = useRefresh();
  const saleContract = useSaleContract();

  const getComputeAmount = useCallback(
    async (assetName, amount, pid, vestingPlan) => {
      if (!amount) return '';
      if (new BigNumber(amount).eq(0)) return '0';
      try {
        const result = await methods.call(saleContract.methods.computeAmounts, [
          constants.CONTRACT_ADDRESS[chainId][assetName],
          new BigNumber(amount)
            .times(new BigNumber(10).pow(ASSET[chainId][assetName].decimal))
            .toString(10),
          pid,
          vestingPlan
        ]);
        return new BigNumber(result[1])
          .div(1e36)
          .dp(2, 1)
          .toString(10);
      } catch (error) {
        console.log(error);
      }
    },
    [saleContract, chainId, slowRefresh]
  );

  return { getComputeAmount };
};
