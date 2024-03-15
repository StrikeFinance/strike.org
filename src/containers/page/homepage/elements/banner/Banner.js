import React, { useState, useEffect } from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import BigNumber from 'bignumber.js';
import PropTypes from 'prop-types';
import { useWeb3, useActiveWeb3React } from 'hooks';
import BannerImg from 'assets/img/homepage/banner.png';
import MouseImg from 'assets/img/homepage/mouse.svg';
import rewardBanner from 'assets/img/landingpage/reward_banner.svg';
import dividerImg from 'assets/img/homepage/divider.svg';

import './Banner.scss';
import { Link } from 'react-router-dom';
import { useRewardData } from 'hooks/useReward';

const Banner = ({ markets }) => {
  const lang = localStorage.getItem('language') || 'en';

  const { chainId, requiredChainId } = useActiveWeb3React();
  const web3 = useWeb3();

  const [strkPrice, setStrkPrice] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);
  const [totalReserve, setTotalReserve] = useState(0);

  const { totalReserveReward, reserveApy } = useRewardData(
    web3,
    chainId || requiredChainId,
    strkPrice,
    ethPrice,
    totalReserve
  );

  useEffect(() => {
    if (markets?.markets) {
      const strkMarket = markets.markets.find(
        ele => ele.underlyingSymbol === 'STRK'
      );
      if (strkMarket) {
        setStrkPrice(Number(strkMarket.tokenPrice));
      }

      const ethMarket = markets.markets.find(
        ele => ele.underlyingSymbol === 'ETH'
      );
      if (ethMarket) {
        setEthPrice(Number(ethMarket.tokenPrice));
      }

      let tempTotalReserve = new BigNumber(0);
      markets.markets.forEach(ele => {
        tempTotalReserve = tempTotalReserve.plus(
          new BigNumber(ele.totalReserves || 0)
            .div(new BigNumber(10).pow(ele.underlyingDecimal))
            .times(ele.tokenPrice)
        );
      });
      setTotalReserve(tempTotalReserve.toNumber());
    }
  }, [markets]);

  return (
    <div className="banner-homepage">
      <div className="reward-banner-wrapper">
        <div className="reward-banner flex just-between">
          <div className="left">
            <div className="title">
              <FormattedMessage id="Reward_Banner_Title" />
            </div>
            <div className="description">
              <FormattedMessage id="Reward_Banner_Description" />
            </div>
            <div className="buttons flex">
              <a
                href={`${process.env.REACT_APP_URL}/vault`}
                target="_blank"
                rel="noreferrer"
                className="btn-calc"
              >
                <span>
                  <FormattedMessage id="Reward_Banner_Go" />
                </span>
              </a>
              <a
                href="https://strike-finance.medium.com/unleashing-the-potential-of-defi-with-strike-prime-rewards-a-strategic-leap-forward-01176f33c851"
                target="_blank"
                rel="noreferrer"
                className="btn-learn"
              >
                <span>
                  <FormattedMessage id="Reward_Banner_Learn" />
                </span>
              </a>
            </div>
          </div>
          <div className="reward-info">
            <div className="info">
              <div className="label">
                <FormattedMessage id="Prime_Reward_Pool" />
              </div>
              {Number(totalReserveReward) === 0 ? (
                <div className="load-wraper">
                  <div className="activity" />
                </div>
              ) : (
                <div className="value">${totalReserveReward}</div>
              )}
            </div>

            <img src={dividerImg} className="divider" alt="divider" />

            <div className="info">
              <div className="label">
                <FormattedMessage id="Prime_APR" />
              </div>
              {Number(reserveApy) === 0 ? (
                <div className="load-wraper">
                  <div className="activity" />
                </div>
              ) : (
                <div className="value">{reserveApy}%</div>
              )}
            </div>
          </div>
          <img
            src={rewardBanner}
            className="rewardBannerImg"
            alt="reward-banner"
          />
        </div>
      </div>
      <div className="banner-content flex just-between">
        <div className="left">
          {lang === 'zh' || lang === 'tr' ? (
            <div className="title">
              <FormattedMessage id="Section_1_1" />
              {markets ? (
                <span className="text-highlight">
                  {markets?.markets.filter(m => m.deprecated === false).length}
                </span>
              ) : (
                <div className="load-wraper2">
                  <div className="activity" />
                </div>
              )}
              <FormattedMessage id="Section_1_2" />
              {markets ? (
                <span className="text-highlight">
                  $
                  {new Intl.NumberFormat({
                    maximumSignificantDigits: 3
                  }).format(
                    markets?.markets
                      .filter(m => m.deprecated === false)
                      .reduce(
                        (a, b) => a.plus(new BigNumber(b.totalSupplyUsd)),
                        new BigNumber('0')
                      )
                  )}
                </span>
              ) : (
                <div className="load-wraper">
                  <div className="activity" />
                </div>
              )}
              <FormattedMessage id="Section_1_3" />
            </div>
          ) : (
            <div className="title">
              <FormattedMessage id="Section_1_1" />
              {markets ? (
                <span className="text-highlight">
                  $
                  {new Intl.NumberFormat({
                    maximumSignificantDigits: 3
                  }).format(
                    markets?.markets
                      .filter(m => m.deprecated === false)
                      .reduce(
                        (a, b) => a.plus(new BigNumber(b.totalSupplyUsd)),
                        new BigNumber('0')
                      )
                  )}
                </span>
              ) : (
                <div className="load-wraper">
                  <div className="activity" />
                </div>
              )}
              <FormattedMessage id="Section_1_2" />
              {markets ? (
                <span className="text-highlight">
                  {markets?.markets.filter(m => m.deprecated === false).length}
                </span>
              ) : (
                <div className="load-wraper2">
                  <div className="activity" />
                </div>
              )}
              <FormattedMessage id="Section_1_3" />
            </div>
          )}
          <div className="description">
            <FormattedMessage id="Section_1_desc" />
          </div>
          <Link to="/sale" className="claim-pc-btn">
            <div>
              <FormattedMessage id="Claim_STRK" />
            </div>
          </Link>
          <div className="btn-mobile">
            <div
              onClick={() => window.open('https://app.strike.org/', '_blank')}
              className="launch-app-btn"
            >
              <FormattedMessage id="Launch_App" />
            </div>
            <div
              onClick={() =>
                window.open('https://strike.org/Whitepaper.pdf', '_blank')
              }
              className="whitepaper-btn"
            >
              <FormattedMessage id="Whitepaper" />
            </div>
            <Link to="/sale" className="claim-btn">
              <FormattedMessage id="Claim_STRK" />
            </Link>
          </div>
        </div>
        <div className="image-banner">
          <img src={BannerImg} alt="banner" />
        </div>
      </div>
      <div className="scroll-image">
        <div className="flex just-center">
          <NavLink to="/#partners" smooth>
            <img src={MouseImg} alt="" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};
Banner.propTypes = {
  markets: PropTypes.object.isRequired
};

export default compose(withRouter)(Banner);
