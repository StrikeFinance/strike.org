import { useCallback, useState } from 'react';
import BigNumber from 'bignumber.js';
import { useTokenContract } from 'hooks/useContract';
import * as constants from 'utilities/constants';
import { methods } from 'utilities/ContractService';
import useRefresh from 'hooks/useRefresh';
import { useAsyncEffect } from 'hooks/useAsyncEffect';

export const useTokenApproval = (chainId, account, assetName, reload) => {
  const { slowRefresh } = useRefresh();
  const tokenContract = useTokenContract(assetName);
  const [allowance, setAllowance] = useState(new BigNumber(0));

  useAsyncEffect(async () => {
    if (account && assetName !== 'eth') {
      try {
        const result = new BigNumber(
          await methods.call(tokenContract.methods.allowance, [
            account,
            constants.CONTRACT_ADDRESS[chainId].sale
          ])
        );
        setAllowance(result);
      } catch (error) {
        console.log(error);
      }
    }
  }, [tokenContract, assetName, account, chainId, slowRefresh, reload]);

  const approveToken = useCallback(
    async amount => {
      if (account) {
        try {
          await methods.send(
            tokenContract.methods.approve,
            [constants.CONTRACT_ADDRESS[chainId].sale, amount],
            account
          );
          return true;
        } catch (error) {
          console.log(error);
        }
      }
      return false;
    },
    [tokenContract, chainId, account]
  );

  return { allowance, approveToken };
};
