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

import bg3Img from 'assets/img/bg3.png';
import arrowRightImg from 'assets/img/arrow-right.png';
import vector3Img from 'assets/img/vector3.png';

const Section3Wrapper = styled.div`
  width: 100%;
  padding: 65px 0px 117px 0px;

  @media only screen and (max-width: 768px) {
    padding: 65px 20px 0;
  }

  p {
    font-size: 22px;
    font-weight: 900;
    color: #277ee6;

    @media only screen and (max-width: 768px) {
      font-size: 16px;
    }
  }

  h4 {
    max-width: 812px;
    margin-top: 19px;
    margin-bottom: 47px;

    @media only screen and (max-width: 768px) {
      font-size: 20px;
      margin-bottom: 20px;
    }
  }

  h5 {
    max-width: 660px;
    margin-top: 21px;
    margin-bottom: 51px;

    @media only screen and (max-width: 768px) {
      font-size: 14px;
      margin-bottom: 20px;
    }
  }
`;

const DevelopersWrapper = styled.div`
  margin-bottom: 62px;

  .bg2-Img {
    max-width: 100%;
  }

  .solution-img {
    width: 90px;
    margin-top: 50px;
    margin-bottom: 26px;
  }

  .doc-btn {
    width: 150px;
    height: 32px;
    border-radius: 5px;
    box-shadow: 0px 4px 13px 0 rgba(39, 126, 230, 0.64);
    background-color: #277ee6;
    font-size: 13.5px;
    font-weight: 500;
    color: #ffffff;
    margin-right: 22px;
    &:hover {
      background-color: #477ee6;
      color: #ffffff;
    }
  }
`;

const PortableWrapper = styled.div`
  margin: 150px 0 150px 84px;
  position: relative;

  @media only screen and (max-width: 768px) {
    flex-direction: column-reverse;
    margin: 100px 0;
  }

  .column1 {
    flex: 1 1 0%;
    z-index: 3;

    @media only screen and (max-width: 768px) {
      margin-top: 30px;
    }

    .info-item-list {
      width: 70%;
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
  .column2 {
    flex: 1;
    z-index: 3;

    img {
      width: 26px;
      height: 16px;
      margin-left: 11px;
    }
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

    img {
      max-width: 50%;
      transform: scale(1.8);
    }
  }
`;

const ProtocolWrapper = styled.div`
  display: flex;
  padding: 0 82px;

  @media only screen and (max-width: 768px) {
    padding: 0;
    flex-direction: column;
  }

  .column1 {
    flex: 1;

    img {
      width: 26px;
      height: 16px;
      margin-left: 11px;
    }
  }
  .column2 {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    .bg3-img {
      max-width: 100%;
      padding: 50px 0;

      @media only screen and (max-width: 768px) {
        max-width: 50%;
      }
    }
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
};

function Section3({ history, markets }) {
  const handleLink = () => {
    window.open('https://app.strike.org', '_blank');
  };

  return (
    <Section3Wrapper id="developer">
      <DevelopersWrapper className="flex flex-column align-center">
        <h4 className="center">10 markets available</h4>
      </DevelopersWrapper>
      <PortableWrapper className="flex">
        <div className="column1">
          <div className="info-item-list">
            {markets
              .sort((a, b) => {
                if (new BigNumber(a.liquidity).isGreaterThan(b.liquidity)) {
                  return -1;
                }
                if (new BigNumber(a.liquidity).isLessThan(b.liquidity)) {
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
                          <span className="info-item-title">
                            {m.underlyingName}
                          </span>
                          <span className="info-item-prop">
                            {m.underlyingSymbol}
                          </span>
                        </span>
                        <span className="info-item-data">
                          <span className="info-item-data-value">
                            $
                            {m.liquidity
                              ? Number(m.liquidity).toFixed(2)
                              : '0.00'}
                          </span>
                          <span className="info-item-data-prop">
                            Available Liquidity
                          </span>
                        </span>
                      </span>
                    </div>
                  );
                }
              })}
          </div>
        </div>
        <div className="column2">
          <p>Portable Liquidity</p>
          <h4>Access Liquidity from Strike on-demand on any asset.</h4>
          <h5>
            With the Strike protocols decentralized nature, users and developers
            can access liquidity on-demand from their supplied collateral.
          </h5>
          <div
            className="flex align-center pointer"
            onClick={() => handleLink()}
          >
            <p>Launch App</p>
            <img src={arrowRightImg} className="arrow-right" alt="arrow img" />
          </div>
        </div>
        <div className="vector-section">
          <img src={vector3Img} alt="vector img" />
        </div>
      </PortableWrapper>
      <ProtocolWrapper className="flex">
        <div className="column1">
          <p>Strike Protocol</p>
          <h4>How does Strike Work?</h4>
          <h5>
            Strike enables users and developers to supply digital assets onto
            the platform to earn from dyanmic rates provided by the protocol and
            use that supplied asset as collateral to borrow other supported
            digital assets all on-chain.
          </h5>
          <div
            className="flex align-center pointer"
            onClick={() => {
              window.open('/Whitepaper.pdf', '_blank');
            }}
          >
            <p>READ THE WHITEPAPER</p>
            <img src={arrowRightImg} className="arrow-right" alt="arrow img" />
          </div>
        </div>
        <div className="flex align-center just-center column2">
          <img className="bg3-img" src={bg3Img} alt="bg3 img" />
        </div>
      </ProtocolWrapper>
    </Section3Wrapper>
  );
}

Section3.propTypes = {
  history: PropTypes.object
};

Section3.defaultProps = {
  history: {}
};

export default compose(withRouter)(Section3);
