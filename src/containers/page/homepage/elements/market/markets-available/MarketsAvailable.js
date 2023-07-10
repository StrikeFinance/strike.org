import React, { useEffect, useState } from 'react';
import { accountActionCreators, connectAccount } from 'core';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { promisify } from 'utilities';
import { BigNumber } from 'bignumber.js';
import { useWindowResizeMobile } from 'utilities/hook';
import commaNumber from 'comma-number';
import { Table, Pagination, Card } from 'antd';
import ethImg from 'assets/img/eth.png';
import wbtcImg from 'assets/img/wbtc.png';
import usdcImg from 'assets/img/usdc.png';
import busdImg from 'assets/img/busd.png';
import compImg from 'assets/img/comp.png';
import linkImg from 'assets/img/link.png';
import strkImg from 'assets/img/strk.png';
import uniImg from 'assets/img/uni.png';
import usdtImg from 'assets/img/usdt.png';
import sxpImg from 'assets/img/sxp.png';
import apeImg from 'assets/img/ape.png';
import ustImg from 'assets/img/ust.png';
import daiImg from 'assets/img/dai.png';
import xcnImg from 'assets/img/xcn.png';
import './MarketsAvailable.scss';
import { useHistory } from 'react-router';
import { currencyFormatter } from 'utilities/common';

const format = commaNumber.bindWith(',', '.');
const ICONS = {
  UNI: uniImg,
  ETH: ethImg,
  USDT: usdtImg,
  USDC: usdcImg,
  LINK: linkImg,
  BUSD: busdImg,
  COMP: compImg,
  WBTC: wbtcImg,
  STRK: strkImg,
  SXP: sxpImg,
  APE: apeImg,
  UST: ustImg,
  DAI: daiImg,
  XCN: xcnImg
};
const columns = [
  {
    title: 'Market',
    dataIndex: 'market',
    key: 'market',
    render: (action, record) => (
      <div className="flex symbol">
        <div className="token-type mr-1">
          <img alt="symbol" src={ICONS[record?.underlyingSymbol]} />
        </div>
        <div className="mx-auto">
          <div className="row1">{record?.underlyingName}</div>
          <div className="row2">{record?.underlyingSymbol}</div>
        </div>
      </div>
    )
  },
  {
    title: 'Total Supply',
    dataIndex: 'totalSuplly',
    key: 'totalSupply',
    render: (action, record) => (
      <div className="total-supply">
        <div className="row1">
          <div>{currencyFormatter(record.totalSupplyUsd)}</div>
        </div>
        <div className="row2">
          {format(
            new BigNumber(record?.totalSupplyUsd)
              .div(new BigNumber(record?.tokenPrice))

              .dp(0, 1)
              .toString(10)
          )}{' '}
          {record?.underlyingSymbol}
        </div>
      </div>
    )
  },
  {
    title: 'Supply APY',
    dataImdex: 'supplyAPY',
    key: 'supplyAPY',
    render: (action, record) => (
      <div className="total-supply">
        <div className="row1">
          <div>{record.sAPY}%</div>
        </div>
        <div className="row2">
          {new BigNumber(record?.supplyStrikeApy).dp(2, 1).toString(10)}
          {`%`}
        </div>
      </div>
    )
  },
  {
    title: 'Total Borrow',
    dataIndex: 'totalBorrow',
    key: 'totalBorrow',
    render: (action, record) => (
      <div className="total-supply">
        <div className="row1">
          <span>{currencyFormatter(record.totalBorrowsUsd)}</span>
        </div>
        <div className="row2">
          {format(
            new BigNumber(record.totalBorrowsUsd)
              .div(new BigNumber(record.tokenPrice))
              .dp(0, 1)
              .toString(10)
          )}{' '}
          {record.underlyingSymbol}
        </div>
      </div>
    )
  },
  {
    title: 'Borrow APY',
    dataIndex: 'borrowAPY',
    key: 'borrowAPY',
    render: (action, record) => (
      <div className="total-supply">
        <div className="row1">
          <span>{record.bAPY}%</span>
        </div>
        <div className="row2">
          {new BigNumber(record?.borrowStrikeApy).dp(2, 1).toString(10)}
          {`%`}
        </div>
      </div>
    )
  }
];
function MarketsAvailable({ getGovernanceStrikeWithParam }) {
  const [isMobile] = useWindowResizeMobile(768);
  const [markets, setMarkets] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [sortInfo, setSortInfo] = useState({ field: '', sort: 'desc' });
  const history = useHistory();

  const getMarkets = async ({ offset, limit }) => {
    const res = await promisify(getGovernanceStrikeWithParam, {
      offset,
      limit
    });
    const data = res?.data.markets
      .filter(m => m.underlyingSymbol !== 'ZRX' && m.underlyingSymbol !== 'BAT')
      .map(market => {
        return {
          ...market,
          sAPY: new BigNumber(market.supplyApy)
            .plus(new BigNumber(market.supplyStrikeApy))
            .dp(2, 1)
            .toNumber(),
          bAPY: new BigNumber(market.borrowStrikeApy)
            .minus(new BigNumber(market.borrowApy))
            .dp(2, 1)
            .toNumber()
        };
      })
      .sort((a, b) => {
        return new BigNumber(b.totalSupplyUsd)
          .minus(new BigNumber(a.totalSupplyUsd))
          .toNumber();
      });
    setMarkets(data);
    setTotal(res?.data?.total);
  };
  const onChangePage = value => {
    setCurrent(value);
    getMarkets({ offset: (value - 1) * 5, limit: 5 });
  };
  const onRow = record => {
    history.push(`/market/${record.underlyingSymbol}`);
  };

  useEffect(() => {
    let mounted = true;
    getMarkets({ offset: 0, limit: 5 });
    return () => (mounted = false);
  }, []);

  return (
    <div className="markets-available">
      <div className="markets-available-content">
        <div className="title">12 Markets Available</div>
        <Card className="markets-table">
          <div className="title-table">All markets</div>
          <Table
            columns={columns}
            dataSource={markets}
            pagination={false}
            className="table-market"
            onRow={record => ({
              onClick: () => history.push(`/market/${record.underlyingSymbol}`)
            })}
          />
          <div className="pagination">
            <Pagination
              onChange={onChangePage}
              total={total}
              pageSize={5}
              current={current}
            />
          </div>
        </Card>
      </div>
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
MarketsAvailable.propTypes = {
  getGovernanceStrikeWithParam: PropTypes.func.isRequired
};

MarketsAvailable.defaultProps = {};
export default compose(
  withRouter,
  connectAccount(null, mapDispatchToProps)
)(MarketsAvailable);
