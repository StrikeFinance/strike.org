import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { BigNumber } from 'bignumber.js';
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
import completed from 'assets/img/landingpage/Shape.png';
import dailogo from 'assets/img/landingpage/image-8.png';
import nextCarret from 'assets/img/landingpage/Vector.png';
import prevCarret from 'assets/img/landingpage/Vector-1.png';
import vector9 from 'assets/img/landingpage/Vector-9.png';
import vector10 from 'assets/img/landingpage/Vector-10.png';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Divider,
  TableFooter
} from '@material-ui/core';

const Section3Wrapper = styled.div`
  width: 100%;
  padding: 65px 0px 117px 0px;

  @media only screen and (max-width: 768px) {
    padding: 65px 20px 0;
  }

  p {
    font-size: 22px;
    font-weight: 900;
    color: #277ee6;

    @media only screen and (max-width: 768px) {
      font-size: 16px;
    }
  }

  h4 {
    max-width: 812px;
    margin-top: 19px;
    margin-bottom: 47px;

    @media only screen and (max-width: 768px) {
      font-size: 20px;
      margin-bottom: 20px;
    }
  }

  h5 {
    max-width: 660px;
    margin-top: 21px;
    margin-bottom: 51px;

    @media only screen and (max-width: 768px) {
      font-size: 14px;
      margin-bottom: 20px;
    }
  }
`;

const DevelopersWrapper = styled.div`
  position: relative;
  h4.center {
    font-size: 49px;
    font-weight: 500;
    color: #0b0f23;
    margin-bottom: 45px;
    position: absolute;
    z-index: 21;
    margin-top: -91px;
  }

  img.vector9 {
    position: absolute;
    z-index: 21;
    top: 304px;
    left: 273px;
  }

  img.vector10 {
    position: absolute;
    z-index: 20;
    top: 111px;
    right: 200px;
  }

  .paper-root {
    position: absolute;
    z-index: 20;
    border-radius: 20px;
    box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.05);

    &::after {
      content: '';
      position: absolute;
      z-index: -1 !important;
      top: 60px;
      left: -68px;
      width: 1233px;
      height: 500px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 20px;
    }

    .typography {
      font-size: 20px;
      font-weight: 800;
      color: #0b0f23;
      margin-top: 30px;
      margin-left: 40px;
      margin-bottom: 20px;
    }

    .dividerMarket {
      width: 968px;
      margin-left: 40px;
    }

    .tableCellHead {
      font-size: 16px;
      font-weight: 500;
      color: #9d9fa7;
    }

    .tablecell1 {
      padding-left: 40px;
    }

    .tablecell2 {
      padding-right: 75px;
    }

    .tablecell3 {
      padding-right: 66px;
    }

    .tablecell4 {
      padding-right: 68px;
    }

    .tablecell5 {
      padding-right: 63px;
    }

    .tableCellBody {
      display: flex;
      padding-left: 40px;

      img {
        margin-right: 15px;
        width: 37px;
        height: 36px;
      }
      .content-table {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding-right: 212px;

        .Dai {
          font-size: 18px;
          font-weight: 500;
          color: #000000;
        }

        .dai {
          font-size: 16px;
          font-weight: 500;
          color: #9d9fa7;
        }
      }
    }

    .earn {
      display: flex;
      align-items: center;
      flex-direction: column;
      text-align: center;
      margin-right: 57px;

      .money {
        font-size: 18px;
        font-weight: 500;
        color: #000000;
      }
      .percent {
        text-align: right;
        padding-left: 33px;
        font-size: 16px;
        font-weight: 500;
        color: #f84960;
      }
    }

    .pagination {
      border-bottom: none !important;
      padding-right: 50px;
      padding-top: 22px;
      padding-bottom: 27px;

      .numberPage {
        .page {
          font-size: 16px;
          font-weight: 800px;
          color: #0b0f23;
          padding: 8px 16px;
          margin-right: 12px;
          border: 1px solid black;
          text-align: center;
          box-sizing: border-box;
          border-radius: 4px;
          cursor: pointer;
        }

        span.icon {
          padding: 8px 16px;
          border: 1px solid black;
          box-sizing: border-box;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
        }
      }
    }
  }
`;

const PortableWrapper = styled.div`
  position: relative;
  background: #3b54b5;
  margin-top: 408px;

  @media only screen and (max-width: 768px) {
  }

  .column1 {
    z-index: 4;
    margin-top: 402px;
    margin-left: 190px;
    margin-bottom: 369px;

    @media only screen and (max-width: 768px) {
    }

    .button-governance {
      margin-bottom: 25px;
      span {
        color: #0b0f23;
        padding: 6.67px 13.74px 6.34px 13.67px;
        background: #eceff9;
        border-radius: 5px;
        cursor: pointer;
        font-size: 20px;
        font-weight: 800;
      }
    }

    .content-governance {
      color: #ffffff;
      font-size: 39px;
      font-weight: 500;
      width: 474px;
      display: block;
    }
  }
  .column2 {
    z-index: 4;
    margin-top: 402px;
    margin-left: 288px;

    .content-column2 {
      background: rgba(11, 15, 35, 0.5);
      border-radius: 20px;

      .proposals {
        font-size: 20px;
        font-weight: 800;
        color: #ffffff;
        padding-top: 30px;
        padding-left: 40px;
        padding-bottom: 20px;
      }
      .divider {
        background: #e5e5e5;
        width: 683px;
        margin-left: 40px;
      }
    }

    .pagination {
      text-align: right;
      padding-right: 22px;
      padding-top: 22px;
      padding-bottom: 27px;

      .icon {
        color: #3b54b5;
      }

      .page {
        color: #107def;
        border: 1px solid #107def;
        font-size: 16px;
        font-weight: 800px;
        padding: 8px 16px;
        margin-right: 12px;
        text-align: center;
        box-sizing: border-box;
        border-radius: 4px;
        cursor: pointer;
      }

      .iconPrev,
      .nextPrev {
        margin-right: 12px;
        color: #107def;
        border: 1px solid #107def;
        cursor: pointer;
        border-radius: 4px;
        padding: 8px 16px;
      }
    }

    .gorvernance-program {
      display: flex;

      .program {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding-right: 282px;
        margin-left: -30px;
        margin-top: 15px;

        .progam-name {
          font-size: 20px;
          font-weight: 500;
          color: #ffffff;
          margin-bottom: 2px;
          margin-left: -14px;
        }

        .date-passed {
          display: flex;
          align-items: center;
          padding-left: 70px;
          padding-bottom: 16px;

          .passed {
            margin-right: 6px;
            color: #ffffff;
            font-size: 12px;
            font-weight: 800;
            padding: 1px 5px 1px 6px;
            background: #06c270;
            border-radius: 5px;
          }

          .date {
            font-size: 14px;
            font-weight: 500;
            color: #9d9fa7;
          }
        }
      }

      .completed {
        padding-right: 39.67px;
        padding-top: 28px;

        img {
          margin-right: 15.33px;
          margin-bottom: 7px;
        }
        span {
          font-size: 20px;
          font-weight: 500;
          color: #ffffff;
        }
      }
    }
  }
`;

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
  SXP: sxpImg
};

const data = [
  {
    name: 'Strike Grants Program',
    passed: 'Passed',
    date: '003 - Executed October 20th, 2021',
    excuted: 'Excuted',
    icon: completed
  },
  {
    name: 'Strike Grants Program',
    passed: 'Passed',
    date: '003 - Executed October 20th, 2021',
    excuted: 'Excuted',
    icon: completed
  },
  {
    name: 'Strike Grants Program',
    passed: 'Passed',
    date: '003 - Executed October 20th, 2021',
    excuted: 'Excuted',
    icon: completed
  },
  {
    name: 'Strike Grants Program',
    passed: 'Passed',
    date: '003 - Executed October 20th, 2021',
    excuted: 'Excuted',
    icon: completed
  },
  {
    name: 'Strike Grants Program',
    passed: 'Passed',
    date: '003 - Executed October 20th, 2021',
    excuted: 'Excuted',
    icon: completed
  }
];

const dataMarket = [
  { logo: dailogo, name: 'Dai', money: '$6,194.34M', percent: '-0.55%' },
  { logo: dailogo, name: 'Dai', money: '$6,194.34M', percent: '-0.55%' },
  { logo: dailogo, name: 'Dai', money: '$6,194.34M', percent: '-0.55%' },
  { logo: dailogo, name: 'Dai', money: '$6,194.34M', percent: '-0.55%' },
  { logo: dailogo, name: 'Dai', money: '$6,194.34M', percent: '-0.55%' }
];

function Section3({ history, markets }) {
  const handleLink = () => {
    window.open('https://app.strike.org', '_blank');
  };

  return (
    <Section3Wrapper id="developer">
      <DevelopersWrapper className="flex flex-column align-center">
        <h4 className="center">10 markets available</h4>
        <img src={vector9} className="vector9" />
        <img src={vector10} className="vector10" />
        <Paper className="paper-root">
          <Typography className="typography">All Markets</Typography>
          <Divider className="dividerMarket" />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="tableCellHead tablecell1" align="left">
                    Market
                  </TableCell>
                  <TableCell className="tableCellHead tablecell2" align="right">
                    Total Supply
                  </TableCell>
                  <TableCell className="tableCellHead tablecell3" align="right">
                    Supply APY
                  </TableCell>
                  <TableCell className="tableCellHead tablecell4" align="right">
                    Total Borrow
                  </TableCell>
                  <TableCell className="tableCellHead tablecell5" align="right">
                    Borrow APY
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {dataMarket.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="tableCellBody">
                        <img src={item.logo} />
                        <div className="content-table">
                          <span className="Dai">{item.name}</span>
                          <span className="dai">{item.name}</span>
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <div className="earn">
                          <span className="money">{item.money}</span>
                          <span className="percent">{item.percent}</span>
                        </div>
                      </TableCell>

                      <TableCell align="center">
                        <div className="earn">
                          <span className="money">{item.money}</span>
                          <span className="percent">{item.percent}</span>
                        </div>
                      </TableCell>

                      <TableCell align="center">
                        <div className="earn">
                          <span className="money">{item.money}</span>
                          <span className="percent">{item.percent}</span>
                        </div>
                      </TableCell>

                      <TableCell align="center">
                        <div className="earn">
                          <span className="money">{item.money}</span>
                          <span className="percent">{item.percent}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell className="pagination" align="right" colSpan={5}>
                    <div className="numberPage">
                      <span className="page">1</span>
                      <span className="page">2</span>
                      <span className="icon">
                        <img src={nextCarret} />
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
      </DevelopersWrapper>
      <PortableWrapper className="flex">
        <div className="column1">
          <div className="button-governance">
            <span>Gorvernance</span>
          </div>
          <span className="content-governance">
            Strike is managed by a decentralized community of Strike
            token-holders and their delegates, who propose and vote on upgrades
            to the protocol.
          </span>
        </div>
        <div className="column2">
          <div className="content-column2">
            <Typography className="proposals">Recent Proposals</Typography>
            <Divider className="divider" />
            {data.map((item, index) => {
              return (
                <>
                  <div className="gorvernance-program" key={index}>
                    <div className="program">
                      <span className="progam-name">{item.name}</span>
                      <span className="date-passed">
                        <span className="passed">{item.passed}</span>
                        <span className="date">{item.date}</span>
                      </span>
                    </div>
                    <div className="completed">
                      <img src={item.icon} />
                      <span>{item.excuted}</span>
                    </div>
                  </div>
                  <Divider className="divider" />
                </>
              );
            })}
            <div className="pagination">
              <span className="icon iconPrev">
                <img src={prevCarret} />
              </span>
              <span className="page">1</span>
              <span className="page">2</span>
              <span className="icon nextPrev">
                <img src={nextCarret} />
              </span>
            </div>
          </div>
        </div>
      </PortableWrapper>
    </Section3Wrapper>
  );
}

Section3.propTypes = {
  history: PropTypes.object
};

Section3.defaultProps = {
  history: {}
};

export default compose(withRouter)(Section3);
