import React from 'react';
import './DeveloperDocs.scss';
import imgBlockChain from 'assets/img/homepage/img-vector.png';
import imgUp from 'assets/img/up.svg';

const DeveloperDocs = () => {
  return (
    <div className="developer-docs">
      <div className="slider-animation">
        <div className="slider">
          <span className="slider-text">DEVELOPERS</span>
          <span className="slider-text">DEVELOPERS</span>
          <span className="slider-text">DEVELOPERS</span>
          <span className="slider-text">DEVELOPERS</span>
          <span className="slider-text">DEVELOPERS</span>
          <span className="slider-text">DEVELOPERS</span>
          <span className="slider-text">DEVELOPERS</span>
        </div>
        <div className="slider">
          <span className="slider-text">DEVELOPERS</span>
          <span className="slider-text">DEVELOPERS</span>
          <span className="slider-text">DEVELOPERS</span>
          <span className="slider-text">DEVELOPERS</span>
          <span className="slider-text">DEVELOPERS</span>
          <span className="slider-text">DEVELOPERS</span>
          <span className="slider-text">DEVELOPERS</span>
        </div>
      </div>
      <div className="developer-docs-content flex just-between">
        <div className="content">
          {/* <span className="text-developers">Developers</span> */}
          <div className="text-layer-1">
            <div>Comprehensive</div>
            <div>developer API & SDK to build your custom application</div>
          </div>

          <div className="text-layer-2">
            <span className="strike-protocol">
              Build your own custom application by accessing a non-custodial
              money market with our developer APIs and SDKs. This will enable
              developers to quickly build their own application tailored to fit
              the Strike protocol.
            </span>
          </div>
          <a
            href="https://docs.strike.org/"
            target="_blank"
            rel="noreferrer"
            className="button"
          >
            <span className="button-dev">Read More</span>
            <img src={imgUp} alt="up" />
          </a>
        </div>
        <div className="img-dev">
          <img src={imgBlockChain} className="img-blockchain" alt="developer" />
        </div>
      </div>
    </div>
  );
};

export default DeveloperDocs;
