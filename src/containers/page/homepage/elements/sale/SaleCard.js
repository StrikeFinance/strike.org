/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { compose } from 'recompose';
import { initOnRamp } from '@coinbase/cbpay-js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Spin, Icon } from 'antd';
import BigNumber from 'bignumber.js';
import ConnectWalletButton from 'components/ConnectWalletButton';
import { useWeb3, useActiveWeb3React } from 'hooks';
import { useSaleInfo } from 'hooks/useSaleInfo';
import { useUserInfo } from 'hooks/useUserInfo';
import { useComputeAmount } from 'hooks/useComputeAmount';
import { useTokenBalance } from 'hooks/useTokenBalance';
import { useTokenApproval } from 'hooks/useTokenApproval';
import { useSoldInfo } from 'hooks/useSoldInfo';
// import { CHAIN_IDS } from 'connectors';
// import { applicationActionCreators } from 'core';
// import { switchNetwork } from 'connectors/addNetwork';
import { getReadableNumber } from 'utilities/common';
import { ASSET } from 'utilities/constants';
import StrkLogoImg from 'assets/img/homepage/strk_logo.svg';
import strkImg from 'assets/img/homepage/strk.svg';
import usdtImg from 'assets/img/homepage/usdt.svg';
import usdcImg from 'assets/img/homepage/usdc.png';
import daiImg from 'assets/img/homepage/dai.png';
import wbtcImg from 'assets/img/homepage/wbtc.png';
import ethImg from 'assets/img/homepage/eth.svg';
import bnbImg from 'assets/img/homepage/bnb.png';
// import arbitrumImg from 'assets/img/homepage/arbitrum.png';
import { ReactComponent as BtcImg } from 'assets/img/homepage/btc.svg';
import { ReactComponent as CoinbaseImg } from 'assets/img/homepage/coinbase.svg';
import TxHistoryImg from 'assets/img/homepage/tx-history.svg';
import './SaleCard.scss';
import ConfirmModal from './ConfirmModal';

const antIcon = (
  <Icon type="loading" style={{ fontSize: 24, marginRight: '10px' }} spin />
);
// eslint-disable-next-line react/prop-types
const SaleCard = ({ round, openStatus, onSoldReload, setCurrentPrice }) => {
  const onrampInstance = useRef();
  const currentNetworkId =
    useSelector(({ application }) => application.currentNetworkId) ||
    localStorage.getItem('network');
  // const dispatch = useDispatch();
  const { account, chainId, requiredChainId } = useActiveWeb3React();
  const web3 = useWeb3();
  const saleInfo = useSaleInfo(web3, chainId || requiredChainId);
  const [userInfoReload, setUserInfoReload] = useState(0);
  const userInfo = useUserInfo(web3, chainId, account, userInfoReload);
  const [roundSoldReload, setRoundSoldReload] = useState(0);
  const { roundSold } = useSoldInfo(round, roundSoldReload);

  const { getComputeAmount } = useComputeAmount(chainId || requiredChainId);
  const [vestingPlan, setVestingPlan] = useState(1);
  const [assetName, setAssetName] = useState('eth');
  const [inAssetValue, setInAssetValue] = useState('');
  const [outAssetValue, setOutAssetValue] = useState('');
  const [confirmModalOpen, setConfirmModalOpen] = useState('');
  const [pending, setPending] = useState(false);
  const [timer, setTimer] = useState(null);
  const [userPurchaseAvailable, setUserPurchaseAvailable] = useState(
    new BigNumber(0)
  );
  const [inAmountInUSD, setInAmountInUSD] = useState(new BigNumber(0));
  const [purchaseEnable, setPurchaseEnable] = useState(false);

  const [tokenBalanceReload, setTokenBalanceReload] = useState(0);
  const [approveReload, setApproveReload] = useState(0);
  const balance = useTokenBalance(
    chainId,
    account,
    assetName,
    tokenBalanceReload
  );
  const { allowance } = useTokenApproval(
    chainId,
    account,
    assetName,
    approveReload
  );

  useEffect(() => {
    if (round >= 0)
      setCurrentPrice(
        `$ ${getReadableNumber(
          vestingPlan === 0
            ? saleInfo.poolInfos[round].shortPrice
            : saleInfo.poolInfos[round].longPrice,
          18
        )}`
      );
  }, [saleInfo, round, vestingPlan]);

  useEffect(() => {
    if (account && saleInfo && round >= 0) {
      setUserPurchaseAvailable(
        saleInfo.poolInfos[round].userLimitAmount.div(1e18).minus(
          userInfo.shortRewards[round]
            .times(saleInfo.poolInfos[round].shortPrice)
            .plus(
              userInfo.longRewards[round].times(
                saleInfo.poolInfos[round].longPrice
              )
            )
            .div(1e54)
        )
      );
    }
  }, [saleInfo, userInfo, round, account]);

  useEffect(() => {
    if (round >= 0)
      setPurchaseEnable(
        !pending &&
          openStatus === 'Open' &&
          new BigNumber(inAssetValue).gt(0) &&
          new BigNumber(balance).gte(
            new BigNumber(inAssetValue).times(
              new BigNumber(10).pow(
                ASSET[chainId || requiredChainId][assetName].decimal
              )
            )
          ) &&
          (!saleInfo.poolInfos[round].whitelistEnable ||
            (saleInfo.poolInfos[round].whitelistEnable &&
              userInfo.isWhitelisted)) &&
          (saleInfo.poolInfos[round].userLimitAmount.eq(0) ||
            userPurchaseAvailable.gte(inAmountInUSD)) &&
          (saleInfo.poolInfos[round].minStrkAmount.eq(0) ||
            new BigNumber(outAssetValue)
              .times(1e18)
              .gte(saleInfo.poolInfos[round].minStrkAmount)) &&
          Number(outAssetValue) <=
            Number(roundSold.offeringAmount - roundSold.strkAmount)
      );
  }, [
    openStatus,
    userInfo,
    saleInfo,
    roundSold,
    inAssetValue,
    outAssetValue,
    balance,
    userPurchaseAvailable,
    inAmountInUSD,
    round,
    pending
  ]);

  useEffect(() => {
    if (assetName === 'eth')
      setInAmountInUSD(
        new BigNumber(inAssetValue).times(saleInfo.ethPrice).div(1e18)
      );
    else if (assetName === 'wbtc')
      setInAmountInUSD(
        new BigNumber(inAssetValue).times(saleInfo.wbtcPrice).div(1e18)
      );
    else setInAmountInUSD(new BigNumber(inAssetValue));
  }, [inAssetValue, assetName, saleInfo.ethPrice, saleInfo.wbtcPrice]);

  const handleCoinbasePayClick = async () => {
    if (!account) return;
    if (onrampInstance.current) onrampInstance.current.destroy();

    await initOnRamp(
      {
        appId: process.env.REACT_APP_COINBASE_PAY_APP_ID,
        experienceLoggedIn: 'new_tab',
        experienceLoggedOut: 'new_tab',
        target: '#info-modal',
        widgetParameters: {
          destinationWallets: [
            {
              address: account,
              blockchains: ['ethereum']
            }
          ]
        },
        onSuccess: () => {
          console.log('success');
        },
        onExit: event => {
          console.log('exit', event);
        },
        onEvent: event => {
          console.log('onEvent', event);
        },
        closeOnExit: true,
        closeOnSuccess: true
      },
      (error, instance) => {
        if (instance) {
          onrampInstance.current = instance;
          onrampInstance.current.open();
        }
      }
    );
  };

  const calcOutAssetValue = async value => {
    const outAmount = await getComputeAmount(
      assetName,
      value,
      round,
      vestingPlan
    );

    setOutAssetValue(outAmount);
  };

  const onInAssetChange = async e => {
    const regex =
      assetName === 'eth'
        ? /([0-9]*[.|,]{0,1}[0-9]{0,17})/s
        : /([0-9]*[.|,]{0,1}[0-9]{0,5})/s;
    const value = e.target.value.match(regex)[0];

    if (value.length > 1 && value[0] === '0' && value[1] !== '.') {
      setInAssetValue('0');
      return;
    }
    setInAssetValue(value);

    clearTimeout(timer);

    const newTimer = setTimeout(async () => {
      calcOutAssetValue(value);
    }, 350);

    setTimer(newTimer);
  };

  const calcInAssetValue = value => {
    if (value !== '') {
      if (assetName === 'eth')
        setInAssetValue(
          new BigNumber(
            vestingPlan === 0
              ? saleInfo.poolInfos[round].shortPrice
              : saleInfo.poolInfos[round].longPrice
          )
            .times(value)
            .div(saleInfo.ethPrice)
            .dp(6, 0)
            .toString(10)
        );
      else if (assetName === 'wbtc')
        setInAssetValue(
          new BigNumber(
            vestingPlan === 0
              ? saleInfo.poolInfos[round].shortPrice
              : saleInfo.poolInfos[round].longPrice
          )
            .times(value)
            .div(saleInfo.wbtcPrice)
            .dp(6, 0)
            .toString(10)
        );
      else
        setInAssetValue(
          new BigNumber(
            vestingPlan === 0
              ? saleInfo.poolInfos[round].shortPrice
              : saleInfo.poolInfos[round].longPrice
          )
            .div(1e18)
            .times(value)
            .toString(10)
        );
    } else {
      setInAssetValue('');
    }
  };
  const onOutAssetChange = e => {
    const regex =
      assetName === 'eth'
        ? /([0-9]*[.|,]{0,1}[0-9]{0,17})/s
        : /([0-9]*[.|,]{0,1}[0-9]{0,5})/s;
    const value = e.target.value.match(regex)[0];

    if (value.length > 1 && value[0] === '0' && value[1] !== '.') {
      setInAssetValue('0');
      return;
    }

    setOutAssetValue(value);
    calcInAssetValue(value);
  };

  const onConfirm = status => {
    if (status === 'success') {
      onSoldReload();
      setUserInfoReload(prevState => prevState + 1);
      setTokenBalanceReload(prevState => prevState + 1);
      setRoundSoldReload(prevState => prevState + 1);
      setInAssetValue('');
      setOutAssetValue('');
      toast.success('Purchased successfully!', {
        theme: 'colored'
      });
    } else if (status === 'reject') {
      toast.error('User denied transaction signature.', {
        theme: 'colored'
      });
    } else if (status === 'fail')
      toast.error('Purchase failed unexpectedly.', {
        theme: 'colored'
      });
  };

  // const onApprove = async () => {
  //   try {
  //     setPending(true);
  //     await approveToken(
  //       new BigNumber(inAssetValue)
  //         .times(
  //           new BigNumber(10).pow(
  //             ASSET[chainId || requiredChainId][assetName].decimal
  //           )
  //         )
  //         .toString(10)
  //     );
  //     setApproveReload(prevState => prevState + 1);
  //     setPending(false);
  //   } catch (error) {
  //     setPending(false);
  //   }
  // };

  return (
    <div className="sale-card">
      {openStatus !== 'Open' ? (
        <div className="not-connect-card">
          <div className="title">
            A New <span className="text-highlight">STRK SALE</span> Round is
            loading: sit tight!
          </div>
          <img src={StrkLogoImg} className="logo" alt="logo" />
          {(round > 0 || openStatus === 'Done') && (
            <>
              <NavLink to="/history" style={{ width: '100%' }}>
                <div className="history-btn">
                  <img src={TxHistoryImg} alt="tx-history" />
                  Transaction History
                </div>
              </NavLink>

              <div className="connect-btn">
                <ConnectWalletButton />
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="connect-card">
          <div className="vesting-plan-card">
            <div className="title">Choose Vesting Plan</div>
            {saleInfo.poolInfos[round].whitelistEnable &&
              !userInfo.isWhitelisted && (
                <div
                  style={{
                    color: 'red',
                    textAlign: 'center',
                    marginTop: '10px',
                    fontSize: '15px'
                  }}
                >
                  You are not whitelisted. Please register{' '}
                  <a
                    href="https://forms.gle/bVgJeV6Bo9SWR6bk8"
                    target="_blank"
                    rel="noreferrer"
                  >
                    here
                  </a>
                </div>
              )}
            <div className="vesting-plan">
              <div
                className={`card ${vestingPlan === 0 ? 'active' : ''}`}
                onClick={() => {
                  setVestingPlan(0);
                  setInAssetValue('');
                  setOutAssetValue('');
                }}
              >
                <div className="text-highlight">
                  ${getReadableNumber(saleInfo.poolInfos[round].shortPrice, 18)}{' '}
                  = STRK
                </div>
                <div>
                  {100 -
                    Number(saleInfo.poolInfos[round].shortVestingPercentage)}
                  % immediately release
                  {/* {saleInfo.poolInfos[round].shortVestingDuration} Months daily
                  linear vesting */}
                </div>
              </div>
              <div
                className={`card ${vestingPlan === 1 ? 'active' : ''}`}
                onClick={() => {
                  setVestingPlan(1);
                  setInAssetValue('');
                  setOutAssetValue('');
                }}
              >
                <div className="text-highlight">
                  ${getReadableNumber(saleInfo.poolInfos[round].longPrice, 18)}{' '}
                  = STRK
                </div>
                <div>
                  {saleInfo.poolInfos[round].longVestingPercentage}%{' '}
                  {saleInfo.poolInfos[round].longVestingDuration} Months daily
                  linear vesting
                </div>
              </div>
            </div>
          </div>
          <div className="buy-card">
            <div className="buy-option">
              <div className="card active">
                <BtcImg />
                Buy With Crypto
              </div>
              <div className="card" onClick={() => handleCoinbasePayClick()}>
                <CoinbaseImg />
                Buy With Coinbase Pay
              </div>
            </div>

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

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                className="asset-balance"
                onClick={() => {
                  setInAssetValue(
                    getReadableNumber(
                      balance,
                      ASSET[chainId || requiredChainId][assetName].decimal,
                      false,
                      4,
                      1
                    )
                  );
                  calcOutAssetValue(
                    getReadableNumber(
                      balance,
                      ASSET[chainId || requiredChainId][assetName].decimal,
                      false,
                      4,
                      1
                    )
                  );
                }}
              >
                Balance :{' '}
                {getReadableNumber(
                  balance,
                  ASSET[chainId || requiredChainId][assetName].decimal,
                  true,
                  4,
                  1
                )}
              </div>
              <div
                className="available-strk"
                onClick={() => {
                  setOutAssetValue(
                    getReadableNumber(
                      roundSold.offeringAmount - roundSold.strkAmount,
                      0,
                      false,
                      4,
                      1
                    )
                  );
                  calcInAssetValue(
                    getReadableNumber(
                      roundSold.offeringAmount - roundSold.strkAmount,
                      0,
                      false,
                      4,
                      1
                    )
                  );
                }}
              >
                Available :{' '}
                {getReadableNumber(
                  roundSold.offeringAmount - roundSold.strkAmount,
                  0,
                  true,
                  4,
                  1
                )}{' '}
                STRK
              </div>
            </div>

            <div className="input-option">
              <div className="input-card active">
                <div className="asset">
                  <img
                    src={ASSET[chainId || requiredChainId][assetName].image}
                    alt="left-asset"
                  />
                  {(assetName !== 'eth'
                    ? assetName
                    : Number(currentNetworkId) === 2
                    ? 'bnb'
                    : 'eth'
                  ).toUpperCase()}
                </div>

                <input
                  type="text"
                  placeholder="0"
                  value={inAssetValue}
                  onChange={e => onInAssetChange(e)}
                />
              </div>
              <div className="input-card">
                <div className="asset">
                  <img src={strkImg} alt="right-asset" />
                  STRK
                </div>
                <input
                  type="text"
                  placeholder="0"
                  value={outAssetValue}
                  onChange={e => onOutAssetChange(e)}
                />
              </div>
            </div>

            <div className="asset-option">
              <div className="label">Asset : </div>
              <div
                className="asset"
                onClick={() => {
                  setAssetName('eth');
                  setInAssetValue('');
                  setOutAssetValue('');
                }}
              >
                <img
                  src={Number(currentNetworkId) === 2 ? bnbImg : ethImg}
                  alt="asset"
                />
                {Number(currentNetworkId) === 2 ? 'BNB' : 'ETH'}
              </div>
              <div
                className="asset"
                onClick={() => {
                  setAssetName('usdt');
                  setInAssetValue('');
                  setOutAssetValue('');
                }}
              >
                <img src={usdtImg} alt="asset" />
                USDT
              </div>
              <div
                className="asset"
                onClick={() => {
                  setAssetName('usdc');
                  setInAssetValue('');
                  setOutAssetValue('');
                }}
              >
                <img src={usdcImg} alt="asset" />
                USDC
              </div>
              <div
                className="asset"
                onClick={() => {
                  setAssetName('dai');
                  setInAssetValue('');
                  setOutAssetValue('');
                }}
              >
                <img src={daiImg} alt="asset" />
                DAI
              </div>
              <div
                className="asset"
                onClick={() => {
                  setAssetName('wbtc');
                  setInAssetValue('');
                  setOutAssetValue('');
                }}
              >
                <img src={wbtcImg} alt="asset" />
                WBTC
              </div>
            </div>

            <div className="limit-info">
              <div
                className={
                  saleInfo.poolInfos[round].userLimitAmount.gt(0) &&
                  userPurchaseAvailable.lt(inAmountInUSD)
                    ? 'red'
                    : ''
                }
              >
                Maximum purchase amount:{' '}
                {saleInfo.poolInfos[round].userLimitAmount.eq(0)
                  ? 'No limit'
                  : `$${getReadableNumber(
                      saleInfo.poolInfos[round].userLimitAmount,
                      18
                    )}`}
              </div>
              <div
                className={
                  saleInfo.poolInfos[round].minStrkAmount.gt(0) &&
                  new BigNumber(outAssetValue)
                    .times(1e18)
                    .lt(saleInfo.poolInfos[round].minStrkAmount)
                    ? 'red'
                    : ''
                }
              >
                Minimum purchase amount:{' '}
                {saleInfo.poolInfos[round].minStrkAmount.eq(0)
                  ? 'No limit'
                  : `$${getReadableNumber(
                      saleInfo.poolInfos[round].minStrkAmount.times(
                        vestingPlan === 0
                          ? saleInfo.poolInfos[round].shortPrice
                          : saleInfo.poolInfos[round].longPrice
                      ),
                      36
                    )}`}
              </div>
              {account && (
                <div
                  className={
                    saleInfo.poolInfos[round].userLimitAmount.gt(0) &&
                    userPurchaseAvailable.lt(inAmountInUSD)
                      ? 'red'
                      : ''
                  }
                >
                  Your purchased amount: $
                  {getReadableNumber(
                    userInfo.shortRewards[round]
                      .times(saleInfo.poolInfos[round].shortPrice)
                      .plus(
                        userInfo.longRewards[round].times(
                          saleInfo.poolInfos[round].longPrice
                        )
                      ),
                    54
                  )}
                </div>
              )}
            </div>

            {account ? (
              <>
                <div className="action-option">
                  {assetName !== 'eth' &&
                  new BigNumber(inAssetValue).gt(0) &&
                  allowance.lt(
                    new BigNumber(inAssetValue).times(
                      new BigNumber(10).pow(
                        ASSET[chainId || requiredChainId][assetName].decimal
                      )
                    )
                  ) ? (
                    <div
                      className={`buy-btn ${purchaseEnable ? 'enable' : ''}`}
                      onClick={() => {
                        if (purchaseEnable) {
                          setPending(true);
                          setConfirmModalOpen('approve');
                        }
                      }}
                    >
                      {pending && (
                        <Spin className="spinner" indicator={antIcon} />
                      )}
                      Approve
                    </div>
                  ) : (
                    <div
                      className={`buy-btn ${purchaseEnable ? 'enable' : ''}`}
                      onClick={() => {
                        if (purchaseEnable) {
                          setPending(true);
                          setConfirmModalOpen('buy');
                        }
                      }}
                    >
                      {pending && (
                        <Spin className="spinner" indicator={antIcon} />
                      )}
                      Buy Now
                    </div>
                  )}

                  <NavLink to="/history">
                    <div className="history-btn">
                      <img src={TxHistoryImg} alt="tx-history" />
                      Transaction History
                    </div>
                  </NavLink>
                </div>

                <div className="connect-btn">
                  <ConnectWalletButton />
                </div>
              </>
            ) : (
              <div className="connect-btn">
                <ConnectWalletButton />
              </div>
            )}
          </div>
        </div>
      )}
      {confirmModalOpen && (
        <ConfirmModal
          visible={confirmModalOpen}
          onCancel={() => {
            setPending(false);
            setConfirmModalOpen('');
          }}
          pid={round}
          inAsset={assetName}
          inAmount={inAssetValue}
          vestingPlan={vestingPlan}
          planName={
            vestingPlan === 0
              ? `${saleInfo.poolInfos[round].shortVestingPercentage}% ${saleInfo.poolInfos[round].shortVestingDuration} Months`
              : `${saleInfo.poolInfos[round].longVestingPercentage}% ${saleInfo.poolInfos[round].longVestingDuration} Months`
          }
          strkPrice={
            vestingPlan === 0
              ? `$ ${getReadableNumber(
                  saleInfo.poolInfos[round].shortPrice,
                  18
                )}`
              : `$ ${getReadableNumber(
                  saleInfo.poolInfos[round].longPrice,
                  18
                )}`
          }
          outAmount={outAssetValue}
          setApproveReload={() => setApproveReload(prevState => prevState + 1)}
          approveReload={approveReload}
          ethPrice={saleInfo.ethPrice}
          onConfirm={status => onConfirm(status)}
        />
      )}
    </div>
  );
};

export default compose(withRouter)(SaleCard);
