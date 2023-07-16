import React from 'react';
import imgWhitepaper from 'assets/img/homepage/img-whitepaper.png';
import imgUp from 'assets/img/up.svg';
import './StrikeProtocol.scss';

function StrikeProtocol() {
  return (
    <div className="strike-whitepaper">
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
      <div className="strike-whitepaper-content">
        <div className="img-dev">
          <img src={imgWhitepaper} alt="whitepaper" />
        </div>
        <div className="content">
          <div className="text-layer">
            <span>Strike Protocol</span>
            <span>
              Strike enables users and developers to supply digital assets onto
              the platform to earn from dynamic rates provided by the protocol
              and use that supplied asset as collateral to borrow other
              supported digital assets all on-chain.
            </span>
          </div>
          <div
            onClick={() =>
              window.open('https://strike.org/Whitepaper.pdf', '_blank')
            }
            className="btn-whitepaper"
          >
            <span>Learn More</span>
            <img src={imgUp} alt="up" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StrikeProtocol;
