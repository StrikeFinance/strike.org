import React, { useState } from 'react';
import logoImg from 'assets/img/logo.png';
import MenuTabImg from 'assets/img/homepage/menu-tab.svg';
import CloseMenuImg from 'assets/img/homepage/close-menu.svg';
import './Header.scss';
import { NavLink } from 'react-router-dom';
import { useWindowResizeMobile } from 'utilities/hook';
import { Drawer } from 'antd';

const HomePageLink = [
  {
    to: '/',
    title: 'Home',
    altTitle: ''
  },
  {
    to: '/#earn',
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
  }
];
const Header = () => {
  const [isMobile] = useWindowResizeMobile(768);
  const [visible, setVisible] = useState(false);
  return (
    <div className="page-header" id="header">
      <div className="header-content">
        <div className="header__content">
          <div className="logo">
            <img src={logoImg} alt="logo" />
          </div>
          {isMobile ? (
            <div className="header-mobile">
              {visible ? (
                <div className="menu-icon" onClick={() => setVisible(false)}>
                  <img src={CloseMenuImg} alt="menu-tab" />
                </div>
              ) : (
                <div className="menu-icon" onClick={() => setVisible(true)}>
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
                        >
                          {link?.title}
                        </NavLink>
                      </div>
                    ))}
                  </div>
                  <div className="nav-btn-mobile">
                    <div
                      onClick={() =>
                        window.open(
                          'https://strike.org/Whitepaper.pdf',
                          '_blank'
                        )
                      }
                      className="whitepaper-btn"
                    >
                      Whitepaper
                    </div>
                    <div
                      onClick={() =>
                        window.open('https://app.strike.org/', '_blank')
                      }
                      className="launch-app-btn"
                    >
                      Launch App
                    </div>
                  </div>
                </div>
              </Drawer>
            </div>
          ) : (
            <div className="nav-links flex">
              <div className="links">
                {HomePageLink.map((link, index) => (
                  <NavLink
                    key={index}
                    className="link-item"
                    to={link?.to}
                    exact
                  >
                    {link?.title}
                  </NavLink>
                ))}
              </div>
              <div className="nav-btn flex align-center">
                <div
                  onClick={() =>
                    window.open('https://strike.org/Whitepaper.pdf', '_blank')
                  }
                  className="whitepaper-btn"
                >
                  Whitepaper
                </div>
                <div
                  onClick={() =>
                    window.open('https://app.strike.org/', '_blank')
                  }
                  className="launch-app-btn"
                >
                  Launch App
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
