import React from 'react';
import './MarketInfo.scss';
import * as constants from 'utilities/constants';
import BigNumber from 'bignumber.js';
import commaNumber from 'comma-number';

const format = commaNumber.bindWith(',', '.');
const MarketInfo = ({ marketInfo, marketType }) => {
  if (!marketInfo.underlyingSymbol) return null;
  return (
    <div className="market-info">
      <div className="row1">
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
        <span className="symbol-name">{marketInfo.underlyingSymbol}</span>
      </div>
      <div className="row2">
        <div className="net-rate">
          <div className="label">Net Rate</div>
          <div className="value">
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
          </div>
        </div>
        <div className="supply-apy">
          <div className="label">Supply APY</div>
          <div className="value">
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
          </div>
        </div>
        <div className="distribution-apy">
          <div className="label">Distribution APY</div>
          <div className="value">
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
          </div>
        </div>
        <div className="">
          <div className="label">Total Supply</div>
          <div className="value">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketInfo;
