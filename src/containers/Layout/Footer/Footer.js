import React from 'react';
import { Col, Row } from 'antd';
import { useHistory } from 'react-router-dom';
import { useWindowResizeMobile } from 'utilities/hook';
import footerImg from 'assets/img/logo.png';
import './Footer.scss';

const ProtocolOption = [
  {
    label: 'Market',
    href: 'https://app.strike.org/market'
  },
  {
    label: 'Documentation',
    href: 'https://docs.strike.org/'
  },
  {
    label: 'Terms',
    href: ''
  },
  {
    label: 'Bug Bounty',
    href: 'https://www.immunefi.com/bounty/strikefinance'
  }
];
const GovernanceOption = [
  {
    label: 'Proposals',
    href: 'https://app.strike.org/vote'
  },
  {
    label: 'STRK',
    href: 'https://app.strike.org/strk'
  },
  {
    label: 'Leaderboard',
    href: 'https://app.strike.org/vote/leaderboard'
  },
  {
    label: 'Grant Program',
    href: 'https://forms.gle/jas762TF1Zzs3HU8A'
  }
];

const CommunityOption = [
  {
    label: 'Forum',
    href: 'https://community.strike.org/'
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/StrikeFinance'
  },
  {
    label: 'Telegram',
    href: 'https://t.me/StrikeFinance'
  },
  {
    label: 'Github',
    href: 'https://github.com/StrikeFinance'
  },
  {
    label: 'DeFi Pulse',
    href: 'https://defipulse.com/'
  }
];

const Footer = () => {
  const [isMobile] = useWindowResizeMobile(769);
  const history = useHistory();
  return (
    <div className="footer">
      <div className="footer-content flex just-between">
        <div className="footer-options">
          {isMobile ? (
            <>
              <Row>
                <Col xs={24}>
                  <div className="about-title">About Us</div>
                  <div className="about-description">
                    The Strike Finance is a centralized money market built on
                    the Ethereum that enables users to borrow and supply
                    collateral onto the platform without central authority or
                    control.
                  </div>
                </Col>
              </Row>
              <Row gutter={[20, 20]}>
                <Col xs={12} sm={12} lg={6} xl={6}>
                  <div className="title">Protocol</div>
                  <div className="options">
                    {ProtocolOption.map((protocol, index) => (
                      <div key={index} className="option">
                        {protocol?.label === 'Terms' ? (
                          <div onClick={() => history.push('/terms')}>
                            {protocol?.label}
                          </div>
                        ) : (
                          <a
                            href={protocol?.href}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {protocol?.label}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </Col>
                <Col xs={12} sm={12} lg={6} xl={6}>
                  <div className="title">Governance</div>
                  <div className="options">
                    {GovernanceOption.map((protocol, index) => (
                      <div key={index} className="option">
                        <a
                          href={protocol?.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {protocol?.label}
                        </a>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
              <Row gutter={[20, 20]}>
                <Col xs={12} sm={12} lg={6} xl={6}>
                  <div className="title">Comunity</div>
                  <div className="options">
                    {CommunityOption.map((protocol, index) => (
                      <div key={index} className="option">
                        <a
                          href={protocol?.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {protocol?.label}
                        </a>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
            </>
          ) : (
            <div className="desktop-menu">
              <div className="menu">
                <div className="title">About Us</div>
                <div className="description">
                  The Strike Finance is a centralized money market built on the
                  Ethereum that enables users to borrow and supply collateral
                  onto the platform without central authority or control.
                </div>
              </div>
              <div className="menu">
                <div className="title">Protocol</div>
                <div className="options">
                  {ProtocolOption.map((protocol, index) => (
                    <div key={index} className="option">
                      {protocol?.label === 'Terms' ? (
                        <div onClick={() => history.push('/terms')}>
                          {protocol?.label}
                        </div>
                      ) : (
                        <a
                          href={protocol?.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {protocol?.label}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="menu">
                <div className="title">Governance</div>
                <div className="options">
                  {GovernanceOption.map((protocol, index) => (
                    <div key={index} className="option">
                      <a href={protocol?.href} target="_blank" rel="noreferrer">
                        {protocol?.label}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <div className="menu">
                <div className="title">Comunity</div>
                <div className="options">
                  {CommunityOption.map((protocol, index) => (
                    <div key={index} className="option">
                      <a href={protocol?.href} target="_blank" rel="noreferrer">
                        {protocol?.label}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="latest-block-wrapper">
        <div className="footer-logo">
          <img src={footerImg} alt="footer" />
        </div>
        <div className="copyright">
          © Strike.org {new Date().getUTCFullYear()} all rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
