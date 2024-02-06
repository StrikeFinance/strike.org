import React, { useState } from 'react';
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
import apeImg from 'assets/img/ape.png';
import ustImg from 'assets/img/ust.png';
import daiImg from 'assets/img/dai.png';
import xcnImg from 'assets/img/xcn.png';
import wstethImg from 'assets/img/wsteth.png';
import rethImg from 'assets/img/reth.png';
import completed from 'assets/img/landingpage/Shape.png';
import cancel from 'assets/img/landingpage/cancel.png';
import dailogo from 'assets/img/landingpage/image-8.png';
import nextCarret from 'assets/img/landingpage/Vector.png';
import prevCarret from 'assets/img/landingpage/Vector-1.png';
import vector9 from 'assets/img/landingpage/Vector-9.png';
import vector10 from 'assets/img/landingpage/Vector-10.png';
import V5b from 'assets/img/landingpage/Vector-5-b.png';
import V6b from 'assets/img/landingpage/Vector-6-b.png';
import V7b from 'assets/img/landingpage/Vector-7-b.png';
import V8b from 'assets/img/landingpage/Vector-8-b.png';
import V16b from 'assets/img/landingpage/Vector-16-b.png';
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
import moment from 'moment';
import commaNumber from 'comma-number';
import { Pagination } from 'antd';

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
    @media only screen and (max-width: 768px) {
      margin-bottom: 50px;
      font-size: 25px;
      font-weight: 500;
    }
  }

  img.vector9 {
    position: absolute;
    z-index: 21;
    top: 304px;
    left: 273px;
    @media only screen and (max-width: 768px) {
      display: none;
    }
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
    padding: 0 20px;

    @media only screen and (max-width: 768px) {
      width: 91%;
    }

    &::after {
      content: '';
      position: absolute;
      z-index: -1 !important;
      top: 60px;
      left: -68px;
      width: 1120px;
      height: 500px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 20px;

      @media only screen and (max-width: 768px) {
        display: none;
      }
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
      max-width: 200px;
      min-width: 60px;
    }

    .tableCellBody {
      display: flex;

      img {
        margin-right: 15px;
        width: 37px;
        height: 36px;
      }
      .content-table {
        display: flex;
        align-items: center;
        flex-direction: column;

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
      align-items: right;
      flex-direction: column;

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
        color: var(--color-green);
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
    flex-direction: column;
  }

  .MuiTableCell-footer ul {
    height: 50px;
    line-height: 50px;
  }

  .MuiTableCell-footer ul li {
    border: solid 1px;
  }

  .column1 {
    z-index: 4;
    margin-top: 402px;
    margin-left: 190px;
    margin-bottom: 369px;

    @media only screen and (max-width: 768px) {
      margin-left: 20px;
      margin-bottom: 0;
      margin-right: 20px;
      padding-top: 90px;
    }
    @media only screen and (max-width: 680px) {
      margin-left: 20px;
    }

    img.V16b {
      position: absolute;
      z-index: -1;
      left: 221px;
      top: 369px;
    }

    img.V6b {
      position: absolute;
      left: 21%;
      top: 66%;
    }

    .button-governance {
      margin-bottom: 25px;
      @media only screen and (max-width: 768px) {
      }
      span {
        color: #0b0f23;
        padding: 6.67px 13.74px 6.34px 13.67px;
        background: #1e1a22;
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
      @media only screen and (max-width: 768px) {
        font-size: 25px;
        font-weight: 500;
        width: 100%;
      }
    }
  }
  .column2 {
    z-index: 4;
    margin-top: 402px;
    margin-left: 76px;
    @media only screen and (max-width: 768px) {
      margin-top: 60px;
      margin-left: 15px;
      margin-right: 15px;
    }
    @media only screen and (max-width: 680px) {
      margin-top: 60px;
      margin-left: 15px;
      margin-right: 15px;
    }
    .content-column2 {
      background: rgba(11, 15, 35, 0.5);
      border-radius: 20px;

      @media only screen and (max-width: 768px) {
        width: 100%;
        padding: 20px;
        margin-bottom: 64px;
      }

      img.V5b {
        position: absolute;
        top: 23%;
        right: 10%;
      }

      img.V8b {
        position: absolute;
        top: 63%;
        right: 3%;
        z-index: -1;
      }

      img.V7b {
        position: absolute;
        top: 80%;
        right: 33%;
        @media only screen and (max-width: 768px) {
          display: none;
        }
      }

      .proposals {
        font-size: 20px;
        font-weight: 800;
        color: #ffffff;
        padding-top: 30px;
        padding-left: 40px;
        padding-bottom: 20px;

        @media only screen and (max-width: 768px) {
          padding: 0;
          margin-bottom: 15px;
        }
      }
      .divider {
        background: #e5e5e5;
        width: 683px;
        margin-left: 40px;
        margin-right: 40px;
        @media only screen and (max-width: 768px) {
          width: 100%;
          margin-left: 0;
        }
        @media only screen and (max-width: 680px) {
          width: 100%;
          margin-left: 0;
        }
      }

      .padding-style {
        padding-bottom: 35px;
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
      margin: 0 40px;

      @media only screen and (max-width: 768px) {
        margin: 0;
      }

      .program {
        display: flex;
        align-items: center;
        flex-direction: column;
        flex-grow: 1;

        margin-top: 15px;
        @media only screen and (max-width: 768px) {
          margin-bottom: 0px;
          margin-left: 0px;
          padding-right: 200px;
        }
        @media only screen and (max-width: 680px) {
          padding-right: 150px;
        }
        @media only screen and (max-width: 450px) {
          padding-right: 50px;
        }

        .progam-name {
          font-size: 16px;
          font-weight: 500;
          color: #ffffff;
          margin-bottom: 2px;
          width: 100%;
          @media only screen and (max-width: 768px) {
            margin-bottom: 0px;
            margin-left: 0;
            width: 100%;
          }
          @media only screen and (max-width: 680px) {
            margin-bottom: 0px;
            margin-left: 0;
            width: 100%;
          }
        }

        .date-passed {
          display: flex;
          /* align-items: center; */
          padding-bottom: 16px;
          width: 100%;
          @media only screen and (max-width: 768px) {
            /* width: 274%; */
            padding-left: 0;
            flex-direction: column-reverse;
          }
          @media only screen and (max-width: 680px) {
            /* width: 274%; */
            padding-left: 0;
          }
          .passed {
            margin-right: 6px;
            color: #ffffff;
            font-size: 12px;
            font-weight: 800;
            padding: 1px 5px 1px 6px;
            background: #06c270;
            border-radius: 5px;

            @media only screen and (max-width: 768px) {
              margin-right: 38%;
            }
            @media only screen and (max-width: 450px) {
              margin-right: 50%;
            }
          }

          .date {
            font-size: 12px;
            font-weight: 500;
            color: #9d9fa7;
          }
        }
      }

      .completed {
        padding-top: 15px;
        @media only screen and (max-width: 768px) {
          padding-right: 10px;
          padding-top: 28px;
          display: flex;
          align-item: center;
          margin-top: 16px;
        }
        @media only screen and (max-width: 680px) {
          padding-right: 0px;
        }

        img {
          @media only screen and (max-width: 768px) {
            width: 30px;
            height: 30px;
            margin-top: 0;
          }
        }
        span {
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
          padding-top: 5px;
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
  SXP: sxpImg,
  APE: apeImg,
  UST: ustImg,
  DAI: daiImg,
  XCN: xcnImg,
  wstETH: wstethImg,
  rETH: rethImg
};
const format = commaNumber.bindWith(',', '.');
function Section3({
  history,
  markets,
  governance,
  total,
  onChangePage,
  setSetting
}) {
  const getStatus = p => {
    if (p.state === 'Executed') {
      return 'Passed';
    }
    if (p.state === 'Active') {
      return 'Active';
    }
    if (p.state === 'Defeated') {
      return 'Failed';
    }
    return p.state;
  };

  const [current, setCurrent] = useState();
  const [pageSize, setPageSize] = useState(5);

  const handleChangePage = (page, size) => {
    setCurrent(page);
    setPageSize(size);
    onChangePage(page, (page - 1) * size, size);
  };

  const callMarketDetail = item => {
    setSetting({
      ...setSetting,
      selectedAddress: item.address,
      markets: markets.markets.filter(m => m.deprecated === false)
    });
    history.push(`/market/${item.underlyingSymbol}`);
  };

  return (
    <Section3Wrapper>
      <DevelopersWrapper className="flex flex-column align-center">
        <h4 className="center">12 markets available</h4>
        {/* <img src={vector9} className="vector9" alt="" /> */}
        {/* <img src={vector10} className="vector10" alt="" /> */}
        <Paper className="paper-root">
          <Typography className="typography">All Markets</Typography>
          <Divider className="dividerMarket" />
          <TableContainer style={{ cursor: 'pointer' }}>
            <Table style={{ minWidth: '340px' }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    width="20%"
                    className="tableCellHead tablecell1"
                    align="left"
                  >
                    Market
                  </TableCell>
                  <TableCell
                    width="20%"
                    className="tableCellHead tablecell2"
                    align="right"
                  >
                    Total Supply
                  </TableCell>
                  <TableCell
                    width="20%"
                    className="tableCellHead tablecell3"
                    align="right"
                  >
                    Supply APY
                  </TableCell>
                  <TableCell
                    width="20%"
                    className="tableCellHead tablecell4"
                    align="right"
                  >
                    Total Borrow
                  </TableCell>
                  <TableCell
                    width="20%"
                    className="tableCellHead tablecell5"
                    align="right"
                  >
                    Borrow APY
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {markets.markets.filter(m => m.deprecated === false).map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell width="20%" className="tableCellBody">
                        <div>
                          <img src={ICONS[item.underlyingSymbol]} />
                        </div>
                        <div className="content-table">
                          <span className="Dai">{item.underlyingSymbol}</span>
                          <span className="dai">{item.underlyingName}</span>
                        </div>
                      </TableCell>
                      <TableCell width="20%" align="right">
                        <div className="earn">
                          <span className="money">
                            $
                            {new Intl.NumberFormat({
                              maximumSignificantDigits: 3
                            }).format(item.totalSupply)}
                          </span>
                          <span className="percent">
                            {format(
                              new BigNumber(item.totalSupplyUsd)
                                .div(new BigNumber(item.tokenPrice))
                                .dp(0, 1)
                                .toString(10)
                            )}{' '}
                            {item.underlyingSymbol}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell width="20%" align="right">
                        <div className="earn">
                          <span className="money">
                            $
                            {new Intl.NumberFormat({
                              maximumSignificantDigits: 3
                            }).format(item.supplyApy)}
                          </span>
                          <span className="percent">
                            {new BigNumber(item.supplyStrikeApy)
                              .dp(2, 1)
                              .toString(10)}
                            %
                          </span>
                        </div>
                      </TableCell>

                      <TableCell width="20%" align="right">
                        <div className="earn">
                          <span className="money">
                            $
                            {new Intl.NumberFormat({
                              maximumSignificantDigits: 3
                            }).format(item.totalBorrows)}
                          </span>
                          <span className="percent">
                            {format(
                              new BigNumber(item.totalBorrowsUsd)
                                .div(new BigNumber(item.tokenPrice))
                                .dp(0, 1)
                                .toString(10)
                            )}{' '}
                            {item.underlyingSymbol}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell width="20%" align="right">
                        <div className="earn">
                          <span className="money">
                            $
                            {new Intl.NumberFormat({
                              maximumSignificantDigits: 3
                            }).format(item.borrowApy)}
                          </span>
                          <span className="percent">
                            {new BigNumber(item.borrowStrikeApy)
                              .dp(2, 1)
                              .toString(10)}
                            %
                          </span>
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
                      <Pagination
                        size="larger"
                        defaultCurrent={0}
                        defaultPageSize={4}
                        current={current}
                        pageSize={pageSize}
                        total={total}
                        onChange={handleChangePage}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
      </DevelopersWrapper>
      <PortableWrapper className="flex" id="gorvernance">
        <div className="column1">
          <img src={V16b} className="V16b" alt="" />
          <div className="button-governance">
            <span>Gorvernance</span>
          </div>
          <span className="content-governance">
            Strike is managed by a decentralized community of Strike
            token-holders and their delegates, who propose and vote on upgrades
            to the protocol.
          </span>
          <img src={V6b} className="V6b" alt="" />
        </div>
        <div className="column2">
          <div className="content-column2">
            <img src={V5b} className="V5b" alt="" />
            <Typography className="proposals">Recent Proposals</Typography>
            <Divider className="divider" />
            {governance.map((item, index) => {
              return (
                <div key={index} className="padding-style">
                  <div className="gorvernance-program">
                    <div className="program">
                      <span className="progam-name">
                        {item.description.split('\n')[0]}
                      </span>
                      <span className="date-passed">
                        <span className={`passed ${getStatus(item)}`}>
                          {getStatus(item)}
                        </span>
                        <span className="date">
                          {moment(item.createdAt).format('MMMM Do, YYYY')}
                        </span>
                      </span>
                    </div>
                    <div className="completed">
                      <img
                        src={`${item.canceled ? completed : cancel}`}
                        alt=""
                      />
                      <span>{item.state}</span>
                    </div>
                  </div>
                  <Divider className="divider" />
                </div>
              );
            })}
          </div>
        </div>
      </PortableWrapper>
    </Section3Wrapper>
  );
}

Section3.propTypes = {
  history: PropTypes.object,
  setSetting: PropTypes.func.isRequired
};

Section3.defaultProps = {
  history: {}
};

export default compose(withRouter)(Section3);
