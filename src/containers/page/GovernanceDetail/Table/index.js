import React, { useState, useEffect } from 'react';
import './styles.scss';
import { Progress, Divider } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import BigNumber from 'bignumber.js';

function TableDetail(props) {
  const { votePoint, id, againstVote } = props;
  const [forPercent, setForPercent] = useState(0);
  const [againstPercent, setAgainstPercent] = useState(0);

  const dataTableLeft = Array.from(Array(5)).map(_ => ({
    address: '0x9aa835bc7b',
    vote: '321,017.7413'
  }));
  return (
    <div className="table-detail-content flex just-between">
      {/* Content Left */}
      <div className="table-detail-content__left">
        <div className="children-content">
          <div className="progress-info">
            <div className="info-number">
              <span>For</span>
              <span>{votePoint[id]}</span>
            </div>
            <Progress percent={100} showInfo={false} status="active" />
          </div>
          <Divider />
          <div className="address-vote">
            <span>13 Addresses</span>
            <span>Votes</span>
          </div>
          <Divider />

          {dataTableLeft.map((item, index) => {
            return (
              <div className="addressed-votes-info" key={index}>
                <span className="addressed-votes-info__left">
                  {item.address}
                </span>
                <span className="addressed-votes-info__right">{item.vote}</span>
              </div>
            );
          })}
        </div>
      </div>
      {/* End content left */}
      <div className="table-detail-content__right">
        <div className="children-content">
          <div className="progress-info">
            <div className="info-number">
              <span>Against</span>
              <span>{againstVote[id]}</span>
            </div>
            <Progress percent={0} showInfo={false} status="active" />
          </div>
          <Divider />
          <div className="address-vote">
            <span>13 Addresses</span>
            <span>Votes</span>
          </div>
          <Divider />
            {dataTableLeft.map((item, index) => {
              return (
                <div className="addressed-votes-info" key={index}>
                  <span className="addressed-votes-info__left">
                    {item.address}
                  </span>
                  <span className="addressed-votes-info__right">
                    {item.vote}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default TableDetail;
