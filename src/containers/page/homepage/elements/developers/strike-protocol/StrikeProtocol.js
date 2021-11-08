import React from 'react';
import imgWhitepaper from 'assets/img/homepage/img-whitepaper.png';
import './StrikeProtocol.scss';
import { Col, Row } from 'antd';

function StrikeProtocol() {
  const handleLink = url => {
    window.open(url, '_blank');
  };
  return (
    <div className="strike-whitepaper">
      <div className="strike-whitepaper-content flex just-between">
        <Row>
          <Col xs={24} sm={24} md={24} lg={10} xl={10}>
            <div className="content">
              <span className="strike-whitepaper-text">Try Strike Finance</span>
              <div className="text-layer">
                <span>Strike Protocol</span>
                <span>
                  Strike enables users and developers to supply digital assets
                  onto the platform to earn from dynamic rates provided by the
                  protocol and use that supplied asset as collateral to borrow
                  other supported digital assets all on-chain.
                </span>
              </div>
              <div
                onClick={() =>
                  window.open('https://strike.org/Whitepaper.pdf', '_blank')
                }
                className="btn-whitepaper"
              >
                <span>Read The Whitepaper</span>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={14} lg={14} xl={14}>
            <div className="img-dev">
              <img src={imgWhitepaper} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default StrikeProtocol;
