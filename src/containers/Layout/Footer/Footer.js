import React from 'react';
import { FormattedMessage } from 'react-intl';
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
    label: 'Bug_Bounty',
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
    label: 'Grant_Program',
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
    label: 'DeFi_Pulse',
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
                  <div className="about-title">
                    <FormattedMessage id="About_Us" />
                  </div>
                  <div className="about-description">
                    <FormattedMessage id="About_Us_desc" />
                  </div>
                </Col>
              </Row>
              <Row gutter={[20, 20]}>
                <Col xs={24} sm={12} lg={6} xl={6}>
                  <div className="title">
                    <FormattedMessage id="Protocol" />
                  </div>
                  <div className="options">
                    {ProtocolOption.map((protocol, index) => (
                      <div key={index} className="option">
                        {protocol?.label === 'Terms' ? (
                          <div onClick={() => history.push('/terms')}>
                            <FormattedMessage id={protocol?.label} />
                          </div>
                        ) : (
                          <a
                            href={protocol?.href}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <FormattedMessage id={protocol?.label} />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </Col>
                <Col xs={24} sm={12} lg={6} xl={6}>
                  <div className="title">
                    <FormattedMessage id="Governance" />
                  </div>
                  <div className="options">
                    {GovernanceOption.map((protocol, index) => (
                      <div key={index} className="option">
                        <a
                          href={protocol?.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FormattedMessage id={protocol?.label} />
                        </a>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
              <Row gutter={[20, 20]}>
                <Col xs={24} sm={12} lg={6} xl={6}>
                  <div className="title">
                    <FormattedMessage id="Community" />
                  </div>
                  <div className="options">
                    {CommunityOption.map((protocol, index) => (
                      <div key={index} className="option">
                        <a
                          href={protocol?.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FormattedMessage id={protocol?.label} />
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
                <div className="title">
                  <FormattedMessage id="About_Us" />
                </div>
                <div className="description">
                  <FormattedMessage id="About_Us_desc" />
                </div>
              </div>
              <div className="menu">
                <div className="title">
                  <FormattedMessage id="Protocol" />
                </div>
                <div className="options">
                  {ProtocolOption.map((protocol, index) => (
                    <div key={index} className="option">
                      {protocol?.label === 'Terms' ? (
                        <div onClick={() => history.push('/terms')}>
                          <FormattedMessage id={protocol?.label} />
                        </div>
                      ) : (
                        <a
                          href={protocol?.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FormattedMessage id={protocol?.label} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="menu">
                <div className="title">
                  <FormattedMessage id="Governance" />
                </div>
                <div className="options">
                  {GovernanceOption.map((protocol, index) => (
                    <div key={index} className="option">
                      <a href={protocol?.href} target="_blank" rel="noreferrer">
                        <FormattedMessage id={protocol?.label} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <div className="menu">
                <div className="title">
                  <FormattedMessage id="Community" />
                </div>
                <div className="options">
                  {CommunityOption.map((protocol, index) => (
                    <div key={index} className="option">
                      <a href={protocol?.href} target="_blank" rel="noreferrer">
                        <FormattedMessage id={protocol?.label} />
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
          © Strike.org {new Date().getUTCFullYear()}{' '}
          <FormattedMessage id="all_rights_reserved" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
