import React from 'react';
import './MarketInfo.scss';
import * as constants from 'utilities/constants';
import BigNumber from 'bignumber.js';
import commaNumber from 'comma-number';

const format = commaNumber.bindWith(',', '.');
const MarketInfo = ({ marketInfo, marketType }) => {
  console.log('MARKET INFO: ', marketInfo, marketType);
  return (
    <>
      <div className="market-info">
        <img
          className="asset-img"
          src={
            constants.CONTRACT_TOKEN_ADDRESS[
              marketInfo.underlyingSymbol.toLowerCase()
            ]
              ? constants.CONTRACT_TOKEN_ADDRESS[
                  marketInfo.underlyingSymbol.toLowerCase()
                ].asset
              : null
          }
          alt="asset"
        />
        <span className="stoken-text">{marketInfo.underlyingSymbol}</span>
      </div>
      <div className="">
        <div className="net-rate">
          <p className="label">Net Rate</p>
          <p className="value">
            {marketType === 'supply'
              ? new BigNumber(
                  +marketInfo.supplyApy < 0.01 ? 0.01 : marketInfo.supplyApy
                )
                  .plus(
                    new BigNumber(
                      +marketInfo.supplyStrikeApy < 0.01
                        ? 0.01
                        : marketInfo.supplyStrikeApy
                    )
                  )
                  .dp(2, 1)
                  .toString(10)
              : new BigNumber(
                  +marketInfo.borrowApy < 0.01 ? 0.01 : marketInfo.borrowApy
                )
                  .plus(
                    new BigNumber(
                      marketInfo.borrowStrikeApy < 0.01
                        ? 0.01
                        : marketInfo.borrowStrikeApy
                    )
                  )
                  .dp(2, 1)
                  .toString(10)}
            %
          </p>
        </div>
        <div className="supply-apy">
          <p className="label right">Supply APY</p>
          <p className="value right">
            {marketType === 'supply'
              ? new BigNumber(
                  +marketInfo.supplyApy < 0.01 ? 0.01 : marketInfo.supplyApy
                )
                  .dp(2, 1)
                  .toString(10)
              : new BigNumber(
                  +marketInfo.borrowApy < 0.01 ? 0.01 : marketInfo.borrowApy
                )
                  .dp(2, 1)
                  .toString(10)}
            %
          </p>
        </div>
        <div className="distribution-apy">
          <p className="label">Distribution APY</p>
          <p className="value">
            {marketType === 'supply'
              ? new BigNumber(
                  +marketInfo.supplyStrikeApy < 0.01
                    ? 0.01
                    : marketInfo.supplyStrikeApy
                )
                  .dp(2, 1)
                  .toString(10)
              : new BigNumber(
                  marketInfo.borrowStrikeApy < 0.01
                    ? 0.01
                    : marketInfo.borrowStrikeApy
                )
                  .dp(2, 1)
                  .toString(10)}
            %
          </p>
        </div>
        <div className="total-supply">
          <p className="label right">Total Supply</p>
          <p className="value right">
            $
            {format(
              new BigNumber(
                marketType === 'supply'
                  ? marketInfo.totalSupplyUsd
                  : marketInfo.totalBorrowsUsd
              )
                .dp(2, 1)
                .toString(10)
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default MarketInfo;
