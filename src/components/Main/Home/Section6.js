import React, { useState, useEffect, useCallback } from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';
import { Row, Col, Icon } from 'antd';
import BigNumber from 'bignumber.js';
import PropTypes from 'prop-types';
import commaNumber from 'comma-number';
import { bindActionCreators } from 'redux';
import { connectAccount, accountActionCreators } from 'core';
import { useHistory, withRouter } from 'react-router';
import { promisify } from 'utilities';
import { currencyFormatter } from '../../../utilities/common';
import * as constants from '../../../utilities/constants';

const Section6Wrapper = styled.div`
  width: 100%;
  background-color: var(--color-bg-main);
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;

  @media only screen and (max-width: 768px) {
    padding: 0 20px;
  }
  .market-available {
    text-align: center;
    font-size: 50px;
    font-weight: 500;
    color: #0b0f23;
  }
  .earn-section {
    text-align: center;
    margin: 0 auto;
  }
  .info-item-list {
    width: 1000px;
    border-radius: 20px;
    height: 650px;
    box-shadow: 0px 13px 32px 0 rgba(6, 12, 63, 0.1);
    background-color: #ffffff;

    @media only screen and (max-width: 768px) {
      width: 100%;
    }
  }
`;

const TableWrapper = styled.div`
  margin: 0 auto;
  position: relative;
  width: 100%;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-bg-primary);
  box-sizing: content-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
  border-radius: 8px;
  max-width: 1200px;

  @media (max-width: 768px) {
    margin: 0;
  }

  .table-title {
    font-size: 17px;
    font-weight: 900;
    padding: 20px 30px;
    color: var(--color-text-main);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  .table_header {
    padding: 20px 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    cursor: pointer;
    > div {
      color: var(--color-text-secondary);
      font-weight: bold;
      img {
        width: 16px;
        height: 16px;
        margin: 0 10px;
      }
    }
    @media (max-width: 992px) {
      .total-supply,
      .supply-apy,
      .total-borrow,
      .borrow-apy,
      .price {
        display: none;
      }
    }
  }
  .table_content {
    padding: 0;
    .table_item {
      padding: 15px 20px;
      &:hover {
        background-color: var(--color-bg-active);
        border-left: 2px solid var(--color-blue);
      }
      div {
        color: #39496a
        max-width: 100%;
      }
      .mobile-label {
        display: none;
        @media (max-width: 992px) {
          font-weight: bold;
          display: block;
        }
      }
      .item-title {
        font-weight: 600;
        font-size: 16px;
        color: #39496a
      }
      .item-value {
        font-weight: 600;
        font-size: 14px;
        color: var(--color-green);
      }
      .market {
        .highlight {
          word-break: break-all;
          white-space: break-spaces;
        }
        .asset-img {
          width: 30px;
          height: 30px;
          margin-right: 10px;
        }
      }
    }
  }
`;
const format = commaNumber.bindWith(',', '.');
function Section6({ settings, setSetting, getGovernanceStrike, getDecimals }) {

  const history = useHistory();
  const [sortInfo, setSortInfo] = useState({ field: '', sort: 'desc' });
  const [selectedAddress, setselectedAddress] = useState(null);

  const handleSort = field => {
    setSortInfo({
      field,
      sort:
        sortInfo.field === field && sortInfo.sort === 'desc' ? 'asc' : 'desc'
    });
  };

  const getMarket = async () => {
    const res = await promisify(getGovernanceStrike, {});
    if (!res.status) {
      return;
    }
    setSetting({
      markets: [
        ...res.data.markets.filter(
          m => m.underlyingSymbol !== 'ZRX' && m.underlyingSymbol !== 'BAT'
        )
      ],
      marketVolumeLog: res.data.marketVolumeLog,
      dailyStrike: res.data.dailyStrike,
      // TODO: need update by state when click detail record
      selectedAddress: '0x405bfbd29cfad8cd5513de848064e96fd3db890b',
      accountLoading: false
    });
  };

  useEffect(() => {
    getMarket();
  });

  return (
    <Section6Wrapper id="section6-parent">
      <h3 className="market-available">10 markets available</h3>
      <TableWrapper>
        <div className="table-title">Market Distribution</div>
        <Row className="table_header">
          <Col xs={{ span: 24 }} lg={{ span: 4 }} className="market">
            Market
          </Col>
          <Col xs={{ span: 4 }} lg={{ span: 4 }} className="borrow-apy right">
            <span onClick={() => handleSort('price')}>
              Price{' '}
              {sortInfo.field === 'price' && (
                <Icon
                  type={sortInfo.sort === 'desc' ? 'caret-down' : 'caret-up'}
                />
              )}
            </span>
          </Col>
          <Col xs={{ span: 5 }} lg={{ span: 4 }} className="total-supply right">
            <span onClick={() => handleSort('total_supply')}>
              Total Supply{' '}
              {sortInfo.field === 'total_supply' && (
                <Icon
                  type={sortInfo.sort === 'desc' ? 'caret-down' : 'caret-up'}
                />
              )}
            </span>
          </Col>
          <Col xs={{ span: 5 }} lg={{ span: 4 }} className="supply-apy right">
            <span onClick={() => handleSort('supply_apy')}>
              Supply APY{' '}
              {sortInfo.field === 'supply_apy' && (
                <Icon
                  type={sortInfo.sort === 'desc' ? 'caret-down' : 'caret-up'}
                />
              )}
            </span>
          </Col>
          <Col xs={{ span: 5 }} lg={{ span: 4 }} className="total-borrow right">
            <span onClick={() => handleSort('total_borrow')}>
              Total Borrow{' '}
              {sortInfo.field === 'total_borrow' && (
                <Icon
                  type={sortInfo.sort === 'desc' ? 'caret-down' : 'caret-up'}
                />
              )}
            </span>
          </Col>
          <Col xs={{ span: 5 }} lg={{ span: 4 }} className="borrow-apy right">
            <span onClick={() => handleSort('borrow_apy')}>
              Borrow APY{' '}
              {sortInfo.field === 'borrow_apy' && (
                <Icon
                  type={sortInfo.sort === 'desc' ? 'caret-down' : 'caret-up'}
                />
              )}
            </span>
          </Col>
        </Row>
        <div className="table_content">
          <Row
            className="table_item pointer"
            onClick={() => history.push(`/market/ETH`)}
          >
            <Col
              xs={{ span: 24 }}
              lg={{ span: 4 }}
              className="flex align-center market"
            >
              <img
                className="asset-img"
                src={
                  constants.CONTRACT_TOKEN_ADDRESS.eth
                    ? constants.CONTRACT_TOKEN_ADDRESS.eth.asset
                    : null
                }
                alt="asset"
              />
              <p className="item-title">ETH</p>
            </Col>
            <Col
              xs={{ span: 24 }}
              lg={{ span: 4 }}
              className="total-supply right"
            >
              <p className="mobile-label">Price</p>
              <p className="item-title">
                ${format(new BigNumber('2').toFormat(2))}
              </p>
            </Col>
            <Col
              xs={{ span: 24 }}
              lg={{ span: 4 }}
              className="total-supply right"
            >
              <p className="mobile-label">Total Supply</p>
              <p className="item-title">{currencyFormatter(200)}</p>
              <p className="item-value">
                {format(
                  new BigNumber('987,456')
                    .div(new BigNumber('456,654'))
                    .dp(0, 1)
                    .toString(10)
                )}{' '}
                {'ETH'}
              </p>
            </Col>
            <Col
              xs={{ span: 24 }}
              lg={{ span: 4 }}
              className="supply-apy right"
            >
              <p className="mobile-label">Supply APY</p>
              <p className="item-title">{20}%</p>
              <p className="item-value">
                {new BigNumber('20').dp(2, 1).toString(10)}%
              </p>
            </Col>
            <Col
              xs={{ span: 24 }}
              lg={{ span: 4 }}
              className="total-borrow right"
            >
              <p className="mobile-label">Total Borrow</p>
              <p className="item-title">{currencyFormatter(500)}</p>
              <p className="item-value">
                {format(
                  new BigNumber('22')
                    .div(new BigNumber('50'))
                    .dp(0, 1)
                    .toString(10)
                )}{' '}
                {'ETH'}
              </p>
            </Col>
            <Col
              xs={{ span: 24 }}
              lg={{ span: 4 }}
              className="borrow-apy right"
            >
              <p className="mobile-label">Borrow APY</p>
              <p className="item-title">{2}%</p>
              <p className="item-value">
                {new BigNumber('456,564').dp(2, 1).toString(10)}%
              </p>
            </Col>
          </Row>
        </div>
      </TableWrapper>
    </Section6Wrapper>
  );
}

Section6.propTypes = {
  settings: PropTypes.object,
  setSetting: PropTypes.func.isRequired,
  getGovernanceStrike: PropTypes.func.isRequired
};

const mapStateToProps = ({ account }) => ({
  settings: account.setting
});

const mapDispatchToProps = dispatch => {
  const {
    setSetting,
    getGovernanceStrike,
    getDecimals
  } = accountActionCreators;

  return bindActionCreators(
    {
      setSetting,
      getGovernanceStrike,
      getDecimals
    },
    dispatch
  );
};

Section6.defaultProps = {
  settings: {}
};

export default compose(
  withRouter,
  connectAccount(mapStateToProps, mapDispatchToProps)
)(Section6);
