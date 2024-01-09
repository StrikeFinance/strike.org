import React from 'react';
import imgExchangeUpbit from 'assets/img/homepage/exchange-upbit.svg';
import imgExchangeKucoin from 'assets/img/homepage/exchange-kucoin.svg';
import imgExchangeUniswap from 'assets/img/homepage/exchange-uniswap.svg';
import imgExchangeBittrex from 'assets/img/homepage/exchange-bittrex.svg';
import imgExchangeMexc from 'assets/img/homepage/exchange-mexc.svg';
import imgExchangeBitget from 'assets/img/homepage/exchange-bitget.svg';

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
          <a target="__blank" className="pointer" href="https://upbit.com">
            <div className="img-exchange blue">
              <img src={imgExchangeUpbit} alt="Upbit" />
            </div>
          </a>
          <a
            target="__blank"
            className="pointer"
            href="https://www.kucoin.com/trade/STRK-ETH"
          >
            <div className="img-exchange green">
              <img src={imgExchangeKucoin} alt="Kucoin" />
            </div>
          </a>
          <a
            target="__blank"
            className="pointer"
            href="https://app.uniswap.org/swap?outputCurrency=0x74232704659ef37c08995e386a2e26cc27a8d7b1&chain=mainnet"
          >
            <div className="img-exchange white">
              <img src={imgExchangeUniswap} alt="Uniswap" />
            </div>
          </a>
          <a
            target="__blank"
            className="pointer"
            href="https://bittrexglobal.com"
          >
            <div className="img-exchange blue">
              <img src={imgExchangeBittrex} alt="Bittrex" />
            </div>
          </a>
          <a
            target="__blank"
            className="pointer"
            href="https://www.mexc.com/exchange/STRK_USDT?_from=header"
          >
            <div className="img-exchange blue">
              <img src={imgExchangeMexc} alt="Mexc" />
            </div>
          </a>
          <a
            target="__blank"
            className="pointer"
            href="https://www.bitget.com/spot/STRIKEUSDT"
          >
            <div className="img-exchange cyan">
              <img src={imgExchangeBitget} alt="Bitget" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Exchange;
