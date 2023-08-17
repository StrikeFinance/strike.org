import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './SynchronizeChart.scss';
import { currencyFormatter } from 'utilities/common';

const SynchronizeChart = ({ marketType, data }) => {
  const [options, setoption] = useState({
    chart: {
      zoomType: '',
      backgroundColor: '#fff',
      type: 'columnrange',
      animation: true,
      spacingTop: 0,
      spacingRight: 0,
      spacingBottom: 0,
      spacingLeft: 0,
      plotBorderWidth: 0,
      margin: [0, 0, 0, 0]
    },

    plotOptions: {
      series: {
        stacking: 'normal',
        borderWidth: 0.5,
        borderColor: '#000',
        pointPadding: 0,
        groupPadding: 0
      },
      column: {
        states: {
          hover: {
            color: `green`
          }
        },
        borderWidth: 0,
        pointPadding: 0.1
      }
    },
    tooltip: {
      xDateFormat: '%Y-%m-%d',
      shared: true,
      split: true,
      enabled: true,
      headerFormat: ''
    },
    title: {
      text: ''
    },
    xAxis: {
      visible: true,
      categories: data.map(item => item.createdAt)
    },
    legend: {
      enabled: true
    },
    yAxis: [
      {
        visible: false,
        legend: {
          enabled: true
        },
        title: {
          text: ''
        },
        height: '50%'
      },
      {
        legend: {
          enabled: false
        },
        visible: false,
        title: {
          text: ''
        },
        top: '50%',
        height: '50%'
      }
    ],
    series: [
      {
        name: 'ok2',
        showInLegend: false,
        type: 'areaspline',
        // color: `green`,
        yAxis: 0,
        data: [],
        marker: {
          enabled: false
        }
      },
      {
        name: 'ok',
        showInLegend: false,
        color: '#F3F9FE',
        type: 'column',
        yAxis: 1,
        data: []
      }
    ]
  });

  useEffect(() => {
    const totalSupplyOrBorrow = [];
    const supplyOrBorrow = [];
    data.forEach(item => {
      if (marketType === 'supply') {
        totalSupplyOrBorrow.push(
          new BigNumber(item.totalSupply.toFixed(2)).toNumber()
        );
        supplyOrBorrow.push(
          new BigNumber(item.supplyApy.toFixed(2)).toNumber()
        );
      } else {
        totalSupplyOrBorrow.push(
          new BigNumber(item.totalBorrow.toFixed(2)).toNumber()
        );
        supplyOrBorrow.push(
          new BigNumber(item.borrowApy.toFixed(2)).toNumber()
        );
      }
    });
    setoption({
      ...options,
      series: [
        {
          name: `${marketType === 'supply' ? ' Supply APY' : 'Borrow APY'}`,
          color: `${
            marketType === 'supply' ? 'rgb(39, 126, 230)' : 'rgb(249, 5, 62)'
          }`,
          data: supplyOrBorrow,
          lineWidth: 5,
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 0.8
            },
            stops: [
              [
                0,
                `${
                  marketType === 'supply'
                    ? 'rgb(39, 126, 230)'
                    : 'rgb(249, 5, 62)'
                }`
              ],
              [1, '#ffff']
            ]
          }
        },
        {
          name: `${marketType === 'supply' ? 'Total Supply' : 'Total Borrow'}`,
          color: `${marketType === 'supply' ? '#F3F9FE' : '#FFF3F5'}`,
          data: totalSupplyOrBorrow
        }
      ],
      plotOptions: {
        column: {
          states: {
            hover: {
              color: `${
                marketType === 'supply'
                  ? 'rgb(39, 126, 230)'
                  : 'rgb(249, 5, 62)'
              }`
            }
          }
        }
      },
      tooltip: {
        formatter: points => {
          const pointsLength = points.length;
          const tooltipMarkup = pointsLength
            ? `<div>
                <div> ${Highcharts.dateFormat(
                  '%A %b %e, %Y',
                  new Date(points[0].x)
                )}</div><br>
                <div>${points[0].series.name}:  <strong>${
                points[0].y
              }%</strong></div><br>
                <div>${points[1].series.name}:  <strong>${currencyFormatter(
                points[1].y
              )}</strong></div>
              </div>`
            : '';
          return tooltipMarkup;
        },
        shared: false
      }
    });
  }, [marketType, data]);

  return (
    <div id="container">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

SynchronizeChart.propTypes = {
  marketType: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object)
};

SynchronizeChart.defaultProps = {
  marketType: '',
  data: []
};

export default SynchronizeChart;
