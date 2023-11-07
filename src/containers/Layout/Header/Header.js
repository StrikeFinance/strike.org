import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Drawer } from 'antd';
import { useHistory, withRouter } from 'react-router-dom';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { useWindowResizeMobile } from 'utilities/hook';
import logoImg from 'assets/img/logo.png';
import MenuTabImg from 'assets/img/homepage/menu-tab.svg';
import CloseMenuImg from 'assets/img/homepage/close-menu.svg';
import './Header.scss';

const HomePageLink = [
  {
    to: '/#',
    title: 'Home',
    altTitle: ''
  },
  {
    to: '/#market',
    title: 'Market',
    altTitle: ''
  },
  {
    to: '/#gorvernance',
    title: 'Governance',
    altTitle: ''
  },
  {
    to: '/#developer',
    title: 'Developers',
    altTitle: ''
  },
  {
    to: '/#blog',
    title: 'Blog',
    altTitle: ''
  }
];
const Header = ({ showMenuHead }) => {
  const [isMobile] = useWindowResizeMobile(1099);
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  const scrollWithOffset = (el, offset) => {
    const elementPosition = el.offsetTop - offset;
    window.scroll({
      top: elementPosition,
      left: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="page-header" id="header">
      <div className="header-content">
        <div className="header__content">
          <div className="logo" onClick={() => history.push('/')}>
            <img src={logoImg} alt="logo" />
          </div>
          {isMobile ? (
            <div className="header-mobile">
              {visible ? (
                <div
                  className="menu-icon cursor-pointer"
                  onClick={() => setVisible(false)}
                >
                  <img src={CloseMenuImg} alt="menu-tab" />
                </div>
              ) : (
                <div
                  className="menu-icon cursor-pointer"
                  onClick={() => setVisible(true)}
                >
                  <img src={MenuTabImg} alt="menu-tab" />
                </div>
              )}
              <Drawer
                height="50%"
                title=""
                placement="left"
                closable={false}
                onClose={() => setVisible(false)}
                visible={visible}
                key="left"
                className="drawer-menu-mobile"
              >
                <div>
                  <div className="nav-link-mobile">
                    {HomePageLink.map((link, index) => (
                      <div className="drawer-body-item" key={index}>
                        <NavLink
                          key={index}
                          className="link-item"
                          to={link?.to}
                          exact
                          onClick={() => setVisible(false)}
                          scroll={el => scrollWithOffset(el, 100)}
                        >
                          {link?.title}
                        </NavLink>
                      </div>
                    ))}
                  </div>
                  <div className="nav-btn-mobile">
                    <a
                      href="https://app.strike.org/"
                      target="_blank"
                      rel="noreferrer"
                      className="launch-app-btn"
                    >
                      Launch App
                    </a>
                    <a
                      href="https://strike.org/Whitepaper.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="whitepaper-btn"
                    >
                      Whitepaper
                    </a>
                  </div>
                </div>
              </Drawer>
            </div>
          ) : (
            <>
              <div className="nav-links flex">
                {showMenuHead ? (
                  <div className="links ">
                    {HomePageLink.map((link, index) => (
                      <NavLink
                        key={index}
                        className="link-item"
                        to={link?.to}
                        exact
                        scroll={el => scrollWithOffset(el, 100)}
                      >
                        {link?.title}
                      </NavLink>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="nav-btn flex align-center">
                <a
                  href="https://app.strike.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="launch-app-btn"
                >
                  Launch App
                </a>
                {showMenuHead ? (
                  <a
                    href="https://strike.org/Whitepaper.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="whitepaper-btn"
                  >
                    Whitepaper
                  </a>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  showMenuHead: PropTypes.bool
};

Header.defaultProps = {
  showMenuHead: true
};

export default compose(withRouter)(Header);
