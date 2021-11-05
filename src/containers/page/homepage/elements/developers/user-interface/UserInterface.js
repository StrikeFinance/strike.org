import React from 'react';
import './UserInterface.scss';
import imgMacbook from 'assets/img/homepage/Macbook.png';
import { Col, Row } from 'antd';

const StrikeProtocol = () => {
  const handleLink = url => {
    window.open(url, '_blank');
  };
  return (
    <div className="strike-protocols">
      <div className="strike-protocol-content flex just-between">
        <Row className="Row">
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className="img-dev">
              <img src={imgMacbook} className="img-macbook" />
            </div>
          </Col>
          <Col xs={24} sm={24} md={10} lg={12} xl={12}>
            <div className="content">
              <span className="strike-finance">Try Strike Finance</span>
              <div className="text-layer">
                <span>Friendly user interface</span>
                <span>
                  The Strike App enables users access to a fully decentralized
                  money market powered on Ethereum 24/7/365 with a
                  user-interface, api, or smart contracts.
                </span>
              </div>
              <div
                onClick={() => window.open('https://app.strike.org/', '_blank')}
                className="btn-launchapp"
              >
                <span>Launch App</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default StrikeProtocol;
