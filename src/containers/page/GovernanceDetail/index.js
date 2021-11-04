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

function Governance(props) {
  const { getGovernance, history, match } = props;
  const [governanceInfo, setGovernanceInfo] = useState({});
  const [id, setId] = useState(match.params.id);
  const [date, setDate] = useState({});
  const [proposer, setProposer] = useState({});
  const [governanceStatus, setGovernanceStatus] = useState({});
  const [votePoint, setVotePoint] = useState({});
  const [againstVote,setAgainstVote] = useState({})

  const handleBack = () => {
    history.go(-1);
  };

  useEffect(() => {
    if (match.params && match.params.id) {
      setId(match.params.id);
    }
  }, [match]);

  const getDataGovernance = useCallback(async () => {
    await promisify(getGovernance, {
      offset: 0,
      limit: 5
    })
      .then(res => {
        const data = res.data.result;
        let dataObj = {};
        let statusObj = {};
        let dateObj = {};
        let proposerObj = {};
        let votePoint = {};
        let againstVote = {}
        data.forEach(item => {
          dataObj = {
            ...dataObj,
            [item.id]: item.description
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
            [item.id]: item.forVotes
          };
          againstVote = {
            ...againstVote,
            [item.id]: item.againstVotes
          }
        });
        setGovernanceInfo(dataObj);
        setGovernanceStatus(statusObj);
        setDate(dateObj);
        setProposer(proposerObj);
        setVotePoint(votePoint);
        setAgainstVote(againstVote)
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
                <span className="defeated">defeated</span>
              ) : governanceStatus[id] === 'Active' ? (
                <span className="active">active</span>
              ) : null}

              <span className="date">
                003 - Executed {moment(date[id]).format('MMMM Do, YYYY')}
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
      <TableDetail votePoint={votePoint} id={id} againstVote={againstVote} />
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
    getGovernanceStrikeWithParam
  } = accountActionCreators;

  return bindActionCreators(
    {
      getGovernanceStrike,
      getInterateModel,
      getDecimals,
      getGovernance,
      getGovernanceStrikeWithParam
    },
    dispatch
  );
};

export default compose(
  withRouter,
  connectAccount(mapStateToProps, mapDispatchToProps)
)(Governance);