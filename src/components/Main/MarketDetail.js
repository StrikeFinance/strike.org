/* eslint-disable no-useless-escape */
import BigNumber from 'bignumber.js';
import LoadingSpinner from 'components/Basic/LoadingSpinner';
import OverviewChart from 'components/Basic/OverviewChart';
import InterestRateModel from 'components/MarketDetail/InterestRateModel';
import MarketInfo from 'components/MarketDetail/MarketInfo';
import MarketSummary from 'components/MarketDetail/MarketSummary';
import MainLayout from 'containers/Layout/MainLayout';
import { accountActionCreators, connectAccount } from 'core';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { promisify } from 'utilities';
import { getBigNumber } from 'utilities/common';
import * as constants from 'utilities/constants';

const MarketDetailWrapper = styled.div`
  height: 100%;

  .market-detail-content {
    width: 100%;
    padding: 20px 40px 20px 0px;
    padding: 40px 84px 20px;

    @media only screen and (max-width: 1440px) {
      flex-direction: column;
    }
    @media only screen and (max-width: 768px) {
      padding: 20px;
    }
    .column1 {
      width: 440px;
      min-width: 440px;
      height: 100%;
      margin-right: 10px;
      @media only screen and (max-width: 1440px) {
        width: 100%;
        min-width: unset;
        margin-right: 0px;
        margin-bottom: 20px;
      }
    }

    .column2 {
      width: 100%;
      height: 100%;
      margin-left: 10px;
      @media only screen and (max-width: 1440px) {
        width: 100%;
        margin-left: 0px;
      }
      .row1 {
        margin-bottom: 20px;
        .market-tab-wrapper {
          margin-bottom: 25px;
          .tab-item {
            font-size: 17px;
            font-weight: 900;
            color: #86868a;
            &:not(:last-child) {
              margin-right: 54px;
            }
          }
          .tab-active {
            color: var(--color-text-main);
          }
        }
      }
      .row2 {
        @media only screen and (max-width: 768px) {
          flex-direction: column;
        }
        .interest-rate-modal {
          width: 100%;
          border-radius: 5px;
          background-color: var(--color-bg-primary);
          padding: 25px 32px;
          flex: 1;
          margin-right: 10px;
          @media only screen and (max-width: 768px) {
            margin-right: 0px;
            margin-bottom: 20px;
          }
        }
        .market-summary {
          flex: 1;
          margin-left: 10px;
          @media only screen and (max-width: 768px) {
            margin-left: 0px;
          }
        }
      }
    }
  }
`;

const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: var(--color-bg-primary);
  padding: 25px 32px;
`;

const SpinnerWrapper = styled.div`
  height: 85vh;
  width: 100%;

  @media only screen and (max-width: 1440px) {
    height: 70vh;
  }
`;

let timeStamp = 0;
const abortController = new AbortController();

function MarketDetail({ match, settings, getMarketHistory }) {
  const [marketType, setMarketType] = useState('supply');
  const [currentAsset, setCurrentAsset] = useState(
    match.params.asset.toLowerCase()
  );
  const [data, setData] = useState([]);
  const [marketInfo, setMarketInfo] = useState({});
  const [currentAPY, setCurrentAPY] = useState(0);

  const dataFake = [
    {
      createdAt: '2021-10-26T10:26:36.000Z',
      supplyApy: 0.421396976,
      borrowApy: 1.8264803697,
      totalSupply: 24893100.1111998,
      totalBorrow: 7229480.98807704
    },
    {
      createdAt: '2021-09-16T09:56:29.000Z',
      supplyApy: 0.415121377976,
      borrowApy: 1.8127349,
      totalSupply: 27566705.79439152,
      totalBorrow: 7229498.988098714
    },
    {
      createdAt: '2021-09-04T09:47:59.000Z',
      supplyApy: 0.654987,
      borrowApy: 1.98703697,
      totalSupply: 2698136.1111998,
      totalBorrow: 987415.98807704
    },
    {
      createdAt: '2021-08-07T23:01:48.000Z',
      supplyApy: 0.421396976,
      borrowApy: 1.8264803697,
      totalSupply: 14524587.1111998,
      totalBorrow: 5214568.98807704
    },
    {
      createdAt: '2021-07-12T14:09:48.000Z',
      supplyApy: 0.421396976,
      borrowApy: 1.8264803697,
      totalSupply: 98754268.1111998,
      totalBorrow: 12458796.98807704
    },
    {
      createdAt: '2021-04-15T22:27:34.000Z',
      supplyApy: 0.421396976,
      borrowApy: 1.8264803697,
      totalSupply: 12456587.1111998,
      totalBorrow: 46798125.98807704
    }
  ];

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
        // setData([...tempData.reverse()]);
        setData([...dataFake.reverse()]);
      });
    },
    [getMarketHistory]
  );

  const getGovernanceData = useCallback(async () => {
    if (settings.markets && settings.markets.length > 0 && currentAsset) {
      const info = settings.markets.find(
        item => item.underlyingSymbol.toLowerCase() === currentAsset
        );
      setMarketInfo(info || {});
    }
  }, [settings.markets, currentAsset]);

  useEffect(() => {
    getGovernanceData();
  }, [getGovernanceData]);

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
    if (settings.assetList && settings.assetList.length > 0 && currentAsset) {
      const currentMarketInfo =
        settings.assetList.filter(s => s.id === currentAsset).length !== 0
          ? settings.assetList.filter(s => s.id === currentAsset)[0]
          : {};
      const supplyApy = getBigNumber(currentMarketInfo.supplyApy);
      const borrowApy = getBigNumber(currentMarketInfo.borrowApy);
      const supplyApyWithSTRK = supplyApy.plus(currentMarketInfo.strkSupplyApy); // supplyApy;
      const borrowApyWithSTRK = getBigNumber(currentMarketInfo.strkBorrowApy).minus(borrowApy); // borrowApy;
      setCurrentAPY(
        marketType === 'supply'
          ? supplyApyWithSTRK.dp(2, 1).toString(10)
          : borrowApyWithSTRK.dp(2, 1).toString(10)
      );
    }
  }, [currentAsset, marketType, settings.assetList]);

  useEffect(() => {
    if (currentAsset) {
      getGraphData(
        constants.CONTRACT_SBEP_ADDRESS[currentAsset].address,
        '1day'
      );
    }
  }, [currentAsset]);

  return (
    <MainLayout title="Market">
      <MarketDetailWrapper className="flex">
        {(!settings.selectedAddress ||
          !settings.markets ||
          !currentAsset ||
          settings.accountLoading) && (
          <SpinnerWrapper>
            <LoadingSpinner />
          </SpinnerWrapper>
        )}
        {settings.selectedAddress &&
          settings.markets &&
          settings.decimals &&
          currentAsset &&
          !settings.accountLoading && (
            <div className="flex market-detail-content">
              <div className="column2">
                <MarketInfo marketInfo={marketInfo} marketType={marketType} />
                <div className="row1">
                  <CardWrapper>
                    <div className="flex align-center market-tab-wrapper">
                      <div
                        className={`tab-item pointer ${marketType === 'supply' ? 'tab-active' : ''}`}
                        onClick={() => setMarketType('supply')}
                      >
                        Supply
                      </div>
                      <div
                        className={`tab-item pointer ${marketType === 'borrow' ? 'tab-active' : ''}`}
                        onClick={() => setMarketType('borrow')}
                      >
                        Borrow
                      </div>
                    </div>
                    <OverviewChart marketType={marketType} graphType="composed" data={data} />
                  </CardWrapper>
                </div>
                <div className="flex row2">
                  <div className="interest-rate-modal">
                    <InterestRateModel currentAsset={currentAsset} marketInfo={marketInfo} />
                  </div>
                  <CardWrapper className="market-summary">
                    <MarketSummary
                      marketInfo={marketInfo}
                      currentAsset={currentAsset}
                    />
                  </CardWrapper>
                </div>
              </div>
            </div>
          )}
      </MarketDetailWrapper>
    </MainLayout>
  );
}

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
