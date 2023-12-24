import { useState } from 'react';
import { methods, getTokenContract } from 'utilities/ContractService';
import { useAsyncEffect } from 'hooks/useAsyncEffect';
import { useWeb3 } from 'hooks';
import BigNumber from 'bignumber.js';

export const useTokenBalance = (chainId, account, assetName, reload) => {
  const web3 = useWeb3();
  const [balance, setBalance] = useState(new BigNumber(0));

  useAsyncEffect(async () => {
    setBalance(0);
    if (account) {
      try {
        let result = new BigNumber(0);
        if (assetName === 'eth') {
          result = new BigNumber(await web3.eth.getBalance(account));
        } else {
          const tokenContract = getTokenContract(web3, assetName, chainId);
          result = new BigNumber(
            await methods.call(tokenContract.methods.balanceOf, [account])
          );
        }
        setBalance(result);
      } catch (error) {
        console.log(error);
      }
    }
  }, [assetName, account, chainId, web3, reload]);

  return balance;
};
