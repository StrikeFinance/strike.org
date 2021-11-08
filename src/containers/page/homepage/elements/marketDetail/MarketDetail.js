import BigNumber from 'bignumber.js';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { promisify } from 'utilities/promisify';
import * as constants from 'utilities/constants';
import WrapLayout from 'containers/Layout/WrapLayout/WrapLayout';
import BackButton from 'containers/page/homepage/elements/backButton/BackButton';
import LoadingSpinner from 'components/Basic/LoadingSpinner';
import InterestRateModel from './interestRateModel/InterestRateModel';
import './MarketDetail.scss';
import MarketInfo from './marketInfo/MarketInfo';
import MarketSummary from './marketSummary/MarketSummary';
import SynchronizeChart from 'containers/page/homepage/elements/synchronizeChart/SynchronizeChart';
import { accountActionCreators } from 'core/modules/account/actions';
import { connectAccount } from 'core/modules/account/connectAccount';

let timeStamp = 0;
const abortController = new AbortController();

const MarketDetail = ({
  settings,
  match,
  getMarketHistory,
  getGovernanceStrike,
  getDecimals
}) => {
  const [currentAsset, setcurrentAsset] = useState(
    match.params.asset.toLowerCase()
  );
  const [marketInfo, setmarketInfo] = useState();
  const [marketType, setmarketType] = useState('supply');
  const [decimal, setdecimal] = useState();
  const [data, setData] = useState([]);

  const getMarket = async () => {
    const res = await promisify(getGovernanceStrike, {});
    if (!res.status) {
      return;
    }
    if (res.data.markets && res.data.markets.length > 0 && currentAsset) {
      const info = res.data.markets.find(
        item => item.underlyingSymbol.toLowerCase() === currentAsset
      );
      setmarketInfo(info || {});
    }
  };

  const getGraphData = useCallback(
    async (asset, type) => {
      const tempData = [];
      await promisify(getMarketHistory, { asset, type }).then(res => {
        res.data.result.forEach(m => {
          tempData.push({
            createdAt: m.createdAt,
            supplyApy: +new BigNumber(m.supplyApy || 0).dp(8, 1).toString(10),
            borrowApy: +new BigNumber(m.borrowApy || 0).dp(8, 1).toString(10),
            totalSupply: +(new BigNumber(m.totalSupply || 0).dp(8, 1).toString(10)),
            totalBorrow: +(new BigNumber(m.totalBorrow || 0).dp(8, 1).toString(10))
          });
        });
        setData([...tempData.reverse()]);
      });
    },
    [getMarketHistory]
  );

  useEffect(() => {
    if (timeStamp % 60 === 0 && currentAsset) {
      getGraphData(
        constants.CONTRACT_SBEP_ADDRESS[currentAsset].address,
        '1day'
      );
    }
    timeStamp = Date.now();
    return function cleanup() {
      abortController.abort();
    };
  }, [settings.selectedAddress, currentAsset, getGraphData]);

  const getDecimal = async () => {
    const res = await promisify(getDecimals, {});
    if (!res.status) {
      return;
    }
    setdecimal(res.data);
  };

  useEffect(() => {
    getGraphData(constants.CONTRACT_SBEP_ADDRESS[currentAsset].address, '1day');
    getDecimal();
    getMarket();
  }, []);

  useEffect(() => {
    if (currentAsset) {
      getGraphData(
        constants.CONTRACT_SBEP_ADDRESS[currentAsset].address,
        '1day'
      );
    }
  }, [currentAsset]);

  useEffect(() => {
    setcurrentAsset(match.params.asset.toLowerCase());
  }, [match]);

  return (
    <WrapLayout>
      <div className="market-detail">
        {marketInfo ? (
          <>
            <BackButton title="Market" />
            <MarketInfo marketType={marketType} marketInfo={marketInfo} />
            <div className="card-chart">
              <div className="sub-card-chart">
                <div className="market-tab-wrapper">
                  <div className={`tab-item supply-tab ${marketType === 'supply' ? 'tab-active' : ''}`}
                    onClick={() => setmarketType('supply')}
                  >Supply</div>
                  <div className={`tab-item borrow-tab ${marketType === 'borrow' ? 'tab-active' : ''}`}
                    onClick={() => setmarketType('borrow')}
                  >Borrow</div>
                </div>
                <SynchronizeChart marketType={marketType} data={data} />
              </div>
            </div>
            <div className="interes-rate-market-summary">
              <div className="interest-rate">
                <InterestRateModel marketInfo={marketInfo} currentAsset={currentAsset} />
              </div>
              <div className="summary">
                <MarketSummary
                  marketInfo={marketInfo}
                  currentAsset={currentAsset}
                  decimal={decimal}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="loading-spinner" style={{height: `calc(100vh - 400px)`}}>
            <LoadingSpinner />
          </div>
        )}
      </div>
    </WrapLayout>
  );
};

MarketDetail.propTypes = {
  match: PropTypes.object,
  settings: PropTypes.object,
  getMarketHistory: PropTypes.func.isRequired,
  getGovernanceStrike: PropTypes.func.isRequired
};

MarketDetail.defaultProps = {
  match: {},
  settings: {}
};

const mapStateToProps = ({ account }) => ({
  settings: account.setting
});

const mapDispatchToProps = dispatch => {
  const {
    setSetting,
    getMarketHistory,
    getGovernanceStrike,
    getDecimals
  } = accountActionCreators;

  return bindActionCreators(
    {
      setSetting,
      getMarketHistory,
      getGovernanceStrike,
      getDecimals
    },
    dispatch
  );
};

export default compose(
  withRouter,
  connectAccount(mapStateToProps, mapDispatchToProps)
)(MarketDetail);
