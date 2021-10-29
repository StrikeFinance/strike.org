import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import styled from 'styled-components';
import ReactApexChart from 'react-apexcharts';
import { connectAccount } from 'core';
import moment from 'moment';
import { currencyFormatter } from 'utilities/common';

const ChartWrapper = styled.div`
  width: 100% + 40px;
  margin: -10px -20px 10px;
`;

function OverviewChart({ marketType, data, graphType }) {
  const [areaOptions, setAreaOptions] = useState({
    seriesLine1: [
      {
        name: '',
        data: []
      }
    ],
    optionLine1: {
      chart: {
        id: 'guest',
        group: 'marketinfo',
        type: 'line',
        animations: {
          enabled: false
        },
        height: 160,
        toolbar: {
          show: false
        }
      },
      colors: ['#00E396'],
      dataLabels: {
        enabled: false
      },
      xaxis: {
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
      yaxis: {
        show: false
      },
      grid: {
        show: false
      },
      stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: undefined,
        width: 3,
        dashArray: 0
      }
    },
    seriesLine2: [
      {
        name: '',
        data: []
      }
    ],
    optionLine2: {
      chart: {
        id: 'Subs',
        type: 'line',
        group: 'marketinfo',
        animations: {
          enabled: false
        },
        height: 160,
        toolbar: {
          show: false
        }
      },
      colors: ['#546E7A'],
      dataLabels: {
        enabled: false
      },
      xaxis: {
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
      yaxis: {
        show: false
      },
      grid: {
        show: false
      },
      stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: undefined,
        width: 3,
        dashArray: 0
      }
    }
  });

  useEffect(() => {
    if (marketType === 'supply') {
      setAreaOptions({
        optionLine1: {
          colors: ['#00D395']
        },
        optionLine2: {
          colors: ['#00D395']
        },
        seriesLine1: [
          {
            name: 'Supply APY',
            data: data.map(item => {
              const temp = {};
              temp.x = moment(item.createdAt).format('LLL');
              temp.y = item.supplyApy.toFixed(2);
              return temp;
            })
          }
        ],
        seriesLine2: [
          {
            name: 'Total Supply',
            data: data.map(item => {
              const temp = {};
              temp.x = moment(item.createdAt).format('LLL');
              temp.y = item.totalSupply.toFixed(2);
              return temp;
            })
          }
        ]
      });
    } else {
      setAreaOptions({
        ...areaOptions,
        optionLine1: {
          colors: ['#9669ED']
        },
        optionLine2: {
          colors: ['#9669ED']
        },
        seriesLine1: [
          {
            name: 'Borrow APY',
            data: data.map(item => {
              const temp = {};
              temp.x = moment(item.createdAt).format('LLL');
              temp.y = item.borrowApy.toFixed(2);
              return temp;
            })
          }
        ],
        seriesLine2: [
          {
            name: 'Total Borrow',
            data: data.map(item => {
              const temp = {};
              temp.x = moment(item.createdAt).format('LLL');
              temp.y = item.totalBorrow.toFixed(2);
              return temp;
            })
          }
        ]
      });
    }
  }, [data, marketType]);

  return (
    <ChartWrapper>
      <ReactApexChart
        options={areaOptions.optionLine1}
        series={areaOptions.seriesLine1}
        type="line"
        height={180}
      />
      <ReactApexChart
        options={areaOptions.optionLine2}
        series={areaOptions.seriesLine2}
        type="line"
        height={180}
      />
    </ChartWrapper>
  );
}

OverviewChart.propTypes = {
  marketType: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      apy: PropTypes.number
    })
  ),
  graphType: PropTypes.string
};

OverviewChart.defaultProps = {
  marketType: 'supply',
  data: [],
  graphType: 'composed'
};

const mapStateToProps = ({ account }) => ({
  settings: account.setting
});

export default compose(connectAccount(mapStateToProps, undefined))(
  OverviewChart
);
