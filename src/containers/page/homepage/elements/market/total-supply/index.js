import React from 'react';
import { Progress, Typography } from 'antd';
import commaNumber from 'comma-number';
import BigNumber from 'bignumber.js';
import './styles.scss';

function Totalsupply(props) {
  const { markets, totalSupply, supplierCount, supplyVolume } = props;
  const format = commaNumber.bindWith(',', '.');
  return (
    <div className="total-supplys">
      <div className="total-supply-content">
        <div className="total-supply-content__left">
          {/* <Typography className="title">Market</Typography> */}
          <Typography className="title-desciption">
            Supply collateral to Strike while controlling your keys
          </Typography>
          <Typography className="title-strike">
            Strike users control all of their digital assets on a non-custodial
            protocol while earning a variable rate based on market demands of
            that asset. Rates are earned per Ethereum block mined
          </Typography>
        </div>
        <div className="total-supply-content__right">
          <div className="children-content">
            <Typography className="title-content">Total Supply</Typography>
            <Typography className="money-supply">
              ${format(totalSupply)}
            </Typography>
            <Typography className="top-markets">Top 3 Markets</Typography>
            {markets?.markets &&
              (markets?.markets || [])
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
                      <div className="coin-percent">
                        {!new BigNumber(totalSupply).isZero()
                          ? new BigNumber(item.totalSupplyUsd)
                              .div(new BigNumber(totalSupply))
                              .times(100)
                              .dp(2, 1)
                              .toNumber()
                          : 0}
                        %
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
            <div className="footer-content flex just-between">
              <div className="footer-content__left">
                <Typography className="footer-content__left__number">{`$${format(
                  new BigNumber(supplyVolume).toFormat(2)
                )}`}</Typography>
                <Typography className="footer-content__left__title">
                  24h Supply Volume
                </Typography>
              </div>
              <div className="footer-content__right">
                <Typography className="footer-content__right__number">
                  {supplierCount}
                </Typography>
                <Typography className="footer-content__right__title">
                  # of Suppliers
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Totalsupply;
