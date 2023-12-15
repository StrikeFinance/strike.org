import { useCallback } from 'react';
import { useSaleContract } from 'hooks/useContract';
import * as constants from 'utilities/constants';
import { methods } from 'utilities/ContractService';
import BigNumber from 'bignumber.js';
import moment from 'moment';
import { ASSET } from 'utilities/constants';

export const useSaleAction = (chainId, account) => {
  const saleContract = useSaleContract();

  const depositPool = useCallback(
    async (assetName, pid, amount, plan) => {
      if (account) {
        try {
          await methods.send(
            saleContract.methods.depositPool,
            [
              pid,
              constants.CONTRACT_ADDRESS[chainId][assetName],
              assetName === 'eth'
                ? '0'
                : new BigNumber(amount)
                    .times(
                      new BigNumber(10).pow(ASSET[chainId][assetName].decimal)
                    )
                    .toString(10),
              '0',
              plan,
              moment().unix() + 300
            ],
            account,
            assetName === 'eth'
              ? new BigNumber(amount).times(1e18).toString(10)
              : null
          );
        } catch (error) {
          console.log(error);
        }
      }
    },
    [saleContract, chainId]
  );

  const harvestPool = useCallback(
    async pid => {
      if (account) {
        try {
          await methods.send(saleContract.methods.harvestPool, [pid], account);
        } catch (error) {
          console.log(error);
        }
      }
    },
    [saleContract, chainId]
  );

  const releasePool = useCallback(
    async vestingId => {
      if (account) {
        try {
          await methods.send(
            saleContract.methods.release,
            [vestingId],
            account
          );
        } catch (error) {
          console.log(error);
        }
      }
    },
    [saleContract, chainId]
  );

  return { depositPool, harvestPool, releasePool };
};
