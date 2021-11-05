import { Progress } from 'antd';
import BigNumber from 'bignumber.js';
import PropTypes from 'prop-types';
import React from 'react';
import './TotalSupply.scss';
import commaNumber from 'comma-number';
import { Col, Row } from 'antd';

const TotalSupply = ({ markets, totalSupply, supplierCount, supplyVolume }) => {
  const format = commaNumber.bindWith(',', '.');
  return (
    <div className="total-supply">
      <Row gutter={[40,100]}>
        <Col xs={24} sm={24} md={10} lg={14} xl={14}>
          <div className="left-text">
            <div>Market</div>
            <div>Supply collateral to Strike while controlling your keys</div>
            <span>
              Strike users control all of their digital assets on a
              non-custodial protocol while earning a variable rate based on
              market demands of that asset. Rates are earned per Ethereum block
              mined
            </span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={10} lg={10} xl={10}>
          <div className="table-total-supply">
            <h3>Total Supply</h3>
            <hr />
            <div className="money-market">${format(totalSupply)}</div>
            <hr />
            <p>Top 3 Markets</p>
            {markets.markets &&
              (markets.markets || [])
                .filter(
                  m =>
                    m.underlyingSymbol !== 'ZRX' && m.underlyingSymbol !== 'BAT'
                )
                .sort((a, b) => {
                  return +new BigNumber(b.totalSupplyUsd)
                    .minus(new BigNumber(a.totalSupplyUsd))
                    .toString(10);
                })
                .slice(0, 3)
                .map((item, key) => (
                  <div key={key}>
                    <div className="coin-info">
                      <div>{item.underlyingSymbol}</div>
                      <div>
                        {!new BigNumber(totalSupply).isZero()
                          ? new BigNumber(item.totalSupplyUsd)
                              .div(new BigNumber(totalSupply))
                              .times(100)
                              .dp(2, 1)
                              .toNumber()
                          : 0}
                      </div>
                    </div>
                    <Progress
                      percent={
                        !new BigNumber(totalSupply).isZero()
                          ? new BigNumber(item.totalSupplyUsd)
                              .div(new BigNumber(totalSupply))
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
            <div className="table-total-supply-footer">
              <div>
                <div className="footer-text">24h Supply Volume </div>
                <div className="footer-value">{`$${format(
                  new BigNumber(supplyVolume).toFormat(2)
                )}`}</div>
              </div>
              <div>
                <div className="footer-text">#of Suppliers</div>
                <div className="footer-value">{supplierCount}</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

TotalSupply.propTypes = {
  markets: PropTypes.object.isRequired
};

export default TotalSupply;
