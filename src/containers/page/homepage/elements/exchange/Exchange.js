import React from 'react';
import imgExchangeUpbit from 'assets/img/homepage/exchange-upbit.svg';
import imgExchangeKucoin from 'assets/img/homepage/exchange-kucoin.svg';
import imgExchangeUniswap from 'assets/img/homepage/exchange-uniswap.svg';
import imgExchangeBittrex from 'assets/img/homepage/exchange-bittrex.svg';

import './Exchange.scss';

function Exchange() {
  return (
    <div className="exchange" id="exchange">
      <div className="slider-animation">
        <div className="slider">
          <span className="slider-text">EXCHANGE LIST</span>
          <span className="slider-text">EXCHANGE LIST</span>
          <span className="slider-text">EXCHANGE LIST</span>
          <span className="slider-text">EXCHANGE LIST</span>
          <span className="slider-text">EXCHANGE LIST</span>
          <span className="slider-text">EXCHANGE LIST</span>
        </div>
        <div className="slider">
          <span className="slider-text">EXCHANGE LIST</span>
          <span className="slider-text">EXCHANGE LIST</span>
          <span className="slider-text">EXCHANGE LIST</span>
          <span className="slider-text">EXCHANGE LIST</span>
          <span className="slider-text">EXCHANGE LIST</span>
          <span className="slider-text">EXCHANGE LIST</span>
        </div>
      </div>
      <div className="exchange-content">
        <div className="content">
          <div className="img-exchange blue">
            <img src={imgExchangeUpbit} alt="whitepaper" />
          </div>

          <div className="img-exchange green">
            <img src={imgExchangeKucoin} alt="whitepaper" />
          </div>

          <div className="img-exchange white">
            <img src={imgExchangeUniswap} alt="whitepaper" />
          </div>

          <div className="img-exchange blue">
            <img src={imgExchangeBittrex} alt="whitepaper" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exchange;
