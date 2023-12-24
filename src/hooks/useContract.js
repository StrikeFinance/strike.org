import { useWeb3, useActiveWeb3React } from 'hooks';
import { useMemo } from 'react';
import { getTokenContract, getSaleContract } from 'utilities/ContractService';

export const useTokenContract = assetName => {
  const { chainId } = useActiveWeb3React();
  const web3 = useWeb3();

  return useMemo(() => {
    return getTokenContract(web3, assetName, chainId);
  }, [web3, chainId, assetName]);
};

export const useSaleContract = () => {
  const { chainId, requiredChainId } = useActiveWeb3React();
  const web3 = useWeb3();

  return useMemo(() => {
    return getSaleContract(web3, chainId || requiredChainId);
  }, [web3, chainId]);
};
