import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
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
          <h1 className="title-desciption">
            <FormattedMessage id="Section_2" />
          </h1>
          <Typography className="title-strike">
            <FormattedMessage id="Section_2_desc" />
          </Typography>
        </div>
        <div className="total-supply-content__right">
          <div className="children-content">
            <Typography className="title-content">
              <FormattedMessage id="Total_Supply" />
            </Typography>
            <Typography className="money-supply">
              ${format(totalSupply)}
            </Typography>
            <Typography className="top-markets">
              <FormattedMessage id="Top_3_Markets" />
            </Typography>
            {markets?.markets &&
              (markets?.markets || [])
                .filter(m => m.deprecated === false)
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
                <Typography className="footer-content__left__number">
                  {`$${format(new BigNumber(supplyVolume).toFormat(2))}`}
                </Typography>
                <Typography className="footer-content__left__title">
                  <FormattedMessage id="24h_Supply_Volume" />
                </Typography>
              </div>
              <div className="footer-content__right">
                <Typography className="footer-content__right__number">
                  {supplierCount}
                </Typography>
                <Typography className="footer-content__right__title">
                  <FormattedMessage id="of_Suppliers" />
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Totalsupply.propTypes = {
  markets: PropTypes.object,
  totalSupply: PropTypes.string,
  supplierCount: PropTypes.number,
  supplyVolume: PropTypes.string
};

Totalsupply.defaultProps = {
  markets: null,
  totalSupply: '',
  supplierCount: 0,
  supplyVolume: ''
};

export default Totalsupply;
