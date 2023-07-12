import BannerImg from 'assets/img/homepage/banner.png';
import MouseImg from 'assets/img/homepage/mouse.svg';
import BigNumber from 'bignumber.js';
import PropTypes from 'prop-types';
import React from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import './Banner.scss';

const Banner = ({ markets }) => {
  return (
    <div className="banner-homepage">
      <div className="banner-content flex just-between">
        <div className="left">
          <div className="title">
            The Strike protocol currently has{' '}
            <span className="text-highlight">
              $
              {new Intl.NumberFormat({
                maximumSignificantDigits: 3
              }).format(
                markets?.markets.reduce(
                  (a, b) => a.plus(new BigNumber(b.totalSupplyUsd)),
                  new BigNumber('0')
                )
              )}
            </span>{' '}
            TVL across{' '}
            <span className="text-highlight">{markets?.markets.length}</span>{' '}
            sToken markets
          </div>
          <div className="description">
            Strike users control all of their digital assets on a non-custodial
            protocol while earning a variable rate based on market demands of
            that asset. Rates are earned per Ethereum block mined.
          </div>
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
          </div>
        </div>
        <div className="image-banner">
          <img src={BannerImg} alt="banner" />
        </div>
      </div>
      <div className="scroll-image">
        <div className="flex just-center">
          <NavLink to="/#market" smooth>
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
