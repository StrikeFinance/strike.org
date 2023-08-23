import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import moment from 'moment';
import { Icon, Progress, Pagination, Divider } from 'antd';
import commaNumber from 'comma-number';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';
import WrapLayout from 'containers/Layout/WrapLayout/WrapLayout';
import BackButton from 'containers/page/homepage/elements/backButton/BackButton';
import { accountActionCreators } from 'core/modules/account/actions';
import { connectAccount } from 'core/modules/account/connectAccount';
import './GovernanceAddressDetail.scss';
import { promisify } from 'utilities';
import launchicon from 'assets/img/governance-detail/launch.svg';

import user from 'assets/img/governance-detail/user.png';
import complete from 'assets/img/governance-detail/Shape.png';
import { useWindowResizeMobile } from 'utilities/hook';
import TransectionMobile from './TransactionMobile';

const format = commaNumber.bindWith(',', '.');
const GovernanceAddressDetail = ({
  match,
  getVoterDetail,
  getVoterHistory
}) => {
  const [holdingInfo, setHoldingInfo] = useState({});
  const [data, setData] = useState([]);
  const [address, setAddress] = useState('');
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const [voteHistoryData, setvoteHistoryData] = useState([]);
  const [isMobile] = useWindowResizeMobile(812);
  const history = useHistory();
  const getDate = timestamp => {
    const startDate = moment(timestamp * 1000);
    const curDate = moment(new Date());
    const duration = moment.duration(curDate.diff(startDate));

    const days = Math.floor(duration.asDays());
    const hours = Math.floor(duration.asHours()) - days * 24;
    return `${days} days${hours ? `, ${hours}hrs` : ''} ago`;
  };

  const loadVoterDetail = async () => {
    await promisify(getVoterDetail, { address: match.params.address })
      .then(res => {
        if (res.data) {
          setHoldingInfo({
            balance: new BigNumber(res.data.balance)
              .div(new BigNumber(10).pow(18))
              .dp(4, 1)
              .toString(10),
            delegates: res.data.delegates.toLowerCase(),
            delegateCount: res.data.delegateCount || 0,
            votes: new BigNumber(res.data.votes)
              .div(new BigNumber(10).pow(18))
              .dp(4, 1)
              .toString(10)
          });
          setAddress(res.data.delegates);
          // setTransactions(res.data.txs);
          const tempData = [];
          res.data.txs.forEach(tx => {
            if (tx.type === 'vote') {
              tempData.push({
                action: tx.support ? 'Received Votes' : 'Lost Votes',
                age: getDate(tx.blockTimestamp),
                result: format(
                  new BigNumber(tx.votes)
                    .div(new BigNumber(10).pow(18))
                    .dp(4, 1)
                    .toString(10)
                ),
                isReceived: tx.support
              });
            } else {
              tempData.push({
                action:
                  tx.to.toLowerCase() === address.toLowerCase()
                    ? 'Received STRK'
                    : 'Sent STRK',
                age: getDate(tx.blockTimestamp),
                result: format(
                  new BigNumber(tx.amount)
                    .div(new BigNumber(10).pow(18))
                    .dp(4, 1)
                    .toString(10)
                ),
                isReceived: tx.to.toLowerCase() === address.toLowerCase()
              });
            }
          });
          setData([...tempData]);
        }
      })
      .catch(() => {
        setHoldingInfo({});
      });
  };

  const loadVoterHistory = async () => {
    await promisify(getVoterHistory, { address: match.params.address })
      .then(res => {
        setvoteHistoryData(res.data.result);
        setTotal(res.data.total);
      })
      .catch(() => {});
  };

  const loadVoteHistoryWithParam = async (offset, limit) => {
    await promisify(getVoterHistory, {
      address: match.params.address,
      offset,
      limit
    })
      .then(res => {
        setvoteHistoryData(res.data.result);
        setTotal(res.data.total);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (match.params && match.params.address) {
      loadVoterDetail();
      loadVoterHistory();
    }
  }, [match]);

  const handleLink = () => {
    window.open(
      `${process.env.REACT_APP_ETH_EXPLORER}/address/${address}`,
      '_blank'
    );
  };

  const onChangePage = value => {
    setCurrent(value);
    loadVoteHistoryWithParam({ offset: (value - 1) * 5, limit: 5 });
  };

  const calcAgaintsPercent = item => {
    const totalPercent = new BigNumber(item.proposal.forVotes).plus(
      new BigNumber(item.proposal.againstVotes)
    );
    return new BigNumber(item.proposal.againstVotes * 100)
      .div(totalPercent)
      .isNaN()
      ? '0'
      : new BigNumber(item.proposal.againstVotes * 100)
          .div(totalPercent)
          .toString();
  };

  const calcForPercent = item => {
    const totalPercent = new BigNumber(item.proposal.forVotes).plus(
      new BigNumber(item.proposal.againstVotes)
    );
    return new BigNumber(item.proposal.forVotes * 100).div(totalPercent).isNaN()
      ? '0'
      : new BigNumber(item.proposal.forVotes * 100)
          .div(totalPercent)
          .toString();
  };

  const convertState = state => {
    switch (state) {
      case 'Executed':
        return 'passed';
      case 'Defeated':
        return 'defeated';
      case 'Active':
        return 'active';
      default:
        break;
    }
    return '';
  };

  return (
    <WrapLayout showMenu={false}>
      <BackButton title="Details" />
      <div className="governance-address-detail">
        <div className="address">
          {`${address.substr(0, 4)}...${address.substr(address.length - 4, 4)}`}
        </div>
        <div className="highlight pointer" onClick={() => handleLink()}>
          {address.toLowerCase()}
          <img src={launchicon} alt="icon" className="address-icon" />
        </div>
        <div className="holding-transactions">
          <div className="holding">
            <div className="title">Holding</div>
            <div className="holding-section">
              <div className="label">STRK Balance</div>
              <div className="value">
                {format(holdingInfo.balance || '0.0000')}
              </div>
            </div>
            <div className="holding-section">
              <div className="label">Votes</div>
              <div className="just-between">
                <div className="value">
                  {format(holdingInfo.votes || '0.0000')}
                </div>
                <div className="voting-count">
                  <Icon component={() => <img src={user} alt="user" />} />
                  <span>{holdingInfo.delegateCount || 0}</span>
                </div>
              </div>
              <Progress
                percent={100}
                strokeColor="#277ee6"
                strokeWidth={7}
                showInfo={false}
              />
            </div>
            <div className="holding-section">
              <div className="label">Delegating To</div>
              <div className="value">
                {holdingInfo.delegates !==
                  '0x0000000000000000000000000000000000000000' &&
                holdingInfo.delegates !== address.toLowerCase()
                  ? 'Delegated'
                  : 'Undelegated'}
              </div>
            </div>
          </div>

          {isMobile ? (
            <TransectionMobile data={data} address={address} />
          ) : (
            <div className="transactions">
              <div className="title">Transactions</div>
              <div className="header-text">
                <div className="action-column">Action</div>
                <div className="age-column">Age</div>
                <div className="result-column">Result</div>
              </div>
              <div className="data-list">
                {data &&
                  data.map((item, index) => (
                    <div className="row-text" key={index}>
                      <div className="action-column">{item.action}</div>
                      <div className="age-column">{item.age}</div>
                      {item.isReceived ? (
                        <Icon type="arrow-up" className="green-color" />
                      ) : (
                        <Icon type="arrow-down" className="red-color" />
                      )}
                      <div className="result-column">
                        <div className="result-text">{item.result}</div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="view-more" onClick={() => handleLink()}>
                VIEW MORE
              </div>
            </div>
          )}
        </div>
        <div className="voting-history">
          <div className="header">Voting History</div>
          <div className="body">
            {voteHistoryData.map((item, index) => (
              <div key={index}>
                <div
                  className={`row-${index} voting-history-row`}
                  onClick={() =>
                    history.push(`/governance-detail/${item.proposal.id}`)
                  }
                >
                  <div className="column-1">
                    <div className="history-name">
                      {item.proposal.description.split('\n')[0]}
                    </div>
                    <div>
                      <span className={`${convertState(item.proposal.state)}`}>
                        {convertState(item.proposal.state)}
                      </span>
                      <span className="completed-date">
                        {`${item.proposal.id} - ${item.proposal.state} ${moment(
                          item.proposal.createdAt
                        ).format('MMMM Do, YYYY')}`}
                      </span>
                    </div>
                  </div>
                  <div className="column-2">
                    {parseInt(calcForPercent(item), 10) === 0 ? null : (
                      <Progress
                        percent={parseInt(calcForPercent(item), 10)}
                        strokeColor="#277ee6"
                        strokeWidth={7}
                        showInfo={false}
                      />
                    )}
                    {parseInt(calcAgaintsPercent(item), 10) === 0 ? null : (
                      <Progress
                        percent={parseInt(calcAgaintsPercent(item), 10)}
                        strokeColor="#277ee6"
                        strokeWidth={7}
                        showInfo={false}
                      />
                    )}
                  </div>
                  <div className="column-3">
                    <Icon
                      className={item.support ? 'agree' : 'against'}
                      theme="filled"
                      component={() => <img src={complete} alt="complete" />}
                    />
                    <span className="for-or-against">
                      {item.support ? 'For' : 'Against'}
                    </span>
                  </div>
                </div>
                <Divider style={{ marginTop: '16px!important' }} />
              </div>
            ))}
          </div>
          {voteHistoryData && voteHistoryData.length !== 0 && (
            <div className="pagination">
              <Pagination
                onChange={onChangePage}
                total={total}
                pageSize={5}
                current={current}
              />
            </div>
          )}
        </div>
      </div>
    </WrapLayout>
  );
};

GovernanceAddressDetail.propTypes = {
  match: PropTypes.object,
  getVoterDetail: PropTypes.func.isRequired,
  getVoterHistory: PropTypes.func.isRequired
};

GovernanceAddressDetail.defaultProps = {
  match: {}
};

const mapDispatchToProps = dispatch => {
  const { getVoterDetail, getVoterHistory } = accountActionCreators;

  return bindActionCreators(
    {
      getVoterDetail,
      getVoterHistory
    },
    dispatch
  );
};

export default compose(
  withRouter,
  connectAccount(null, mapDispatchToProps)
)(GovernanceAddressDetail);
