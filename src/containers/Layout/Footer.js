import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'recompose';
import { connectAccount } from 'core';
import logoImg from 'assets/img/footer-logo.png';
import { useHistory } from 'react-router-dom';

const FooterWrapper = styled.div`
  padding: 75px 75px 44px;
  background-color: #090d27;

  @media (max-width: 768px) {
    padding: 35px;
    margin-top: 119px;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;

    @media (max-width: 768px) {
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      img {
        margin-bottom: 20px;
      }
    }

    .logo-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-right: 15%;
      img {
        height: 31px;
      }
      @media only screen and (max-width: 768px) {
        margin-right: 0;
      }
    }

    .link-wrapper {
      display: flex;
      justify-content: flex-end;
      flex-grow: 1;

      @media (max-width: 768px) {
       flex-direction: column;
      }

      .link-wrapper__row {
        display: flex;
        @media (max-width: 768px) {
          margin-top: 40px;
        }
      }

      p {
        font-size: 14px;
        font-weight: bold;
        color: #107def;
        margin-bottom: 40px;

        @media (max-width: 576px) {
          font-size: 18px;
        }
      }
      a {
        font-size: 14px;
        font-weight: 600;
        color: #39496a;

        &:hover {
          color: #FFFFFF;
        }

        &:not(:last-child) {
          margin-bottom: 25px;
        }

        @media (max-width: 576px) {
          font-size: 16px;
        }
      }

      .link-list {
        display: flex;
        flex-direction: column;
        margin-right: 97px;

        @media (max-width: 768px) {
          min-width: 25%;
          margin-right: 50px;
        }
      }
    }
  }

  .app-btn {
    width: 150px;
    height: 32px;
    border-radius: 5px;
    box-shadow: 0px 4px 13px 0 rgba(39, 126, 230, 0.64);
    background-color: #277ee6;
    font-size: 13.5px;
    font-weight: 500;
    color: #ffffff;
    cursor: pointer;
    &:hover {
      background-color: #477ee6;
      color: #ffffff;
    }

    &.mobile-view {
      opacity: 0;

      @media (max-width: 768px) {
        opacity: 1;
      }
    }
  }

  .latest-block-wrapper {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;
    margin-top: 50px;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      margin-top: 50px;
    }

    .copyright {
      font-size: 14px;
      font-weight: 600;
      color: #39496a;

      @media (max-width: 768px) {
        margin-top: 20px;
      }
    }
    .status-circle {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background-color: #97cc60;
      margin-right: 21px;
    }

    a {
      color: #39496a;
      font-size: 14px;
      font-weight: 600;
      margin-right: 20px;
    }
  }
`;

function Footer({ settings }) {
  const history = useHistory();
  // if (!settings.selectedAddress) {
  //   return null;
  // }
  return (
    <FooterWrapper>
      <div className="footer-content">
        <div className="logo-wrapper">
          <img src={logoImg} alt="logo" />
        </div>

        <div className="link-wrapper">
          <div className="link-wrapper__row">
            <div className="link-list">
              <p>Protocol</p>
              <a
                href="https://app.strike.org/market"
                target="_blank"
                rel="noreferrer"
              >
                Markets
              </a>
              <a href="https://docs.strike.org/" target="_blank" rel="noreferrer">
                Documentation
              </a>
              <a onClick={() => history.push("/terms")}>
                Terms
              </a>
              <a href="https://www.immunefi.com/bounty/strikefinance">
                Bug Bounty
              </a>
            </div>
            <div className="link-list">
              <p>Governance</p>
              <a
                href="https://app.strike.org/vote"
                target="_blank"
                rel="noreferrer"
              >
                Proposals
              </a>
              <a
                href="https://app.strike.org/strk"
                target="_blank"
                rel="noreferrer"
              >
                STRK
              </a>
              <a
                href="https://app.strike.org/vote/leaderboard"
                target="_blank"
                rel="noreferrer"
              >
                Leaderboard
              </a>
            </div>
          </div>
          <div className="link-wrapper__row">
            <div className="link-list">
              <p>Community</p>
              <a
                href="https://community.strike.org/"
                target="_blank"
                rel="noreferrer"
              >
                Forums
              </a>
              <a
                href="https://twitter.com/StrikeFinance"
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>
              <a
                href="https://t.me/StrikeFinance"
                target="_blank"
                rel="noreferrer"
              >
                Telegram
              </a>
              <a
                href="https://github.com/StrikeFinance"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
              <a
                href="https://defipulse.com/"
                target="_blank"
                rel="noreferrer"
              >
                DeFi Pulse
              </a>
            </div>
            <div className="link-list">
              <div
                className="flex align-center just-center app-btn"
                onClick={() => {
                  window.open('https://app.strike.org', '_blank');
                }}
              >
                App
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="latest-block-wrapper">
        <p className="copyright">
          © {new Date().getUTCFullYear()} Strike.org All Rights Reserved. The Strike Decentralized App does not support US based users.
        </p>
      </div>
    </FooterWrapper>
  );
}

Footer.propTypes = {
  settings: PropTypes.object
};

Footer.defaultProps = {
  settings: {}
};

const mapStateToProps = ({ account }) => ({
  settings: account.setting
});

export default compose(connectAccount(mapStateToProps, undefined))(Footer);
