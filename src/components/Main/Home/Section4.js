import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { Typography } from 'antd';
import imageApi from 'assets/img/landingpage/Group-379.png';
import vector from 'assets/img/landingpage/Vector-379.png';
import imgMac from 'assets/img/landingpage/Group-1006.png';

const Section4Wrapper = styled.div`
  width: 100%;

  background-color: var(--color-bg-main);

  @media only screen and (max-width: 768px) {
  }

  .column1,.column4,.column5 {
    flex: 1 1 0%;
    padding-top: 125px;
    padding-left: 190px;

    .typography {
      font-size: 25px;
      font-weight: 500;
      color: #107DEF;
      padding-bottom: 10px;
    }

    .content-1{
      font-size: 49px;
      font-weight: 500;
      color: black;
      width: 510px;
      display: block;
      padding-bottom: 30px;
    }

    .content-2 {
      font-size: 18px;
      font-weight: 500;
      color: #6D6F7B;
      display:block;
      width: 510px;
      padding-bottom: 40px;
    }

    .btn-docs {
      color: #ffffff;
      font-size: 18px;
      font-weight: 800;
      margin-bottom: 189px;
      outline: none;
      padding: 10.5px 30px 10.5px 30px;
      background: #107DEF;
      border: none;
      border-radius: 8px;
      box-shadow: 0px 3px 20px rgba(18, 114, 236, 0.4);
      cursor: pointer
    }
  }

  .column2, .column3,.column6{
    flex: 1;
    position relative;

    .imageApi {
      margin-top: 134px;
      position: absolute;
      z-index: 5;
    }

    .vector{
      position: absolute;
      z-index: 4;
      top: 89px;
      left: 51px;
    }
  }

  .column3 {
    padding-left: 70px;
    .imageApi {
      margin-top: 0;
    }
  }

  .column6 {
    padding-bottom: 215px;
  }

  }
`;

function Section4({ history }) {
  return (
    <Section4Wrapper className="flex flex-column">
      <div className="flex">
        <div className="column1">
          <Typography className="typography">Developers</Typography>
          <span className="content-1">
            Comprehensive developer API & SDK to build your custom application
          </span>
          <span className="content-2">
            Build your own custom application by accessing a non-custodial money
            market with our developer APIs and SDKs. This will enable developers
            to quickly build their own application tailored to fit the Strike
            protocol.
          </span>
          <button className="btn-docs">Developer Docs</button>
        </div>
        <div className="column2">
          <img className="imageApi" src={imageApi} />
          <img className="vector" src={vector} />
        </div>
      </div>
      <div className="flex">
        <div className="column3">
          <img className="imageApi" src={imgMac} />
        </div>
        <div className="column4">
          <Typography className="typography">Try Strike Finance</Typography>
          <span className="content-1">Friendly user interface</span>
          <span className="content-2">
            The Strike App enables users access to a fully decentralized money
            market powered on Ethereum 24/7/365 with a user-interface, api, or
            smart contracts.
          </span>
          <button className="btn-docs">Launch App</button>
        </div>
      </div>
      <div className="flex">
        <div className="column5">
          <Typography className="typography">Try Strike Finance</Typography>
          <span className="content-1">Strike Protocol</span>
          <span className="content-2">
            Strike enables users and developers to supply digital assets onto
            the platform to earn from dynamic rates provided by the protocol and
            use that supplied asset as collateral to borrow other supported
            digital assets all on-chain.
          </span>
          <button className="btn-docs">Read The Whitepaper</button>
        </div>
        <div className="column6">
          <img className="imageApi" src={imageApi} />
          <img className="vector" src={vector} />
        </div>
      </div>
    </Section4Wrapper>
  );
}

Section4.propTypes = {
  history: PropTypes.object
};

Section4.defaultProps = {
  history: {}
};

export default compose(withRouter)(Section4);
