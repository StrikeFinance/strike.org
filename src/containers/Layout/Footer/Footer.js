import React from 'react';
import footerImg from 'assets/img/footer-logo.png';
import './Footer.scss';
import { Col, Row } from 'antd';
import { useWindowResizeMobile } from 'utilities/hook';

const ProtocolOption = [
  {
    label: 'Market',
    href: ''
  },
  {
    label: 'Documentation',
    href: ''
  },
  {
    label: 'Terms',
    href: ''
  },
  {
    label: 'Bug Bounty',
    href: ''
  }
];
const GovernanceOption = [
  {
    label: 'Proposals',
    href: ''
  },
  {
    label: 'STRK',
    href: ''
  },
  {
    label: 'Leaderboard',
    href: ''
  }
];

const CommunityOption = [
  {
    label: 'Forum',
    href: ''
  },
  {
    label: 'Twitter',
    href: ''
  },
  {
    label: 'Telegram',
    href: ''
  },
  {
    label: 'Github',
    href: ''
  },
  {
    label: 'DeFi Pulse',
    href: ''
  }
];

const Footer = () => {
  const [isMobile] = useWindowResizeMobile(768);
  return (
    <div className="footer">
      <div className="footer-content flex just-between">
        <div className="footer-logo">
          <img src={footerImg} alt="footer" />
        </div>
        <div className="footer-options">
          {isMobile ? (
            <>
              <Row gutter={[20, 20]}>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  <div className="title">Protocol</div>
                  <div className="options">
                    {ProtocolOption.map((protocol, index) => (
                      <div key={index} className="option">
                        <a href={protocol?.href}>{protocol?.label}</a>
                      </div>
                    ))}
                  </div>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  <div className="title">Governance</div>
                  <div className="options">
                    {GovernanceOption.map((protocol, index) => (
                      <div key={index} className="option">
                        <a href={protocol?.href}>{protocol?.label}</a>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
              <Row gutter={[20, 20]}>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  <div className="title">Comunity</div>
                  <div className="options">
                    {CommunityOption.map((protocol, index) => (
                      <div key={index} className="option">
                        <a href={protocol?.href}>{protocol?.label}</a>
                      </div>
                    ))}
                  </div>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  <div
                    className="flex align-center just-center app-btn"
                    onClick={() => {
                      window.open('https://app.strike.org', '_blank');
                    }}
                  >
                    App
                  </div>
                </Col>
              </Row>
            </>
          ) : (
            <Row gutter={[100, 40]}>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <div className="title">Protocol</div>
                <div className="options">
                  {ProtocolOption.map((protocol, index) => (
                    <div key={index} className="option">
                      <a href={protocol?.href}>{protocol?.label}</a>
                    </div>
                  ))}
                </div>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <div className="title">Governance</div>
                <div className="options">
                  {GovernanceOption.map((protocol, index) => (
                    <div key={index} className="option">
                      <a href={protocol?.href}>{protocol?.label}</a>
                    </div>
                  ))}
                </div>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <div className="title">Comunity</div>
                <div className="options">
                  {CommunityOption.map((protocol, index) => (
                    <div key={index} className="option">
                      <a href={protocol?.href}>{protocol?.label}</a>
                    </div>
                  ))}
                </div>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <div
                  className="flex align-center just-center app-btn"
                  onClick={() => {
                    window.open('https://app.strike.org', '_blank');
                  }}
                >
                  App
                </div>
              </Col>
            </Row>
          )}
        </div>
      </div>
      <div className="latest-block-wrapper">
        <div className="copyright">
          © {new Date().getUTCFullYear()} Strike.org All Rights Reserved. The
          Strike Decentralized App does not support US based users.
        </div>
      </div>
    </div>
  );
};

export default Footer;
