import React from 'react';
import { Progress } from 'antd';
import commaNumber from 'comma-number';
import BigNumber from 'bignumber.js';
import { Col, Row, Typography, Divider } from 'antd';
import './styles.scss';
import vector2 from 'assets/img/homepage/Vector2-b.png';
import vector3 from 'assets/img/homepage/Vector3-b.png';
import vector4 from 'assets/img/homepage/Vector4-b.png';

function Totalsupply(props) {
  const { markets, totalSupply, supplierCount, supplyVolume } = props;
  const format = commaNumber.bindWith(',', '.');
  return (
    <div className="total-supply">
      <Row className="total-supply-content">
        <Col
          xs={24}
          sm={24}
          md={10}
          lg={14}
          xl={14}
          className="total-supply-content__left"
        >
          <Typography className="title">Market</Typography>
          <Typography className="title-desciption">
            Supply collateral to Strike while controlling your keys
          </Typography>
          <Typography className="title-strike">
            Strike users control all of their digital assets on a non-custodial
            protocol while earning a variable rate based on market demands of
            that asset. Rates are earned per Ethereum block mined
          </Typography>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={10}
          lg={10}
          xl={10}
          className="total-supply-content__right"
        >
          <img src={vector3} className="vector3" />
          <div className="children-content">
            <Typography className="title-content">Total Suply</Typography>
            <Divider />
            <Typography className="money-supply">
              ${format(totalSupply)}
            </Typography>
            <Divider />
            <Typography className="top-markets">Top 3 Markets</Typography>
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
            <Divider />
            <div className="footer-content flex just-between">
              <div className="footer-content__left">
                <Typography className="footer-content__left__title">
                  24h Supply Volume
                </Typography>
                <Typography className="footer-content__number">{`$${format(
                  new BigNumber(supplyVolume).toFormat(2)
                )}`}</Typography>
              </div>
              <div className="footer-content__right">
                <Typography className="footer-content__right__title">
                  # of Suppliers
                </Typography>
                <Typography className="footer-content__right__number">
                  {supplierCount}
                </Typography>
              </div>
            </div>
          </div>
          <img src={vector2} className="vector2"/>
          <img src={vector4} className="vector4"/>
        </Col>
      </Row>
    </div>
  );
}

export default Totalsupply;
