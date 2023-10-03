import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { BigNumber } from 'bignumber.js';
import commaNumber from 'comma-number';
import { accountActionCreators, connectAccount } from 'core';
import { promisify } from 'utilities';
import { currencyFormatter, shortenNumberFormatter } from 'utilities/common';
import { useWindowResizeMobile } from 'utilities/hook';
import ethImg from 'assets/img/eth.png';
import wbtcImg from 'assets/img/wbtc.png';
import usdcImg from 'assets/img/usdc.png';
import busdImg from 'assets/img/busd.png';
import compImg from 'assets/img/comp.png';
import linkImg from 'assets/img/link.png';
import strkImg from 'assets/img/strk.png';
import uniImg from 'assets/img/uni.png';
import usdtImg from 'assets/img/usdt.png';
import sxpImg from 'assets/img/sxp.png';
import apeImg from 'assets/img/ape.png';
import ustImg from 'assets/img/ust.png';
import daiImg from 'assets/img/dai.png';
import xcnImg from 'assets/img/xcn.png';
import wstethImg from 'assets/img/wsteth.png';
import MarketSlider from './MarketSlider';
import './MarketsAvailable.scss';

const format = commaNumber.bindWith(',', '.');
const ICONS = {
  UNI: uniImg,
  ETH: ethImg,
  USDT: usdtImg,
  USDC: usdcImg,
  LINK: linkImg,
  BUSD: busdImg,
  COMP: compImg,
  WBTC: wbtcImg,
  STRK: strkImg,
  SXP: sxpImg,
  APE: apeImg,
  UST: ustImg,
  DAI: daiImg,
  XCN: xcnImg,
  wstETH: wstethImg
};

function MarketsAvailable({ getGovernanceStrikeWithParam }) {
  const [isMobile] = useWindowResizeMobile(1025);
  const [markets, setMarkets] = useState([]);
  const [currentMarket, setCurrentMarket] = useState(null);

  const getMarkets = async () => {
    const res = await promisify(getGovernanceStrikeWithParam, {
      offset: 0,
      limit: 30
    });
    const data = res?.data.markets
      .filter(m => m.underlyingSymbol !== 'ZRX' && m.underlyingSymbol !== 'BAT')
      .map(market => {
        return {
          ...market,
          sAPY: new BigNumber(market.supplyApy)
            .plus(new BigNumber(market.supplyStrikeApy))
            .dp(2, 1)
            .toNumber(),
          bAPY: new BigNumber(market.borrowStrikeApy)
            .minus(new BigNumber(market.borrowApy))
            .dp(2, 1)
            .toNumber()
        };
      })
      .sort((a, b) => {
        return new BigNumber(b.totalSupplyUsd)
          .minus(new BigNumber(a.totalSupplyUsd))
          .toNumber();
      });
    setMarkets(data);
  };

  useEffect(() => {
    getMarkets();
  }, []);

  return (
    <div className="markets-available">
      <div className="slider-animation">
        <div className="slider">
          <span className="slider-text">THE FLOW</span>
          <span className="slider-text">THE FLOW</span>
          <span className="slider-text">THE FLOW</span>
          <span className="slider-text">THE FLOW</span>
          <span className="slider-text">THE FLOW</span>
          <span className="slider-text">THE FLOW</span>
        </div>
        <div className="slider">
          <span className="slider-text">THE FLOW</span>
          <span className="slider-text">THE FLOW</span>
          <span className="slider-text">THE FLOW</span>
          <span className="slider-text">THE FLOW</span>
          <span className="slider-text">THE FLOW</span>
          <span className="slider-text">THE FLOW</span>
        </div>
      </div>
      <div className="markets-available-content">
        <div className="title">{markets?.length} Markets Available</div>
        <div className="markets-slider-area">
          <MarketSlider
            setCurrentMarket={setCurrentMarket}
            markets={markets}
            startIndex={0}
            speed={80}
          />
          <MarketSlider
            setCurrentMarket={setCurrentMarket}
            markets={markets}
            startIndex={9}
            speed={50}
          />
          <MarketSlider
            setCurrentMarket={setCurrentMarket}
            markets={markets}
            startIndex={6}
            speed={100}
          />
          {currentMarket && !isMobile && (
            <div
              className="market-detail"
              onMouseEnter={() => setCurrentMarket(currentMarket)}
              onMouseLeave={() => setCurrentMarket(null)}
            >
              <div className="market-title">Market</div>
              <div className="market-header">
                <img src={ICONS[currentMarket.underlyingSymbol]} alt="asset" />
                <div>
                  <div className="market-name">
                    {currentMarket.underlyingName}
                  </div>
                  <div className="market-symbol">
                    {currentMarket.underlyingSymbol}
                  </div>
                </div>
              </div>

              <div className="divider1" />

              <div className="item">
                <div className="label">Total Supply</div>
                <div>
                  <div className="value yellow">
                    {currencyFormatter(currentMarket.totalSupplyUsd)}
                  </div>
                  <div className="value">
                    {format(
                      new BigNumber(currentMarket.totalSupplyUsd)
                        .div(new BigNumber(currentMarket.tokenPrice))

                        .dp(0, 1)
                        .toString(10)
                    )}{' '}
                    {currentMarket.underlyingSymbol}
                  </div>
                </div>
              </div>

              <div className="divider2" />

              <div className="item">
                <div className="label">Supply APY</div>
                <div>
                  <div className="value green">
                    {shortenNumberFormatter(currentMarket.sAPY)}%
                  </div>
                  <div className="value">
                    {shortenNumberFormatter(
                      new BigNumber(currentMarket.supplyStrikeApy)
                        .dp(2, 1)
                        .toString(10)
                    )}
                    {`%`}
                  </div>
                </div>
              </div>

              <div className="divider2" />

              <div className="item">
                <div className="label">Total Borrow</div>
                <div>
                  <div className="value yellow">
                    {currencyFormatter(currentMarket.totalBorrowsUsd)}
                  </div>
                  <div className="value">
                    {format(
                      new BigNumber(currentMarket.totalBorrowsUsd)
                        .div(new BigNumber(currentMarket.tokenPrice))
                        .dp(0, 1)
                        .toString(10)
                    )}{' '}
                    {currentMarket.underlyingSymbol}
                  </div>
                </div>
              </div>

              <div className="divider2" />

              <div className="item">
                <div className="label">Borrow APY</div>
                <div>
                  <div className="value green">
                    {shortenNumberFormatter(currentMarket.bAPY)}%
                  </div>
                  <div className="value">
                    {shortenNumberFormatter(
                      new BigNumber(currentMarket.borrowStrikeApy)
                        .dp(2, 1)
                        .toString(10)
                    )}
                    {`%`}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
const mapDispatchToProps = dispatch => {
  const {
    getGovernanceStrike,
    getDecimals,
    getInterateModel,
    getGovernance,
    getGovernanceStrikeWithParam
  } = accountActionCreators;

  return bindActionCreators(
    {
      getGovernanceStrike,
      getInterateModel,
      getDecimals,
      getGovernance,
      getGovernanceStrikeWithParam
    },
    dispatch
  );
};
MarketsAvailable.propTypes = {
  getGovernanceStrikeWithParam: PropTypes.func.isRequired
};

MarketsAvailable.defaultProps = {};
export default compose(
  withRouter,
  connectAccount(null, mapDispatchToProps)
)(MarketsAvailable);
