import React from 'react';
import { FormattedMessage } from 'react-intl';
import './DeveloperDocs.scss';
import imgBlockChain from 'assets/img/homepage/img-vector.png';
import imgUp from 'assets/img/up.svg';

const DeveloperDocs = () => {
  return (
    <div className="developer-docs">
      <div className="slider-animation">
        <div className="slider">
          <span className="slider-text">
            <FormattedMessage id="DEVELOPERS" />
          </span>
          <span className="slider-text">
            <FormattedMessage id="DEVELOPERS" />
          </span>
          <span className="slider-text">
            <FormattedMessage id="DEVELOPERS" />
          </span>
          <span className="slider-text">
            <FormattedMessage id="DEVELOPERS" />
          </span>
          <span className="slider-text">
            <FormattedMessage id="DEVELOPERS" />
          </span>
          <span className="slider-text">
            <FormattedMessage id="DEVELOPERS" />
          </span>
          <span className="slider-text">
            <FormattedMessage id="DEVELOPERS" />
          </span>
        </div>
        <div className="slider">
          <span className="slider-text">
            <FormattedMessage id="DEVELOPERS" />
          </span>
          <span className="slider-text">
            <FormattedMessage id="DEVELOPERS" />
          </span>
          <span className="slider-text">
            <FormattedMessage id="DEVELOPERS" />
          </span>
          <span className="slider-text">
            <FormattedMessage id="DEVELOPERS" />
          </span>
          <span className="slider-text">
            <FormattedMessage id="DEVELOPERS" />
          </span>
          <span className="slider-text">
            <FormattedMessage id="DEVELOPERS" />
          </span>
          <span className="slider-text">
            <FormattedMessage id="DEVELOPERS" />
          </span>
        </div>
      </div>
      <div className="developer-docs-content flex just-between">
        <div className="content">
          {/* <span className="text-developers">Developers</span> */}
          <div className="text-layer-1">
            <div>
              <FormattedMessage id="Section_5_1" />
            </div>
            <div>
              <FormattedMessage id="Section_5_2" />
            </div>
          </div>

          <div className="text-layer-2">
            <span className="strike-protocol">
              <FormattedMessage id="Section_5_desc" />
            </span>
          </div>
          <a
            href="https://docs.strike.org/"
            target="_blank"
            rel="noreferrer"
            className="button"
          >
            <span className="button-dev">
              <FormattedMessage id="Read_More" />
            </span>
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
