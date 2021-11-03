import React from 'react';
import imgWhitepaper from 'assets/img/homepage/img-whitepaper.png';
import './StrikeProtocol.scss';

function StrikeProtocol() {
  const handleLink = url => {
    window.open(url, '_blank');
  };
  return (
    <div className="strike-whitepaper">
      <div className="strike-whitepaper-content flex just-between">
        <div className="content">
          <span className="strike-whitepaper-text">Try Strike Finance</span>
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
            <span>Read The Whitepaper</span>
          </div>
        </div>
        <div className="img-dev">
          <img src={imgWhitepaper} />
        </div>
      </div>
    </div>
  );
}

export default StrikeProtocol;
