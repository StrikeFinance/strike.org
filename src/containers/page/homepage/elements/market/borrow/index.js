import React from 'react';
import PropTypes from 'prop-types';
import commaNumber from 'comma-number';
import BigNumber from 'bignumber.js';
import { Progress, Typography } from 'antd';
import './styles.scss';

function TotalBorrow(props) {
  const { markets, totalBorrow, borrowerCount, borrowVolume } = props;
  const format = commaNumber.bindWith(',', '.');
  return (
    <div className="total-borrows">
      <div className="total-borrow-content">
        <div className="total-borrow-content__left">
          {/* <Typography className="title">Market</Typography> */}
          <Typography className="title-desciption">
            Access Liquidity from Strike on-demand on any asset
          </Typography>
          <Typography className="title-strike">
            With the Strike protocols decentralized nature, users and developers
            can access liquidity on-demand from their supplied collateral
          </Typography>
        </div>
        <div className="total-borrow-content__right">
          <div className="children-content">
            <Typography className="title-content">Total Borrow</Typography>
            <Typography className="money-borrow">
              ${format(totalBorrow)}
            </Typography>
            <Typography className="top-markets">Top 3 Markets</Typography>
            {markets.markets &&
              (markets.markets || [])
                .filter(
                  m =>
                    m.underlyingSymbol !== 'ZRX' && m.underlyingSymbol !== 'BAT'
                )
                .sort((a, b) => {
                  return +new BigNumber(b.totalBorrowsUsd)
                    .minus(new BigNumber(a.totalBorrowsUsd))
                    .toString(10);
                })
                .slice(0, 3)
                .map((item, key) => (
                  <div key={key}>
                    <div className="coin-info">
                      <div>{item.underlyingSymbol}</div>
                      <div className="coin-percent">
                        {!new BigNumber(totalBorrow).isZero()
                          ? new BigNumber(item.totalBorrowsUsd)
                              .div(new BigNumber(totalBorrow))
                              .times(100)
                              .dp(2, 1)
                              .toNumber()
                          : 0}
                        %
                      </div>
                    </div>
                    <Progress
                      percent={
                        !new BigNumber(totalBorrow).isZero()
                          ? new BigNumber(item.totalBorrowsUsd)
                              .div(new BigNumber(totalBorrow))
                              .times(100)
                              .dp(2, 1)
                              .toNumber()
                          : 0
                      }
                      showInfo={false}
                    />
                  </div>
                ))}
            <div className="footer-content flex just-between">
              <div className="footer-content__left">
                <Typography className="footer-content__left__number">
                  {`$${format(new BigNumber(borrowVolume).toFormat(2))}`}
                </Typography>
                <Typography className="footer-content__left__title">
                  24h Borrow Volume
                </Typography>
              </div>
              <div className="footer-content__right">
                <Typography className="footer-content__right__number">
                  {borrowerCount}
                </Typography>
                <Typography className="footer-content__right__title">
                  # of Borrowers
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TotalBorrow.propTypes = {
  markets: PropTypes.object,
  totalBorrow: PropTypes.string,
  borrowerCount: PropTypes.number,
  borrowVolume: PropTypes.string
};

TotalBorrow.defaultProps = {
  markets: null,
  totalBorrow: '',
  borrowerCount: 0,
  borrowVolume: ''
};

export default TotalBorrow;
