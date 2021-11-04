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

function Governance(props) {
  const { getGovernance, history, match } = props;
  const [dataGovernance, setDataGovernance] = useState([]);
  const [currentMatch, setCurrentMatch] = useState();

  const getStatus = p => {
    if (p.state === 'Executed') {
      return 'Passed';
    }
    if (p.state === 'Active') {
      return 'Active';
    }
    if (p.state === 'Defeated') {
      return 'Failed';
    }
    return p.state;
  };

  useEffect(() => {
    if (match?.params && match?.params?.id) {
      setCurrentMatch(match.params.id);
    }
  }, [match]);

  const handleBack = () => {
    history.go(-1);
  };

  const getDataGovernance = useCallback(async () => {
    await promisify(getGovernance, {
      offset: 0,
      limit: 5
    })
      .then(res => {
        setDataGovernance(res?.data?.result);
        const data = res.data.result;

        let dataObj = {};
        const current = data.find(item => item.id === currentMatch);
        console.log(current);
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
            <span className="info-content">{}</span>
            <div className="date-completed">
              <span className="passed">Passed</span>
              <span className="date">003 - Executed October 20th, 2021</span>
            </div>
          </div>
          <div className="text-info__right">
            <div className="hexcode">
              <span>0x9aa835bc7b</span>
              <img src={launchicon} />
            </div>
          </div>
        </div>
      </div>
      {/* End main content */}
      <TableDetail />
      <Description />
    </div>
  );
}

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
  connectAccount(null, mapDispatchToProps)
)(Governance);
