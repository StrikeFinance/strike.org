import React from 'react';
import { FormattedMessage } from 'react-intl';
import './UserInterface.scss';
import imgAppUI from 'assets/img/homepage/app-ui.png';
import imgAppUIMobile from 'assets/img/homepage/app-ui-mobile.png';
import imgUp from 'assets/img/up.svg';

const StrikeProtocol = () => {
  return (
    <div className="strike-protocols">
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
      <div className="strike-protocol-content">
        <div className="img-dev">
          <img src={imgAppUI} className="img-app-ui" alt="app-ui" />
          <img
            src={imgAppUIMobile}
            className="img-app-ui-mobile"
            alt="app-ui"
          />
        </div>
        <div className="content">
          <div className="text-layer">
            <span>
              <FormattedMessage id="Section_6" />
            </span>
            <span>
              <FormattedMessage id="Section_6_desc" />
            </span>
          </div>
          <a
            href="https://app.strike.org/"
            target="_blank"
            rel="noreferrer"
            className="btn-launchapp"
          >
            <span>
              <FormattedMessage id="Launch_App" />
            </span>
            <img src={imgUp} alt="up" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default StrikeProtocol;
