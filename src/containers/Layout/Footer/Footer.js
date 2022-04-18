import React from 'react';
import footerImg from 'assets/img/footer-logo.png';
import './Footer.scss';
import { Col, Row } from 'antd';
import { useWindowResizeMobile } from 'utilities/hook';
import { useHistory } from 'react-router-dom';

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
  const [isMobile] = useWindowResizeMobile(768);
  const history = useHistory();
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
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
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
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
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
          © {new Date().getUTCFullYear()} Strike.org All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
