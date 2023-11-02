import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
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
import './HomePage.scss';
import Partner from './elements/partner/Partner';
import Exchange from './elements/exchange/Exchange';
import Faq from './elements/faq/Faq';

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
    const updateTimer = setInterval(() => {
      getMarket();
    }, 3000);
    return function cleanup() {
      if (updateTimer) {
        clearInterval(updateTimer);
      }
    };
  }, []);

  return (
    <WrapLayout>
      <div className="main-container">
        <Banner markets={markets} />
        <Partner />
        {markets ? (
          <div className="market-area" id="market">
            <Market markets={markets} />
          </div>
        ) : (
          <div
            className="loading-spinner"
            style={{ height: `calc(100vh - 443px)` }}
          >
            <LoadingSpinner />
          </div>
        )}
        <Governance />
        <Developers />
        <Exchange />
        <Faq />
      </div>
    </WrapLayout>
  );
};

HomePage.propTypes = {
  getGovernanceStrike: PropTypes.func.isRequired,
  setSetting: PropTypes.func.isRequired
};

HomePage.defaultProps = {};

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
