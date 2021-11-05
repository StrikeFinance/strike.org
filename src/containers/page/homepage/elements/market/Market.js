import BigNumber from 'bignumber.js';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Borrow from './borrow/';
import './Market.scss';
// import TotalSupply from './total-supply/TotalSupply';
import TotalSupply from './total-supply';


const Market = ({ markets }) => {
  const [totalSupply, setTotalSupply] = useState('0');
  const [supplierCount, setSupplierCount] = useState(0);
  const [totalBorrow, setTotalBorrow] = useState('0');
  const [borrowerCount, setBorrowerCount] = useState(0);
  const [supplyVolume, setSupplyVolume] = useState(0);
  const [borrowVolume, setBorrowVolume] = useState(0);

  useEffect(() => {
    if (markets.markets) {
      const tempTS = (markets.markets || []).reduce((accumulator, market) => {
        return new BigNumber(accumulator).plus(
          new BigNumber(market.totalSupplyUsd)
        );
      }, 0);
      const tempSC = (markets.markets || []).reduce((accumulator, market) => {
        return accumulator + market.supplierCount;
      }, 0);
      const tempTB = (markets.markets || []).reduce((accumulator, market) => {
        return new BigNumber(accumulator).plus(
          new BigNumber(market.totalBorrowsUsd)
        );
      }, 0);
      const tempBC = (markets.markets || []).reduce((accumulator, market) => {
        return accumulator + market.borrowerCount;
      }, 0);
      setTotalSupply(tempTS.dp(2, 1).toString(10));
      setSupplierCount(tempSC);
      setTotalBorrow(tempTB.dp(2, 1).toString(10));
      setBorrowerCount(tempBC);
      setSupplyVolume(markets.marketVolumeLog ? markets.marketVolumeLog.totalSupplyUsd24h : 0);
      setBorrowVolume(markets.marketVolumeLog ? markets.marketVolumeLog.totalBorrowsUsd24h : 0);
    }
  }, [markets]);
  return (
    <div className="market-homepage" id="earn">
      <TotalSupply
        markets={markets}
        totalSupply={totalSupply}
        supplierCount={supplierCount}
        supplyVolume={supplyVolume}
      />
      <Borrow
        markets={markets}
        borrowVolume={borrowVolume}
        borrowerCount={borrowerCount}
        totalBorrow={totalBorrow}
      />
      {/* <MarketsAvailable /> */}
    </div>
  );
};

Market.propTypes = {
  markets: PropTypes.object.isRequired
};

export default compose(withRouter)(Market);
