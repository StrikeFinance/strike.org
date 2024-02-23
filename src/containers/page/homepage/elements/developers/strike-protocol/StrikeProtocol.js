import React from 'react';
import { FormattedMessage } from 'react-intl';
import imgWhitepaper from 'assets/img/homepage/img-whitepaper.png';
import imgUp from 'assets/img/up.svg';
import './StrikeProtocol.scss';

function StrikeProtocol() {
  return (
    <div className="strike-whitepaper">
      <div className="slider-animation">
        <div className="slider">
          <span className="slider-text">
            <FormattedMessage id="TRY_STRIKE_FINANCE" />
          </span>
          <span className="slider-text">
            <FormattedMessage id="TRY_STRIKE_FINANCE" />
          </span>
          <span className="slider-text">
            <FormattedMessage id="TRY_STRIKE_FINANCE" />
          </span>
          <span className="slider-text">
            <FormattedMessage id="TRY_STRIKE_FINANCE" />
          </span>
          <span className="slider-text">
            <FormattedMessage id="TRY_STRIKE_FINANCE" />
          </span>
          <span className="slider-text">
            <FormattedMessage id="TRY_STRIKE_FINANCE" />
          </span>
        </div>
        <div className="slider">
          <span className="slider-text">
            <FormattedMessage id="TRY_STRIKE_FINANCE" />
          </span>
          <span className="slider-text">
            <FormattedMessage id="TRY_STRIKE_FINANCE" />
          </span>
          <span className="slider-text">
            <FormattedMessage id="TRY_STRIKE_FINANCE" />
          </span>
          <span className="slider-text">
            <FormattedMessage id="TRY_STRIKE_FINANCE" />
          </span>
          <span className="slider-text">
            <FormattedMessage id="TRY_STRIKE_FINANCE" />
          </span>
          <span className="slider-text">
            <FormattedMessage id="TRY_STRIKE_FINANCE" />
          </span>
        </div>
      </div>
      <div className="strike-whitepaper-content">
        <div className="img-dev">
          <img src={imgWhitepaper} alt="whitepaper" />
        </div>
        <div className="content">
          <div className="text-layer">
            <span>
              <FormattedMessage id="Section_7" />
            </span>
            <span>
              <FormattedMessage id="Section_7_desc" />
            </span>
          </div>
          <a
            href="https://strike.org/Whitepaper.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn-whitepaper"
          >
            <span>
              <FormattedMessage id="Learn_More" />
            </span>
            <img src={imgUp} alt="up" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default StrikeProtocol;
