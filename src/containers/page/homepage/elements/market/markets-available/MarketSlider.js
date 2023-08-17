import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Marquee from 'react-fast-marquee';
import BigNumber from 'bignumber.js';
import commaNumber from 'comma-number';
import { currencyFormatter, shortenNumberFormatter } from 'utilities/common';
import { useWindowResizeMobile } from 'utilities/hook';
import './MarketSlider.scss';

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
  XCN: xcnImg
};

const format = commaNumber.bindWith(',', '.');

const MarketSlider = ({ setCurrentMarket, markets, startIndex, speed }) => {
  const [isMobile] = useWindowResizeMobile(1025);
  const [currentAsset, setCurrentAsset] = useState('');

  return (
    <Marquee gradient={false} speed={speed} pauseOnHover>
      {markets
        .slice(startIndex)
        .concat(markets.slice(0, startIndex))
        .map((item, index) => (
          <div key={`market-card-${index}`}>
            {isMobile && currentAsset === item.underlyingSymbol ? (
              <div
                className="market-card-mobile"
                onMouseEnter={() => {
                  setCurrentAsset(item.underlyingSymbol);
                }}
                onMouseLeave={() => {
                  setCurrentAsset('');
                }}
              >
                <div>
                  <div className="asset-header">
                    <img src={ICONS[item.underlyingSymbol]} alt="asset" />
                    <div className="asset-name">{item.underlyingName}</div>
                  </div>

                  <div className="apy-area">
                    <div>
                      <div>Supply APY</div>
                      <div className="apy-item">
                        <div className="apy2">
                          {shortenNumberFormatter(
                            new BigNumber(item.supplyStrikeApy)
                              .dp(2, 1)
                              .toString(10)
                          )}
                          {`%`}
                        </div>
                        <div className="apy">
                          {shortenNumberFormatter(item.sAPY)}%
                        </div>
                      </div>
                    </div>

                    <div className="divider" />

                    <div>
                      <div>Borrow APY</div>
                      <div className="apy-item">
                        <div className="apy2">
                          {shortenNumberFormatter(
                            new BigNumber(item.borrowStrikeApy)
                              .dp(2, 1)
                              .toString(10)
                          )}
                          {`%`}
                        </div>
                        <div className="apy">
                          {shortenNumberFormatter(item.bAPY)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="divider2" />

                <div className="usd-area">
                  <div>
                    <div>Total Supply</div>
                    <div className="value1">
                      {currencyFormatter(item.totalSupplyUsd)}
                    </div>
                    <div className="value2">
                      {format(
                        new BigNumber(item.totalSupplyUsd)
                          .div(new BigNumber(item.tokenPrice))

                          .dp(0, 1)
                          .toString(10)
                      )}{' '}
                      {item.underlyingSymbol}
                    </div>
                  </div>

                  <div className="divider" />

                  <div>
                    <div>Borrow Supply</div>
                    <div className="value1">
                      {currencyFormatter(item.totalBorrowsUsd)}
                    </div>
                    <div className="value2">
                      {format(
                        new BigNumber(item.totalBorrowsUsd)
                          .div(new BigNumber(item.tokenPrice))
                          .dp(0, 1)
                          .toString(10)
                      )}{' '}
                      {item.underlyingSymbol}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="market-card"
                onMouseEnter={() => {
                  setCurrentMarket(item);
                  setCurrentAsset(item.underlyingSymbol);
                }}
                onMouseLeave={() => {
                  setCurrentMarket(null);
                  setCurrentAsset('');
                }}
              >
                <img src={ICONS[item.underlyingSymbol]} alt="asset" />
                <div className="right">
                  <div className="asset-name">{item.underlyingName}</div>
                  <div className="apy-area">
                    <div>
                      <div>Supply APY</div>
                      <div className="apy">
                        {shortenNumberFormatter(item.sAPY)}%
                      </div>
                    </div>

                    <div className="divider" />

                    <div>
                      <div>Borrow APY</div>
                      <div className="apy">
                        {shortenNumberFormatter(item.bAPY)}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
    </Marquee>
  );
};

MarketSlider.propTypes = {
  setCurrentMarket: PropTypes.func.isRequired,
  markets: PropTypes.arrayOf(PropTypes.object),
  startIndex: PropTypes.number,
  speed: PropTypes.number
};

MarketSlider.defaultProps = {
  markets: [],
  startIndex: 0,
  speed: 0
};

export default MarketSlider;
