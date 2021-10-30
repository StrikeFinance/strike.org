import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'recompose';
import { NavLink, withRouter } from 'react-router-dom';
import logoImg from 'assets/img/logo.png';

const HeaderWrapper = styled.div`
  z-index: 20;
  top: 0px;
  left: 0;
  right: 0;
  background-color: var(--color-bg-main);
 

  .header-container {
    display: flex;
    align-items: center;
    padding: 40px 84px 20px;
    position: relative;
    .logo {
      img {
        height: 40px;
        margin-left: 120px;
      }
    }

    @media only screen and (max-width: 768px) {
      padding: 35px 0 15px;
      margin: 0 20px;
      width: calc(100% - 40px);
      .logo {
        img {
          margin-left: 30px;
        }
      }
    }
  }

  .header-menu {
    display: flex;
    align-items: center;
    flex-grow: 1;

    @media only screen and (max-width: 768px) {
      display: none;
      z-index: 5;
      position: absolute;
      top: calc(100% + 20px);
      left: 0;
      right: 0;
      width: 100%;
      background: rgba(255, 255, 255, 0.95);
      box-shadow: 0px 48px 48px -16px rgba(0, 0, 0, 0.04);
      backdrop-filter: blur(8px);
      text-align: center;
      padding: 30px 0;

      &.active {
        display: flex;
        flex-direction: column;
        
      }
    }

    .header-menu__list {
      display: flex;
      align-items: center;
      list-style-type: none;
      margin-left: auto;
      margin-bottom: 0;
      @media only screen and (max-width: 768px) {
        display: block;
        margin: 0 auto;
        margin-bottom: 15px;
        padding: 0;
      }

      .header-menu__item {
        margin-right: 80px;
        @media only screen and (max-width: 768px) {
          margin: 0;
        }
        &:last-child {
          margin: 0;
        }
      }

      .header-menu__link {
        font-size: 20px;
        font-weight: 500;
        color: #aaaeb5;
        text-decoration: none;
        cursor: pointer;
        @media only screen and (max-width: 768px) {
          display: block;
          padding: 7px 0;
        }
        &:hover {
          color: #277ee6;
        }
      }
    }

    .header-menu__btn {
      width: 160px;
      height: 50px;
      border-radius: 8px;
      background-color: #107DEF;
      font-size: 18px;
      font-weight: 800;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 40px;
      cursor: pointer;
      margin-right: 120px;
      &:hover {
        background-color: #ffffff;
        color: #477ee6 ;
      }
      @media only screen and (max-width: 768px) {
        margin-left: 120px;
      }
    }
    .header-menu_whitepaper__btn {
      width: 160px;
      height: 50px;
      border-radius: 5px;
      box-shadow: 0px 4px 13px 0 rgba(39, 126, 230, 0.64);
      background-color: #ffff;
      font-size: 18px;
      font-weight: 800;
      color: #277ee6;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 40px;
      cursor: pointer;
      @media only screen and (max-width: 768px) {
        margin-left: 0;
      }
    }
  }

  .header-menu__btn_white {
    width: 160px;
    height: 50px;
    border-radius: 8px;
    background-color:  #ffffff;
    font-size: 18px;
    font-weight: 800;
    color: #277ee6;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 40px;
    cursor: pointer;
    &:hover {
      background-color: #477ee6;
      color: #ffffff;
    }
    @media only screen and (max-width: 768px) {
      margin-left: 0;
    }
  }
    
  } 

  .header-burger {
    display: none;
    width: 24px;
    height: 20px;
    margin-left: auto;
    position: relative;
    cursor: pointer;
    @media only screen and (max-width: 768px) {
      display: block;
      margin-right: 30px;
    }

    &.active {
      span {
        &:nth-child(1) {
          transform: rotate(45deg) translate(7px, 6px);
        }
        &:nth-child(2) {
          transform: translateX(-10px);
          opacity: 0;
        }
        &:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }
      }
    }
    span {
      background-color: #000000;
      position: absolute;
      width: 100%;
      height: 2px;
      left: 0;
      right: 0;
      transition: 0.3s ease;
      &:nth-child(1) {
        top: 0;
      }
      &:nth-child(2) {
        top: 0;
        bottom: 0;
        margin: auto;
      }
      &:nth-child(3) {
        bottom: 0;
      }
    }
  }
`;

function Header({ history }) {
  const [isOpened, setIsOpened] = useState(false);

  const handleLink = url => {
    setIsOpened(false);
    window.open(url, '_blank');
  };

  return (
    <HeaderWrapper>
      <div className="header-container container">
        <div className="header-logo">
          <a className="logo" href="/">
            <img src={logoImg} alt="" />
          </a>
        </div>
        <div className={`header-menu ${isOpened ? 'active' : ''}`}>
          <ul className="header-menu__list">
            <li className="header-menu__item">
              <NavLink className="header-menu__link" to="/">
                Home
              </NavLink>
            </li>
            <li className="header-menu__item">
              <NavLink exact className="header-menu__link" to="/#earn">
                Market
              </NavLink>
            </li>
            <li className="header-menu__item">
              <NavLink exact className="header-menu__link" to="/#gorvernance">
                Governance
              </NavLink>
            </li>
            <li className="header-menu__item">
              <NavLink
                exact
                className="header-menu__link"
                to="/#developer"
              >
                Developers
              </NavLink>
            </li>
          </ul>
          <div
            className="header-menu__btn_white"
            onClick={() => handleLink('https://strike.org/Whitepaper.pdf')}
          >
            Whitepaper
          </div>
          <div
            className="header-menu__btn"
            onClick={() => handleLink('https://app.strike.org/')}
          >
            Launch App
          </div>
        </div>
        <div
          className={`header-burger ${isOpened ? 'active' : ''}`}
          onClick={() => setIsOpened(!isOpened)}
        >
          <span />
          <span />
          <span />
        </div>
      </div>
    </HeaderWrapper>
  );
}

Header.propTypes = {
  history: PropTypes.object
};

Header.defaultProps = {
  history: {}
};

export default compose(withRouter)(Header);
