import React from 'react';
import './DeveloperDocs.scss';
import imgBlockChain from 'assets/img/homepage/img-vector.png';

const DeveloperDocs = () => {
  return (
    <div className="developer-docs ">
      <div className="developer-docs-content flex just-between">
        <div className="content">
          <span className="text-developers">Developers</span>
          <div className="text-layer-1">
            <span className="comprehensive-developer">Comprehensive</span>
            <span className="developer-api">
              developer API & SDK to build your custom application
            </span>
          </div>

          <div className="text-layer-2">
            <span className="strike-protocol">
              Build your own custom application by accessing a non-custodial
              money market with our developer APIs and SDKs.This will enable
              developers to quickly build their own application tailored to fit
              the Strike protocol.
            </span>
          </div>
          <div className="button">
              <span className="button-dev">Developer Docs</span>
          </div>
        </div>
        <div className="img-dev">
          <img src={imgBlockChain} className="img-blockchain" />
        </div>
      </div>
      
    </div>
  );
};

export default DeveloperDocs;
