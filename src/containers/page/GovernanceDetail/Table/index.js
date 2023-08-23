import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { Progress, Divider } from 'antd';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import commaNumber from 'comma-number';
import { useHistory } from 'react-router';

const format = commaNumber.bindWith(',', '.');

function TableDetail(props) {
  const {
    forVotes,
    againstVote,
    emptyNumber,
    list,
    addressNumber,
    listDataAgainst,
    againstAddressNumber,
    emptyAgainstNumber,
    onViewAllFor
  } = props;
  const [forPercent, setForPercent] = useState(0);
  const [againstPercent, setAgainstPercent] = useState(0);
  const [isViewAll, setIsViewAll] = useState(true);

  const history = useHistory();
  useEffect(() => {
    const total = new BigNumber(parseInt(forVotes, 10)).plus(
      new BigNumber(parseInt(againstVote, 10))
    );
    setForPercent(
      new BigNumber(parseInt(forVotes, 10) * 100).div(total).isNaN()
        ? '0'
        : new BigNumber(parseInt(forVotes, 10) * 100).div(total).toString(10)
    );

    setAgainstPercent(
      new BigNumber(parseInt(againstVote, 10) * 100).div(total).isNaN()
        ? '0'
        : new BigNumber(parseInt(againstVote, 10) * 100).div(total).toString(10)
    );
  }, [forVotes, againstVote]);

  const emptyList = [];
  const emptyAgainstList = [];
  if (emptyNumber > 0) {
    for (let i = 0; i < emptyNumber; i += 1) {
      emptyList.push(i);
    }
  }
  if (emptyAgainstNumber > 0) {
    for (let i = 0; i < emptyAgainstNumber; i += 1) {
      emptyAgainstList.push(i);
    }
  }

  return (
    <div className="table-detail-content flex just-between">
      {/* Content Left */}
      <div className="table-detail-content__left">
        <div className="children-content">
          <div className="progress-info">
            <div className="info-number">
              <span>For</span>
              <span>
                {format(
                  new BigNumber(Web3.utils.fromWei(forVotes, 'ether'))
                    .dp(8, 1)
                    .toString(10)
                )}
              </span>
            </div>
            <Progress percent={forPercent} showInfo={false} status="active" />
          </div>
          <Divider />
          <div className="address-vote">
            <span>{addressNumber} Addresses</span>
            <span>Votes</span>
          </div>
          <Divider />
          <div className="scroll-bar">
            {list?.map((item, index) => {
              return (
                <div
                  className="addressed-votes-info"
                  key={index}
                  onClick={() => history.push(`/vote/address/${item.label}`)}
                >
                  <span className="addressed-votes-info__left">
                    {item.label
                      ? `${item.label.substr(0, 5)}...${item.label.substr(
                          -4,
                          4
                        )}`
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
            {isViewAll && addressNumber > 3 && (
              <div
                className="flex align-center just-center view-all pointer"
                onClick={() => {
                  setIsViewAll(false);
                  onViewAllFor();
                }}
              >
                View all
              </div>
            )}
          </div>
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
            <Progress
              percent={againstPercent}
              showInfo={false}
              status="exception"
            />
          </div>
          <Divider />
          <div className="address-vote">
            <span>{againstAddressNumber} Addresses</span>
            <span>Votes</span>
          </div>
          <Divider />
          <div className="scroll-bar">
            {listDataAgainst?.map((item, index) => {
              return (
                <div className="addressed-votes-info" key={index}>
                  <span className="addressed-votes-info__left">
                    {item.label
                      ? `${item.label.substr(0, 5)}...${item.label.substr(
                          -4,
                          4
                        )}`
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
            {emptyAgainstList.map(v => (
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
    </div>
  );
}

TableDetail.propTypes = {
  forVotes: PropTypes.string,
  againstVote: PropTypes.string,
  emptyNumber: PropTypes.number,
  list: PropTypes.arrayOf(PropTypes.object),
  addressNumber: PropTypes.number,
  listDataAgainst: PropTypes.arrayOf(PropTypes.object),
  againstAddressNumber: PropTypes.number,
  emptyAgainstNumber: PropTypes.number,
  onViewAllFor: PropTypes.func.isRequired
};

TableDetail.defaultProps = {
  forVotes: '',
  againstVote: '',
  emptyNumber: 0,
  list: [],
  addressNumber: 0,
  listDataAgainst: [],
  againstAddressNumber: 0,
  emptyAgainstNumber: 0
};

export default TableDetail;
