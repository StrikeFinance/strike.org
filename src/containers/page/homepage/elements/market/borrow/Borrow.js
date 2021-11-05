import { Progress } from 'antd';
import React from 'react';
import './Borrow.scss';
import commaNumber from 'comma-number';
import BigNumber from 'bignumber.js';
import { Col, Row } from 'antd';

const Borrow = ({ markets, totalBorrow, borrowerCount, borrowVolume }) => {
  const format = commaNumber.bindWith(',', '.');
  return (
    <div className="total-borrows">
      <Row gutter={[40,100]}>
        <Col xs={24} sm={24} md={10} lg={14} xl={14}>
          <div className="table-total-borrows">
            <h3>Total Borrow</h3>
            <hr />
            <div className="money-market">${format(totalBorrow)}</div>
            <hr />
            <p>Top 3 Markets</p>
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
                      <div>
                        {!new BigNumber(totalBorrow).isZero()
                          ? new BigNumber(item.totalBorrowsUsd)
                              .div(new BigNumber(totalBorrow))
                              .times(100)
                              .dp(2, 1)
                              .toNumber()
                          : 0}
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
            <hr />
            <div className="table-total-borrows-footer">
              <div>
                <div className="footer-text">24h Borrow Volume </div>
                <div className="footer-value">{`$${format(
                  new BigNumber(borrowVolume).toFormat(2)
                )}`}</div>
              </div>
              <div>
                <div className="footer-text">#of Borrowers</div>
                <div className="footer-value">{borrowerCount}</div>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={10} lg={10} xl={10}>
          <div className="right-text">
            <div>Market</div>
            <div>Access Liquidity from Strike on-demand on any asset</div>
            <span>
              With the Strike protocols decentralized nature, users and
              developers can access liquidity on-demand from their supplied
              collateral
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Borrow;
