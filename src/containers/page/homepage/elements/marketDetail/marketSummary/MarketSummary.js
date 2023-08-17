import React from 'react';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';
import commaNumber from 'comma-number';
import { currencyFormatter } from 'utilities/common';
import './MarketSummary.scss';

const format = commaNumber.bindWith(',', '.');

const MarketSummary = ({ marketInfo, currentAsset, decimal }) => {
  return (
    <div className="market-summary">
      <p className="title">Market Details</p>
      <hr />
      <div className="description">
        <p className="label">Price</p>
        <p className="value">
          {`$${new BigNumber(marketInfo.underlyingPrice || 0)
            .div(
              new BigNumber(10).pow(
                18 + 18 - parseInt(decimal.decimal[currentAsset].token, 10)
              )
            )
            .dp(8, 1)
            .toString(10)}`}
        </p>
      </div>
      <div className="description">
        <p className="label">Market Liquidity</p>
        <p className="value">
          {`${format(
            new BigNumber(marketInfo.cash || 0)
              .div(new BigNumber(10).pow(decimal.decimal[currentAsset].token))
              .dp(8, 1)
              .toString(10)
          )} ${marketInfo.underlyingSymbol || ''}`}
        </p>
      </div>
      <div className="description">
        <p className="label"># of Suppliers</p>
        <p className="value">{format(marketInfo.supplierCount)}</p>
      </div>
      <div className="description">
        <p className="label"># of Borrowers</p>
        <p className="value">{format(marketInfo.borrowerCount)}</p>
      </div>
      <div className="description">
        <p className="label">Borrow Cap</p>
        <p className="value">{currencyFormatter(marketInfo.totalBorrowsUsd)}</p>
      </div>
      <div className="description">
        <p className="label">Interest Paid/Day</p>
        <p className="value">
          $
          {format(
            new BigNumber(marketInfo.supplierDailyStrike)
              .plus(new BigNumber(marketInfo.borrowerDailyStrike))
              .div(new BigNumber(10).pow(18))
              .multipliedBy(marketInfo.tokenPrice)
              .dp(2, 1)
              .toString(10)
          )}
        </p>
      </div>
      <div className="description">
        <p className="label">Reserves</p>
        <p className="value">
          {`${new BigNumber(marketInfo.totalReserves || 0)
            .div(new BigNumber(10).pow(decimal.decimal[currentAsset].token))
            .dp(8, 1)
            .toString(10)} ${marketInfo.underlyingSymbol || ''}`}
        </p>
      </div>
      <div className="description">
        <p className="label">Reserve Factor</p>
        <p className="value">
          {`${new BigNumber(marketInfo.reserveFactor || 0)
            .div(new BigNumber(10).pow(18))
            .multipliedBy(100)
            .dp(8, 1)
            .toString(10)}%`}
        </p>
      </div>
      <div className="description">
        <p className="label">Collateral Factor</p>
        <p className="value">
          {`${new BigNumber(marketInfo.collateralFactor || 0)
            .div(new BigNumber(10).pow(18))
            .times(100)
            .dp(2, 1)
            .toString(10)}%`}
        </p>
      </div>
      <div className="description">
        <p className="label">Total Supply</p>
        <p className="value">{currencyFormatter(marketInfo.totalSupplyUsd)}</p>
      </div>
      <div className="description">
        <p className="label">Total Borrow</p>
        <p className="value">{currencyFormatter(marketInfo.totalBorrowsUsd)}</p>
      </div>
      <div className="description">
        <p className="label">v{marketInfo.underlyingSymbol} Minted</p>
        <p className="value">{format(marketInfo.totalSupply2)}</p>
      </div>
      <div className="description">
        <p className="label">Exchange Rate</p>
        <p className="value">
          {`1 ${marketInfo.underlyingSymbol || ''} = ${Number(
            new BigNumber(1)
              .div(
                new BigNumber(marketInfo.exchangeRate).div(
                  new BigNumber(10).pow(
                    18 +
                      +parseInt(
                        decimal.decimal[currentAsset || 'usdc'].token,
                        10
                      ) -
                      +parseInt(
                        decimal.decimal[currentAsset || 'usdc'].stoken,
                        10
                      )
                  )
                )
              )
              .toString(10)
          ).toFixed(6)} ${marketInfo.symbol || ''}`}
        </p>
      </div>
    </div>
  );
};

MarketSummary.propTypes = {
  marketInfo: PropTypes.object,
  currentAsset: PropTypes.object,
  decimal: PropTypes.number
};

MarketSummary.defaultProps = {
  marketInfo: null,
  currentAsset: null,
  decimal: 0
};

export default MarketSummary;
