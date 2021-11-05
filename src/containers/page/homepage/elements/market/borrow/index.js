import React from 'react';
import './styles.scss';
import { Progress } from 'antd';
import commaNumber from 'comma-number';
import BigNumber from 'bignumber.js';
import { Col, Row, Typography } from 'antd';

function TotalBorrow() {
  return (
    <div className="total-borrow">
      <div className="total-borrow-content">
        <Row>
          <Col xs={24} sm={24} md={10} lg={14} xl={14}>
            <Typography>Market</Typography>
            <Typography>
              Supply collateral to Strike while controlling your keys
            </Typography>
            <Typography>
              Strike users control all of their digital assets on a
              non-custodial protocol while earning a variable rate based on
              market demands of that asset. Rates are earned per Ethereum block
              mined
            </Typography>
          </Col>
          <Col xs={24} sm={24} md={10} lg={10} xl={10}></Col>
        </Row>
      </div>
    </div>
  );
}

export default TotalBorrow;
