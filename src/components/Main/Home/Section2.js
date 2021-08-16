import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { BigNumber } from 'bignumber.js';
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

import bg1Img from 'assets/img/bg1.png';
import arrowRightImg from 'assets/img/arrow-right.png';
import vector2Img from 'assets/img/vector2.png';

const Section2Wrapper = styled.div`
  width: 100%;
  background-color: var(--color-bg-main);
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  padding-left: 84px;
  position: relative;

  @media only screen and (max-width: 768px) {
    padding: 0 20px;
  }

  .earn-section {
    display: flex;
    align-items: center;
    z-index: 3;

    @media only screen and (max-width: 768px) {
      flex-direction: column-reverse;
    }

    .apy-info {
      flex: 1 1 0%;

      @media only screen and (max-width: 768px) {
        width: 100%;
        margin-top: 100px;
      }

      .info-item-list {
        width: 80%;
        border-radius: 5px;
        box-shadow: 0px 13px 32px 0 rgba(6, 12, 63, 0.1);
        background-color: #ffffff;

        @media only screen and (max-width: 768px) {
          width: 100%;
        }

        .info-item {
          border-bottom: 1px solid #eef1fa;
          padding: 25px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .info-item-icon {
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            margin-right: 32px;
            img {
              display: inline-block;
              vertical-align: top;
              max-width: 100%;
              max-height: 100%;
            }
          }
          .info-item-content {
            width: calc(100% - 66px);
            display: flex;
            align-items: center;
            justify-content: space-between;

            .info-item-title {
              display: flex;
              margin-bottom: 3px;
              font-size: 18px;
              font-weight: 900;
              color: #39496a;
            }

            .info-item-prop {
              font-size: 18px;
              font-weight: 600;
              color: #39496a;
            }

            .info-item-data-value {
              display: flex;
              justify-content: flex-end;
              text-align: right;
              font-size: 20px;
              font-weight: 600;
              color: #39496a;

              &.green {
                color: #10741c;
              }
            }

            .info-item-data-prop {
              display: flex;
              justify-content: flex-end;
              color: #c5cbd4;
              text-align: right;
              font-size: 19px;
              font-weight: 600;
            }
          }
        }
      }
    }

    .earn-content {
      flex: 1 1 0%;
    }
  }

  .decentralized-section {
    display: flex;
    margin-top: 200px;
    z-index: 3;

    @media only screen and (max-width: 768px) {
      flex-direction: column-reverse;
    }

    .decentralized-image {
      flex: 1 1 0%;

      img {
        width: 80%;
        transform: scale(1.1);

        @media only screen and (max-width: 768px) {
          width: 100%;
          transform: scale(1);
        }
      }
    }

    .decentralized-wrapper {
      flex: 1 1 0%;

      @media only screen and (max-width: 768px) {
        margin: 80px 0;
      }
    }
  }

  p {
    font-size: 22px;
    font-weight: 900;
    color: #277ee6;
  }
  h4 {
    max-width: 580px;
    margin-top: 24px;

    @media only screen and (max-width: 768px) {
      font-size: 24px;
      margin-top: 5px;
    }
  }

  h5 {
    max-width: 580px;
    margin: 28px 0;

    @media only screen and (max-width: 768px) {
      font-size: 14px;
      margin: 10px 0;
    }
  }

  .arrow-right {
    width: 26px;
    height: 16px;
    margin-left: 11px;
  }

  .vector-section {
    position: absolute;
    width: 50%;
    height: 100%;
    left: 0;
    margin: auto;
    z-index: 1;
    display: flex;
    align-items: center;

    @media only screen and (max-width: 768px) {
      width: 100%;
    }

    img {
      max-width: 50%;
      transform: scale(3);
    }
  }

  @media only screen and (max-width: 768px) {
   
  }
`;

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
  SXP: sxpImg
}

function Section2({ history, markets }) {
  const handleLink = () => {
    window.open('https://app.strike.org', '_blank');
  };
  return (
    <Section2Wrapper id="earn">
      <div className="earn-section">
        <div className="apy-info">
          <div className="info-item-list">
            {markets.sort((a, b) => {
                if (new BigNumber(a.supplyApy).isGreaterThan(b.supplyApy)) {
                  return -1;
                }
                if (new BigNumber(a.supplyApy).isLessThan(b.supplyApy)) {
                  return 1;
                }
                return 0;
              })
              .map((m, index) => {
                if (index < 3) {
                  return (
                    <div className="info-item" key={index}>
                      <span className="info-item-icon">
                        <img src={ICONS[m.underlyingSymbol]} alt="coin img" />
                      </span>
                      <span className="info-item-content">
                        <span className="info-item-head">
                          <span className="info-item-title">{m.underlyingName}</span>
                          <span className="info-item-prop">{m.underlyingSymbol}</span>
                        </span>
                        <span className="info-item-data">
                          <span className="info-item-data-value green">
                            {m.supplyApy ? Number(m.supplyApy).toFixed(2) : '0.00'}%
                          </span>
                          <span className="info-item-data-prop">APY</span>
                        </span>
                      </span>
                    </div>
                  )
                }
              })
            }
          </div>
        </div>
        <div className="earn-content">
          <p>Earn</p>
          <h4>Supply Collateral to Strike while controlling your keys</h4>
          <h5>
            Strike users control all of their digital assets on a non-custodial
            protocol while earning a variable rate based on market demands of
            that asset. Rates are earned per Ethereum block mined
          </h5>
          <div className="flex align-center pointer">
            <p>View Markets</p>
            <img src={arrowRightImg} className="arrow-right" alt="arrow img" />
          </div>
        </div>
      </div>
      <div className="decentralized-section">
        <div className="decentralized-image">
          <img src={bg1Img} alt="app img" />
        </div>
        <div className="decentralized-wrapper">
          <p>Decentralized Application</p>
          <h4>Access Strike through a friendly user interface</h4>
          <h5>
            The Strike App enables users access to a fully decentralized money
            market powered on Ethereum 24/7/365 with a user-interface, api,
            or smart contracts.
          </h5>
          <div
            className="flex align-center pointer"
            onClick={() => handleLink()}
          >
            <p>Launch App</p>
            <img src={arrowRightImg} className="arrow-right" alt="arrow img" />
          </div>
        </div>
      </div>
      <div className="vector-section">
        <img src={vector2Img} alt="vector img" />
      </div>
    </Section2Wrapper>
  );
}

Section2.propTypes = {
  history: PropTypes.object,
};

Section2.defaultProps = {
  history: {}
};

export default compose(
  withRouter,
)(Section2);
