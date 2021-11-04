import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import WrapLayout from 'containers/Layout/WrapLayout/WrapLayout';
import LoadingSpinner from 'components/Basic/LoadingSpinner';
import { accountActionCreators } from 'core/modules/account/actions';
import { connectAccount } from 'core/modules/account/connectAccount';
import { promisify } from 'utilities/promisify';
import Banner from 'containers/page/homepage/elements/banner/Banner';
import Market from 'containers/page/homepage/elements/market/Market';
import Governance from 'containers/page/homepage/elements/governance/Governance';
import Developers from 'containers/page/homepage/elements/developers/Developers';

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
