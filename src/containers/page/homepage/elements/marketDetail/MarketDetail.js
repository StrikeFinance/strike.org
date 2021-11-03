import BigNumber from 'bignumber.js';
import WrapLayout from 'containers/Layout/WrapLayout/WrapLayout';
import { accountActionCreators, connectAccount } from 'core';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { promisify } from 'utilities';
import { getBigNumber } from 'utilities/common';
import * as constants from 'utilities/constants';
import BackButton from '../backButton/BackButton';
import { SynchronizeChart } from '../synchronizeChart/SynchronizeChart';
import InterestRateModel from './interestRateModel/InterestRateModel';
import './MarketDetail.scss';
import MarketInfo from './marketInfo/MarketInfo';
import MarketSummary from './marketSummary/MarketSummary';

let timeStamp = 0;
const abortController = new AbortController();

const MarketDetail = ({ settings, match, getMarketHistory }) => {
  console.log('MARKET DETAIL: ', settings, match);
  const [marketType, setMarketType] = useState('supply');
  const [currentAsset, setCurrentAsset] = useState(
    match.params.asset.toLowerCase()
  );
  const [data, setData] = useState([]);
  const [marketInfo, setMarketInfo] = useState({});

  useEffect(() => {
    if (match.params && match.params.asset) {
      setCurrentAsset(match.params.asset.toLowerCase());
    }
  }, [match]);

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

  const setDataToMarketInfo = useCallback(async () => {
    console.log('SET DATA TO MARKET INFO: ', settings);
    if (settings.markets && settings.markets.length > 0 && currentAsset) {
      const info = settings.markets.find(
        item => item.underlyingSymbol.toLowerCase() === currentAsset
      );
      setMarketInfo(info || {});
    }
  }, [settings.markets, currentAsset]);

  useEffect(() => {
    setDataToMarketInfo();
  }, []);

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

  useEffect(() => {
    if (currentAsset) {
      getGraphData(
        constants.CONTRACT_SBEP_ADDRESS[currentAsset].address,
        '1day'
      );
    }
  }, [currentAsset]);

  return (
    <WrapLayout>
      <div className="market-detail">
        <BackButton title="Market" />
        {/* <MarketInfo marketType={'supply'} marketInfo={marketInfo} /> */}
        <div>
          <div className="flex align-center market-tab-wrapper">
            <div className={`tab-item pointer`}>Supply</div>
            <div className={`tab-item pointer`}>Borrow</div>
          </div>
          <SynchronizeChart />
        </div>
        <InterestRateModel />
        <MarketSummary />
      </div>
    </WrapLayout>
  );
};

MarketDetail.propTypes = {
  match: PropTypes.object,
  settings: PropTypes.object,
  getMarketHistory: PropTypes.func.isRequired
};

MarketDetail.defaultProps = {
  match: {},
  settings: {}
};

const mapStateToProps = ({ account }) => ({
  settings: account.setting
});

const mapDispatchToProps = dispatch => {
  const { setSetting, getMarketHistory } = accountActionCreators;

  return bindActionCreators(
    {
      setSetting,
      getMarketHistory
    },
    dispatch
  );
};

export default compose(
  withRouter,
  connectAccount(mapStateToProps, mapDispatchToProps)
)(MarketDetail);
