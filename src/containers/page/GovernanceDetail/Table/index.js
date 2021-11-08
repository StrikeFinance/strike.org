import React, { useState, useEffect } from 'react';
import './styles.scss';
import { Progress, Divider } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import commaNumber from 'comma-number';

const format = commaNumber.bindWith(',', '.');

function TableDetail(props) {
  const {
    votePoint,
    id,
    againstVote,
    data,
    emptyNumber,
    list,
    addressNumber,
    loadMore
  } = props;
  const [forPercent, setForPercent] = useState(0);
  const [againstPercent, setAgainstPercent] = useState(0);

  useEffect(() => {
    const total = new BigNumber(parseInt(votePoint)).plus(
      new BigNumber(parseInt(againstVote))
    );
    setForPercent(
      isNaN(new BigNumber(parseInt(votePoint) * 100).div(total))
        ? '0'
        : new BigNumber(parseInt(votePoint) * 100).div(total).toString(10)
    );

    setAgainstPercent(
      isNaN(new BigNumber(parseInt(againstVote) * 100).div(total))
        ? '0'
        : new BigNumber(parseInt(againstVote) * 100).div(total).toString(10)
    );
  }, [votePoint, againstVote]);

  const emptyList = [];
  if (emptyNumber > 0) {
    for (let i = 0; i < emptyNumber; i += 1) {
      emptyList.push(i);
    }
  }

  return (
    <div className="table-detail-content flex just-between">
      {/* Content Left */}
      <div
        className="table-detail-content__left"
      >
        <div className="children-content">
          <div className="progress-info">
            <div className="info-number">
              <span>For</span>
              <span>{votePoint}</span>
            </div>
            <div
              style={{
                width: `${forPercent}%`,
                height: '5px',
                borderRadius: ' 27px',
                marginTop: '19px',
                background: 'var(--color-blue)'
              }}
            />
          </div>
          <Divider />
          <div className="address-vote">
            <span>{addressNumber} Addresses</span>
            <span>Votes</span>
          </div>
          <Divider />

          {list?.map((item, index) => {
            return (
              <div className="addressed-votes-info" key={index}>
                <span className="addressed-votes-info__left">
                  {item.label
                    ? `${item.label.substr(0, 5)}...${item.label.substr(-4, 4)}`
                    : ''}
                </span>
                <span className="addressed-votes-info__right">
                  <span>
                    {format(
                      new BigNumber(Web3.utils.fromWei(item.value, 'ether'))
                        .dp(8, 1)
                        .toString(10)
                    )}
                  </span>
                </span>
              </div>
            );
          })}
          {emptyList.map(v => (
            <div
              className="flex align-center just-between vote-item empty-item"
              key={v}
            >
              <span>—</span>
              <span>—</span>
            </div>
          ))}
        </div>
      </div>
      {/* End content left */}
      <div itemType="against" className="table-detail-content__right">
        <div className="children-content">
          <div className="progress-info">
            <div className="info-number">
              <span>Against</span>
              <span>{againstVote}</span>
            </div>
            <div
              style={{
                width: `${againstPercent}%`,
                height: '5px',
                borderRadius: ' 27px',
                marginTop: '19px',
                background: 'var(--color-purple)'
              }}
            />
          </div>
          <Divider />
          <div className="address-vote">
            <span>13 Addresses</span>
            <span>Votes</span>
          </div>
          <Divider />
          {list?.map((item, index) => {
            return (
              <div className="addressed-votes-info" key={index}>
                <span className="addressed-votes-info__left">
                  {item.label
                    ? `${item.label.substr(0, 5)}...${item.label.substr(-4, 4)}`
                    : ''}
                </span>
                <span className="addressed-votes-info__right">
                  {format(
                    new BigNumber(Web3.utils.fromWei(item.value, 'ether'))
                      .dp(8, 1)
                      .toString(10)
                  )}
                </span>
              </div>
            );
          })}
          {emptyList.map(v => (
            <div
              className="flex align-center just-between vote-item empty-item"
              key={v}
            >
              <span>—</span>
              <span>—</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TableDetail;
