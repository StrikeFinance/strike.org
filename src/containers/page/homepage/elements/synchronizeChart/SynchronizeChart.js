import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useState } from 'react';
import './SynchronizeChart.scss';

export const SynchronizeChart = () => {
  const [options] = useState({
    chart: {
      zoomType: 'x',
      backgroundColor: '#fff',
      type: 'columnrange',
      animation: true,
      spacingTop: 0,
      spacingRight: 0,
      spacingBottom: 0,
      spacingLeft: 0,
      plotBorderWidth: 0,
      margin: [0, 0, 0, 0],
      events: {
        load() {
          let newData;
          var chart = this;
          let combinedData;
          let result = [];

          axios
            .get(
              'https://api.strike.org/api/market_history/graph?asset=0x4164e5b047842Ad7dFf18fc6A6e63a1e40610f46&type=1day'
            )
            .then(res => {
              result = res.data.data.result;
              chart.series[0].setData(
                result.map(item => parseFloat(item.priceUSD))
              );
              chart.series[1].setData(
                result.map(item => parseFloat(item.supplyApy))
              );
            });
        }
      }
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
            color: '#0077cc'
          }
        }
      }
    },
    tooltip: {
      xDateFormat: '%d/%m/%Y',
      shared: true,
      split: false,
      enabled: true,
      headerFormat: ''
    },
    title: {
      text: ''
    },
    xAxis: {
      visible: false
    },
    legend: {
      enabled: true
    },
    yAxis: [
      {
        visible: false,
        legend: {
          enabled: false
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
        name: 'ok',
        showInLegend: false,
        color: 'grey',
        type: 'column',
        yAxis: 1,
        data: []
      },
      {
        name: 'ok2',
        showInLegend: false,
        type: 'spline',
        color: '#0077cc',
        yAxis: 0,
        data: []
      }
    ]
  });

  return (
    <div id="container">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default SynchronizeChart;
