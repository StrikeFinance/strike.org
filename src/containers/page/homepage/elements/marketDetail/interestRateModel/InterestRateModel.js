import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import './InterestRateModel.scss';
import { promisify } from 'utilities';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { accountActionCreators, connectAccount } from 'core';
import BigNumber from 'bignumber.js';

const InterestRateModel = ({ currentAsset, getInterateModel, marketInfo, decimal }) => {
  const [percent, setPercent] = useState(null);
  const [tickerPos, setTickerPos] = useState(null);
  const [currentPos, setCurrentPos] = useState(30);
  const [currentPercent, setCurrentPercent] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [series, setSeries] = useState([
    {
      name: 'Supply Apy',
      data: []
    },
    {
      name: 'Borrow Apy',
      data: []
    }
  ]);
  const [colors, setColors] = useState(['#277ee6', '#f9053e']);
  const [options, setOptions] = useState({
    chart: {
      id: 'line-percent',
      type: 'line',
      height: '100%',
      toolbar: {
        show: false
      },
    },
    colors: ['#277ee6', '#f9053e'],
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0,
      style: 'hollow'
    },
    xaxis: {
      show: false,
      type: 'numeric',
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      tooltip: {
        enabled: false
      }
    },
    tooltip: {
      x: {
        show: false
      },
      y: {
        formatter: value => {
          return `${value} %`;
        }
      }
    },
    // legend: {
    //   show: false
    // },
    yaxis: {
      show: false,
    },
    grid: {
      show: false
    }
  });

  const getGraphData = async asset => {
    const vbepContract = await promisify(getInterateModel, { asset });
    const multiplierPerBlock = vbepContract.data.multiplierPerBlock || 0;
    const baseRatePerBlock = vbepContract.data.baseRatePerBlock || 0;
    const data = [];
    const oneMinusReserveFactor = new BigNumber(1).minus(
      new BigNumber(marketInfo.reserveFactor).div(new BigNumber(10).pow(18))
    );
    // Get Current Utilization Rate
    let cash = marketInfo.cash || [];
    cash = new BigNumber(cash).div(new BigNumber(10).pow(18));
    const borrows = new BigNumber(marketInfo.totalBorrows2);
    const reserves = new BigNumber(marketInfo.totalReserves || 0).div(new BigNumber(10).pow(decimal.decimal[asset].token));
    const currentUtilizationRate = borrows.div(cash.plus(borrows).minus(reserves));

    const tempCurrentPercent = parseInt(+currentUtilizationRate.toString(10) * 100, 10);
    setCurrentPercent(tempCurrentPercent || 0);
    const lineElement = document.getElementById('line');
    if (lineElement) {
      setCurrentPos(30 + (lineElement.clientWidth * tempCurrentPercent) / 100);
    }
    for (let i = 0; i <= 1; i += 0.01) {
      const utilizationRate = i;
      // Borrow Rate
      const borrowRate = new BigNumber(utilizationRate).multipliedBy(new BigNumber(multiplierPerBlock)).plus(new BigNumber(baseRatePerBlock));

      // Supply Rate
      const rateToPool = borrowRate.multipliedBy(oneMinusReserveFactor);
      const supplyRate = new BigNumber(utilizationRate).multipliedBy(rateToPool);
      // supply apy, borrow apy
      const blocksPerDay = 20 * 60 * 24;
      const daysPerYear = 365;

      const mantissa = new BigNumber(10).pow(18);
      const supplyBase = supplyRate.div(mantissa).times(blocksPerDay).plus(1);
      const borrowBase = borrowRate.div(mantissa).times(blocksPerDay).plus(1);
      const supplyApy = supplyBase.pow(daysPerYear - 1).minus(1).times(100);
      const borrowApy = borrowBase.pow(daysPerYear - 1).minus(1).times(100);

      data.push({
        percent: i,
        supplyApy: supplyApy.dp(2, 1).toString(10),
        borrowApy: borrowApy.dp(2, 1).toString(10)
      });
    }
    setGraphData(data);
    setSeries([
      {
        name: 'Supply Apy',
        data: data.map(item => {
          const temp = [];
          temp.push(item.percent * 100);
          temp.push(item.supplyApy);
          return temp;
        })
      },
      {
        name: 'Borrow Apy',
        data: data.map(item => {
          const temp = [];
          temp.push(item.percent * 100);
          temp.push(item.borrowApy);
          return temp;
        })
      }
    ]);
  };

  useEffect(() => {
    getGraphData(currentAsset);
  }, [currentAsset, marketInfo, decimal]);

  const handleMouseMove = e => {
    const graphElement = document.getElementById('percent-wrapper');
    const lineElement = document.getElementById('line');
    if (graphElement && lineElement) {
      const x = e.pageX - graphElement.offsetLeft - 30;
      const tempPercent = (x * 100) / lineElement.clientWidth;
      if (tempPercent >= 0 && tempPercent <= 100) {
        setPercent(parseInt(tempPercent, 10));
        setTickerPos(e.pageX - graphElement.offsetLeft);
      } else if (tempPercent < 0) {
        setPercent(0);
      } else if (tempPercent >= 100) {
        setPercent(100);
      }
      setCurrentPos(30 + (lineElement.clientWidth * currentPercent) / 100);
    }
  };

  return (
    <div className="interest-rate-model">
      <p className="title">Interest Rate Model</p>
      <hr />
      <p className="description">Utilization vs. APY</p>
      <div
        id="percent-wrapper"
        className="percent-wrapper"
        onMouseMove={handleMouseMove}
      >
        <div id="line" className="line" />
        {graphData.length !== 0 && (
          <div className="current-percent" style={{ left: currentPos || 30 }}>
            <p>Current</p>
          </div>
        )}
        <div
          className="ticker-percent"
          style={{ left: tickerPos || currentPos || 30 }}
        >
          {percent === null ? currentPercent : percent} %
        </div>
        <div
          id="ticker-line"
          className="ticker-line"
          style={{ left: tickerPos || currentPos }}
        />
        <div className="chart-wrapper">
          <Chart
            options={options}
            series={series}
            type="line"
            height="350"
            colors={colors}
          />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  const { getInterateModel } = accountActionCreators;

  return bindActionCreators(
    {
      getInterateModel
    },
    dispatch
  );
};

export default compose(
  withRouter,
  connectAccount(null, mapDispatchToProps)
)(InterestRateModel);
