import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import WrapLayout from 'containers/Layout/WrapLayout/WrapLayout';
import React, { useEffect, useState } from 'react';
import { promisify } from 'utilities';
import { accountActionCreators, connectAccount } from 'core';
import { bindActionCreators } from 'redux';
import Banner from './elements/banner/Banner';
import Governance from './elements/governance/Governance';
import Market from './elements/market/Market';
import Developers from './elements/developers/Developers';
import LoadingSpinner from '../../../components/Basic/LoadingSpinner';

const HomePage = ({ getGovernanceStrike, setSetting }) => {
  const [markets, setmarkets] = useState();
  const getMarket = async () => {
    const res = await promisify(getGovernanceStrike, {});
    if (!res.status) {
      return;
    }
    setmarkets(res.data);
    setSetting(res.data);
  };

  useEffect(() => {
    getMarket();
  }, [getGovernanceStrike]);

  return (
    <WrapLayout>
      {markets ? (
        <div style={{ backgroundColor: '#eceff9' }}>
          <Banner markets={markets} />
          <div>
            <Market markets={markets} />
          </div>
          <div>
            <Governance />
          </div>
          <div>
            <Developers />
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </WrapLayout>
  );
};

const mapDispatchToProps = dispatch => {
  const {
    getGovernanceStrike,
    getDecimals,
    getInterateModel,
    getGovernance,
    getGovernanceStrikeWithParam,
    setSetting
  } = accountActionCreators;

  return bindActionCreators(
    {
      getGovernanceStrike,
      getInterateModel,
      getDecimals,
      getGovernance,
      getGovernanceStrikeWithParam,
      setSetting
    },
    dispatch
  );
};

export default compose(
  withRouter,
  connectAccount(null, mapDispatchToProps)
)(HomePage);
