/* eslint-disable no-unused-vars */
import { useState } from 'react';
import useRefresh from 'hooks/useRefresh';
import { useAsyncEffect } from 'hooks/useAsyncEffect';
import { restService } from 'utilities';

export const useRewardData = () => {
  const numberFormat = Intl.NumberFormat('en-US');

  const { slowRefresh } = useRefresh();
  const [totalReserve, setTotalReserve] = useState(0);
  const [reserveApy, setReserveApy] = useState(0);

  useAsyncEffect(async () => {
    const data = await restService({
      api: '/prime',
      method: 'GET',
      params: {}
    });

    setTotalReserve(data.data.data.totalReservesUsd);

    setReserveApy(
      ((Number(data.data.data.totalReservesUsd) * 12 * 100) /
        Number(data.data.data.totalLockedUsd) +
        Number(data.data.data.baseApr) * 100) *
        2
    );
  }, [slowRefresh]);

  return {
    totalReserveReward: numberFormat.format(totalReserve),
    reserveApy: reserveApy.toFixed(1)
  };
};
