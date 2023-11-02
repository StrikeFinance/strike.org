import React from 'react';
import imgPartnerImmunefi from 'assets/img/homepage/partner-immunefi.svg';
import imgPartnerCertik from 'assets/img/homepage/partner-certik.svg';
import imgPartnerTrueUsd from 'assets/img/homepage/partner-trueusd.svg';
import imgPartnerOndo from 'assets/img/homepage/partner-ondo.svg';
import imgPartnerHyve from 'assets/img/homepage/partner-hyve.svg';

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
            <img src={imgPartnerImmunefi} alt="whitepaper" />
          </div>

          <div className="img-partner">
            <img src={imgPartnerCertik} alt="whitepaper" />
          </div>

          <div className="img-partner">
            <img src={imgPartnerTrueUsd} alt="whitepaper" />
          </div>

          <div className="img-partner">
            <img src={imgPartnerOndo} alt="whitepaper" />
          </div>

          <div className="img-partner">
            <img src={imgPartnerHyve} alt="whitepaper" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Partner;
