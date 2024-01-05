import React from 'react';
import imgPartnerImmunefi from 'assets/img/homepage/partner-immunefi.svg';
import imgPartnerCertik from 'assets/img/homepage/partner-certik.svg';
import imgPartnerCoinbasewallet from 'assets/img/homepage/partner-coinbasewallet.svg';
import imgPartnerBandprotocol from 'assets/img/homepage/partner-bandprotocol.svg';
import imgPartnerHyve from 'assets/img/homepage/partner-hyve.svg';
import imgPartnerHalborn from 'assets/img/homepage/partner-halborn.svg';
import imgPartnerMexc from 'assets/img/homepage/partner-mexc.svg';
import imgPartnerBitget from 'assets/img/homepage/partner-bitget.svg';

import './Partner.scss';

function Partner() {
  return (
    <div className="partners" id="partners">
      <div className="slider-animation">
        <div className="slider">
          <span className="slider-text">PARTNERS</span>
          <span className="slider-text">PARTNERS</span>
          <span className="slider-text">PARTNERS</span>
          <span className="slider-text">PARTNERS</span>
          <span className="slider-text">PARTNERS</span>
          <span className="slider-text">PARTNERS</span>
        </div>
        <div className="slider">
          <span className="slider-text">PARTNERS</span>
          <span className="slider-text">PARTNERS</span>
          <span className="slider-text">PARTNERS</span>
          <span className="slider-text">PARTNERS</span>
          <span className="slider-text">PARTNERS</span>
          <span className="slider-text">PARTNERS</span>
        </div>
      </div>
      <div className="partner-content">
        <div className="content">
          <div className="img-partner">
            <img src={imgPartnerImmunefi} alt="Immunefi" />
          </div>

          <div className="img-partner">
            <img src={imgPartnerCertik} alt="Certik" />
          </div>

          <div className="img-partner">
            <img src={imgPartnerCoinbasewallet} alt="Coinbase Wallet" />
          </div>

          <div className="img-partner">
            <img src={imgPartnerBandprotocol} alt="Bandprotocol" />
          </div>

          <div className="img-partner">
            <img src={imgPartnerHyve} alt="Hyve works" />
          </div>

          <div className="img-partner">
            <img src={imgPartnerMexc} alt="Mexc" />
          </div>

          <div className="img-partner">
            <img src={imgPartnerHalborn} alt="Halborn" />
          </div>

          <div className="img-partner">
            <img src={imgPartnerBitget} alt="Mexc" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Partner;
