import React from 'react';
import './UserInterface.scss';
import imgAppUI from 'assets/img/homepage/app-ui.png';
import imgAppUIMobile from 'assets/img/homepage/app-ui-mobile.png';
import imgUp from 'assets/img/up.svg';

const StrikeProtocol = () => {
  return (
    <div className="strike-protocols">
      <div className="slider-animation">
        <div className="slider">
          <span className="slider-text">TRY STRIKE FINANCE</span>
          <span className="slider-text">TRY STRIKE FINANCE</span>
          <span className="slider-text">TRY STRIKE FINANCE</span>
          <span className="slider-text">TRY STRIKE FINANCE</span>
          <span className="slider-text">TRY STRIKE FINANCE</span>
          <span className="slider-text">TRY STRIKE FINANCE</span>
        </div>
        <div className="slider">
          <span className="slider-text">TRY STRIKE FINANCE</span>
          <span className="slider-text">TRY STRIKE FINANCE</span>
          <span className="slider-text">TRY STRIKE FINANCE</span>
          <span className="slider-text">TRY STRIKE FINANCE</span>
          <span className="slider-text">TRY STRIKE FINANCE</span>
          <span className="slider-text">TRY STRIKE FINANCE</span>
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
            <span>Friendly user interface</span>
            <span>
              The Strike App enables users access to a fully decentralized money
              market powered on Ethereum 24/7/365 with a user-interface, api, or
              smart contracts.
            </span>
          </div>
          <div
            onClick={() => window.open('https://app.strike.org/', '_blank')}
            className="btn-launchapp"
          >
            <span>Launch App</span>
            <img src={imgUp} alt="up" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrikeProtocol;
