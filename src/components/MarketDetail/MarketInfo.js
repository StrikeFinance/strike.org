import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import commaNumber from 'comma-number';
import * as constants from 'utilities/constants';

const MarketInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  .asset-img {
    width: 80px;
    height: 80px;
    margin-bottom: 14px;
  }
  .icon-stoken-name,
  .stoken-info {
    display: flex;
    width: 50%;
  }
  .icon-stoken-name {
    .stoken-text {
      font-size: 25px;
      font-weight: 800;
      margin-left: 15px;
      color: #000000;
    }
  }
  .stoken-info {
    justify-content: space-between;
    .label {
      font-size: 14px;
      font-weight: 500;
      color: #9d9fa7;
    }
    .value {
      color: #0b0f23;
      font-size: 20px;
      font-weight: 800;
    }
  }

  .symbol-name {
    width: 80px;
    font-size: 20px;
    font-weight: 900;
    color: var(--color-text-main);
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
    display: inline-block;
    .stoken-info {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }
`;

const format = commaNumber.bindWith(',', '.');

function MarketInfo({ marketInfo, marketType }) {
  if (!marketInfo.underlyingSymbol) return null;

  return (
    <MarketInfoWrapper>
      <div className="icon-stoken-name">
        <div>
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
      </div>
      <div className="stoken-info">
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
    </MarketInfoWrapper>
  );
}

MarketInfo.propTypes = {
  marketInfo: PropTypes.object,
  marketType: PropTypes.string
};

MarketInfo.defaultProps = {
  marketInfo: {},
  marketType: 'supply'
};
export default compose(withRouter)(MarketInfo);
