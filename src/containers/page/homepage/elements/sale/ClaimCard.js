/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { compose } from 'recompose';
// import { useSelector } from 'react-redux';
import { Spin, Icon, Tooltip } from 'antd';
import ConnectWalletButton from 'components/ConnectWalletButton';
import { useWeb3, useActiveWeb3React } from 'hooks';
import { useSaleInfo } from 'hooks/useSaleInfo';
import { useUserInfo } from 'hooks/useUserInfo';
import { useSaleAction } from 'hooks/useSaleAction';
// import { CHAIN_IDS } from 'connectors';
// import { applicationActionCreators } from 'core';
// import { switchNetwork } from 'connectors/addNetwork';
import { getReadableNumber } from 'utilities/common';
import StrkLogoImg from 'assets/img/homepage/strk_logo.svg';
import TxHistoryImg from 'assets/img/homepage/tx-history.svg';
// import strkImg from 'assets/img/homepage/strk.svg';
// import ethImg from 'assets/img/homepage/eth.svg';
// import arbitrumImg from 'assets/img/homepage/arbitrum.png';
// import bnbImg from 'assets/img/homepage/bnb.png';
import infoImg from 'assets/img/homepage/question.png';

import './ClaimCard.scss';
import BigNumber from 'bignumber.js';

const antIcon = (
  <Icon type="loading" style={{ fontSize: 18, marginRight: '5px' }} spin />
);

const ClaimCard = ({ xmasSaleDone }) => {
  // const currentNetworkId =
  //   useSelector(({ application }) => application.currentNetworkId) ||
  //   localStorage.getItem('network');
  // const dispatch = useDispatch();
  const { account, chainId, requiredChainId } = useActiveWeb3React();
  const web3 = useWeb3();
  const saleInfo = useSaleInfo(web3, chainId || requiredChainId);

  const [tokenBalanceReload, setTokenBalanceReload] = useState(0);
  const [userInfoReload, setUserInfoReload] = useState(0);
  const userInfo = useUserInfo(web3, chainId, account, userInfoReload);
  const { harvestPool, releasePool } = useSaleAction(chainId, account);

  const [pending, setPending] = useState(false);
  const [action, setAction] = useState('');

  const onHarvest = async pid => {
    try {
      if (
        pending ||
        !saleInfo.harvestAllowed ||
        (userInfo.shortRewards[pid].eq(0) && userInfo.longRewards[pid].eq(0))
      )
        return;
      setPending(true);
      setAction(`harvest${pid}`);
      await harvestPool(pid);
      setUserInfoReload(prevState => prevState + 1);
      setTokenBalanceReload(prevState => prevState + 1);
      setPending(false);
      setAction('');
    } catch (error) {
      setPending(false);
    }
  };

  const onClaim = async (which, vestingId) => {
    try {
      setPending(true);
      setAction(`claim${which}`);
      await releasePool(vestingId);
      setUserInfoReload(prevState => prevState + 1);
      setTokenBalanceReload(prevState => prevState + 1);
      setPending(false);
      setAction('');
    } catch (error) {
      setPending(false);
    }
  };

  return (
    <div className="claim-card">
      {!account ? (
        <div className="not-connect-card">
          <div className="title">
            Please claim your <span className="text-highlight">STRK</span>!
          </div>
          <img src={StrkLogoImg} className="logo" alt="logo" />
          <div className="connect-btn">
            <ConnectWalletButton />
          </div>
        </div>
      ) : (
        <div className="connect-card">
          <div className="buy-card">
            {/* <div className="network-option">
              <div
                className={`network ${
                  Number(currentNetworkId) === 0 ? 'active' : ''
                }`}
                onClick={async () => {
                  const switched = await switchNetwork(CHAIN_IDS[0]);
                  if (switched) {
                    localStorage.setItem('network', 0);
                    dispatch(
                      applicationActionCreators.updateNetworkId({
                        selectedNetworkId: 0
                      })
                    );
                    connector.activate(CHAIN_IDS[0]);
                  }
                }}
              >
                <img src={ethImg} alt="network" />
                ETH
              </div>
              <div
                className={`network ${
                  Number(currentNetworkId) === 1 ? 'active' : ''
                }`}
                onClick={async () => {
                  const switched = await switchNetwork(CHAIN_IDS[1]);
                  if (switched) {
                    localStorage.setItem('network', 1);
                    dispatch(
                      applicationActionCreators.updateNetworkId({
                        selectedNetworkId: 1
                      })
                    );
                    connector.activate(CHAIN_IDS[1]);
                  }
                }}
              >
                <img src={arbitrumImg} alt="network" />
                ARB
              </div>
              <div
                className={`network ${
                  Number(currentNetworkId) === 2 ? 'active' : ''
                }`}
                onClick={async () => {
                  const switched = await switchNetwork(CHAIN_IDS[2]);
                  if (switched) {
                    localStorage.setItem('network', 2);
                    dispatch(
                      applicationActionCreators.updateNetworkId({
                        selectedNetworkId: 2
                      })
                    );
                    connector.activate(CHAIN_IDS[2]);
                  }
                }}
              >
                <img src={bnbImg} alt="network" />
                BNB
              </div>
            </div> */}

            <div className="round-row header">
              <spa className="round">Round</spa>
              <div className="rewards">
                <span className="desktop-long">Vesting 1</span>
                <span className="mobile-long">Vestings</span>
              </div>
              <span className="desktop-long">Vesting 2</span>
            </div>
            {(xmasSaleDone ? [0, 1, 2, 3, 4] : [0, 1, 2, 3]).map(item => (
              <div className="round-row" key={`round-row-${item}`}>
                <spa className="round">Round {item + 1}</spa>
                <div className="rewards">
                  <span className="mobile-long">
                    {userInfo.userInfos[item].harvest
                      ? getReadableNumber(
                          userInfo.userInfos[item].claimableAmount0,
                          18
                        )
                      : getReadableNumber(
                          (
                            userInfo.shortRewards[item] || new BigNumber(0)
                          ).times(
                            (100 -
                              Number(
                                saleInfo.poolInfos[item].longVestingPercentage
                              )) /
                              100
                          ),
                          36
                        )}{' '}
                    STRK
                    {userInfo.userInfos[item].harvest && (
                      <Tooltip
                        placement="top"
                        title={
                          <div>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                              }}
                            >
                              <span>Total:</span>
                              <span>
                                {getReadableNumber(
                                  userInfo.userInfos[item].totalAmount0,
                                  18
                                )}{' '}
                                STRK
                              </span>
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                              }}
                            >
                              <span>Claimed:</span>
                              <span>
                                {getReadableNumber(
                                  userInfo.userInfos[item].claimedAmount0,
                                  18
                                )}{' '}
                                STRK
                              </span>
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                              }}
                            >
                              <span style={{ paddingRight: '20px' }}>
                                Claimable:
                              </span>
                              <span>
                                {getReadableNumber(
                                  userInfo.userInfos[item].claimableAmount0,
                                  18
                                )}{' '}
                                STRK
                              </span>
                            </div>
                          </div>
                        }
                      >
                        <img
                          style={{ marginLeft: '10px' }}
                          src={infoImg}
                          alt="info"
                        />
                      </Tooltip>
                    )}
                  </span>
                  <span className="mobile-long">
                    {userInfo.userInfos[item].harvest
                      ? getReadableNumber(
                          userInfo.userInfos[item].claimableAmount1,
                          18
                        )
                      : getReadableNumber(
                          (
                            userInfo.longRewards[item] || new BigNumber(0)
                          ).times(
                            (100 -
                              Number(
                                saleInfo.poolInfos[item].longVestingPercentage
                              )) /
                              100
                          ),
                          36
                        )}{' '}
                    STRK
                    {userInfo.userInfos[item].harvest && (
                      <Tooltip
                        placement="top"
                        title={
                          <div>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                              }}
                            >
                              <span>Total:</span>
                              <span>
                                {getReadableNumber(
                                  userInfo.userInfos[item].totalAmount1,
                                  18
                                )}{' '}
                                STRK
                              </span>
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                              }}
                            >
                              <span>Claimed:</span>
                              <span>
                                {getReadableNumber(
                                  userInfo.userInfos[item].claimedAmount1,
                                  18
                                )}{' '}
                                STRK
                              </span>
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                              }}
                            >
                              <span style={{ paddingRight: '20px' }}>
                                Claimable:
                              </span>
                              <span>
                                {getReadableNumber(
                                  userInfo.userInfos[item].claimableAmount1,
                                  18
                                )}{' '}
                                STRK
                              </span>
                            </div>
                          </div>
                        }
                      >
                        <img
                          style={{ marginLeft: '10px' }}
                          src={infoImg}
                          alt="info"
                        />
                      </Tooltip>
                    )}
                  </span>
                </div>
                <span className="desktop-long">
                  {userInfo.userInfos[item].harvest
                    ? getReadableNumber(
                        userInfo.userInfos[item].claimableAmount1,
                        18
                      )
                    : getReadableNumber(
                        (userInfo.longRewards[item] || new BigNumber(0)).times(
                          (100 -
                            Number(
                              saleInfo.poolInfos[item].longVestingPercentage
                            )) /
                            100
                        ),
                        36
                      )}{' '}
                  STRK
                </span>
                <div className="actions">
                  {userInfo.userInfos[item].harvest ? (
                    <>
                      <div
                        className={`claim-btn ${
                          pending ||
                          userInfo.userInfos[item].claimableAmount0.eq(0)
                            ? ''
                            : 'enable'
                        }`}
                        onClick={() => {
                          if (
                            !pending &&
                            userInfo.userInfos[item].claimableAmount0.gt(0)
                          )
                            onClaim(
                              `${item}0`,
                              userInfo.userInfos[item].vestingId0
                            );
                        }}
                      >
                        {action === `claim${item}0` && (
                          <Spin className="spinner" indicator={antIcon} />
                        )}
                        Claim
                      </div>
                      <div
                        className={`claim-btn ${
                          pending ||
                          userInfo.userInfos[item].claimableAmount1.eq(0)
                            ? ''
                            : 'enable'
                        }`}
                        onClick={() => {
                          if (
                            !pending &&
                            userInfo.userInfos[item].claimableAmount1.gt(0)
                          )
                            onClaim(
                              `${item}1`,
                              userInfo.userInfos[item].vestingId1
                            );
                        }}
                      >
                        {action === `claim${item}1` && (
                          <Spin className="spinner" indicator={antIcon} />
                        )}
                        Claim
                      </div>
                    </>
                  ) : (
                    <div
                      className={`claim-btn ${
                        pending ||
                        !saleInfo.harvestAllowed ||
                        (userInfo.shortRewards[item].eq(0) &&
                          userInfo.longRewards[item].eq(0))
                          ? ''
                          : 'enable'
                      }`}
                      onClick={() => onHarvest(item)}
                    >
                      {action === `harvest${item}` && (
                        <Spin className="spinner" indicator={antIcon} />
                      )}
                      Harvest
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="connect-btn">
              <ConnectWalletButton tokenBalanceReload={tokenBalanceReload} />
            </div>

            <NavLink to="/history" style={{ width: '100%' }}>
              <div className="history-btn">
                <img src={TxHistoryImg} alt="tx-history" />
                Transaction History
              </div>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default compose(withRouter)(ClaimCard);
