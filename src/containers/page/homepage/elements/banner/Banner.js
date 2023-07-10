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
        <div className="description">
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
