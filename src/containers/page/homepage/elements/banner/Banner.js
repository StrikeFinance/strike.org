import React from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import BigNumber from 'bignumber.js';
import PropTypes from 'prop-types';
import BannerImg from 'assets/img/homepage/banner.png';
import MouseImg from 'assets/img/homepage/mouse.svg';
import './Banner.scss';
import { Link } from 'react-router-dom';

const Banner = ({ markets }) => {
  const lang = localStorage.getItem('language') || 'en';

  return (
    <div className="banner-homepage">
      <div className="banner-content flex just-between">
        <div className="left">
          {lang === 'zh' ? (
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
              Launch App
            </div>
            <div
              onClick={() =>
                window.open('https://strike.org/Whitepaper.pdf', '_blank')
              }
              className="whitepaper-btn"
            >
              Whitepaper
            </div>
            <Link to="/sale" className="claim-btn">
              Claim STRK
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
