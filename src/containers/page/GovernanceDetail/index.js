import React, { useEffect, useState, useCallback } from 'react';
import './styles.scss';
import backicon from 'assets/img/governance-detail/back-icon.svg';
import launchicon from 'assets/img/governance-detail/launch.svg';
import { Divider } from 'antd';
import TableDetail from './Table';
import Description from './Description';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { accountActionCreators, connectAccount } from 'core';
import { promisify } from 'utilities';
import moment from 'moment';
import BigNumber from 'bignumber.js';
import commaNumber from 'comma-number';
import Web3 from 'web3';

const format = commaNumber.bindWith(',', '.');

function Governance(props) {
  const { getGovernance, history, match, getIdProposal } = props;
  const [governanceInfo, setGovernanceInfo] = useState({});
  const [id, setId] = useState(match.params.id);
  const [date, setDate] = useState({});
  const [proposer, setProposer] = useState({});
  const [governanceStatus, setGovernanceStatus] = useState({});
  const [votePoint, setVotePoint] = useState({});
  const [againstVote, setAgainstVote] = useState({});
  const [data, setData] = useState([]);

  const handleBack = () => {
    history.go(-1);
  };

  useEffect(() => {
    if (match.params && match.params.id) {
      setId(match.params.id);
    }
  }, [match]);

  // const getIdProposal = useCallback(async () => {
  //   await promisify(getProposalId, {
  //     id: id
  //   }).then();
  // }, []);

  const getDataGovernance = useCallback(async () => {
    await promisify(getGovernance, {
      id: id
    })
      .then(res => {
        const resDataTotal = res.data;
        const data = res.data.result;
        let dataObj = {};
        let statusObj = {};
        let dateObj = {};
        let proposerObj = {};
        let votePoint = {};
        let againstVote = {};
        data.forEach(item => {
          dataObj = {
            ...dataObj,
            [item.id]: item.description.split('\n')[0]
          };
          statusObj = {
            ...statusObj,
            [item.id]: item.state
          };
          dateObj = {
            ...dateObj,
            [item.id]: item.createdAt
          };
          proposerObj = {
            ...proposerObj,
            [item.id]: item.proposer
          };
          votePoint = {
            ...votePoint,
            [item.id]: format(
              new BigNumber(Web3.utils.fromWei(item.forVotes, 'ether'))
                .dp(8, 1)
                .toString(10)
            )
          };
          againstVote = {
            ...againstVote,
            [item.id]: item.againstVotes
          };
        });
        setGovernanceInfo(dataObj);
        setGovernanceStatus(statusObj);
        setDate(dateObj);
        setProposer(proposerObj);
        setVotePoint(votePoint);
        setAgainstVote(againstVote);
        setData(resDataTotal);
      })
      .catch(e => {
        console.log(e);
      });
  }, [getGovernance]);

  useEffect(() => {
    getDataGovernance();
  }, [getDataGovernance]);

  return (
    <div className="governance-detail">
      <div className="governance-detail-header flex just-between">
        <div></div>
        <button className="button-app">Launch App</button>
      </div>
      <div className="back-governance">
        <img onClick={handleBack} src={backicon} />
        <span>Governance</span>
      </div>
      <Divider />
      {/* Main content */}
      <div className="governance-detail-main ">
        <div className="text-info flex just-between">
          <div className="text-info__left">
            <span className="info-content">{governanceInfo[id]}</span>
            <div className="date-completed">
              {governanceStatus[id] === 'Executed' ? (
                <span className="passed">passed</span>
              ) : governanceStatus[id] === 'Defeated' ? (
                <span className="defeated">failed</span>
              ) : governanceStatus[id] === 'Active' ? (
                <span className="active">active</span>
              ) : null}

              <span className="date">
                003 - {governanceStatus[id]}{' '}
                {moment(date[id]).format('MMMM Do, YYYY')}
              </span>
            </div>
          </div>
          <div className="text-info__right">
            <div className="hexcode">
              <span>
                {proposer[id]
                  ? `${proposer[id].substr(0, 5)}...${proposer[id].substr(
                      -4,
                      4
                    )}`
                  : ''}
              </span>
              <img src={launchicon} />
            </div>
          </div>
        </div>
      </div>
      {/* End main content */}
      <TableDetail
        votePoint={
          isNaN(BigNumber(parseInt(votePoint[id]))) ? '0' : votePoint[id]
        }
        id={id}
        againstVote={
          isNaN(BigNumber(parseInt(againstVote[id]))) ? '0' : againstVote[id]
        }
        data={data}
        addressNumber={isNaN(BigNumber(data?.total)) ? 0 : data?.total}
        emptyNumber={4 - (isNaN(BigNumber(data?.total)) ? 0 : data?.total)}
        list={
          data?.result &&
          data?.result.map(v => ({
            label: v.proposer,
            value: v.forVotes
          }))
        }
      />
      {}
      <Description />
    </div>
  );
}

const mapStateToProps = ({ account }) => ({
  settings: account.setting
});

const mapDispatchToProps = dispatch => {
  const {
    getGovernanceStrike,
    getDecimals,
    getInterateModel,
    getGovernance,
    getGovernanceStrikeWithParam,
    getProposalId
  } = accountActionCreators;

  return bindActionCreators(
    {
      getGovernanceStrike,
      getInterateModel,
      getDecimals,
      getGovernance,
      getGovernanceStrikeWithParam,
      getProposalId
    },
    dispatch
  );
};

export default compose(
  withRouter,
  connectAccount(mapStateToProps, mapDispatchToProps)
)(Governance);
