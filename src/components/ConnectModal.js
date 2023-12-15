import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { WalletConnect } from '@web3-react/walletconnect-v2';
import { Modal } from 'antd';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { connectAccount, accountActionCreators } from 'core';
import connectors, {
  CHAIN_IDS,
  connectorLocalStorageKey,
  installExtentionLinks
} from 'connectors';
import { getAddChainParameters } from 'chain';
import { useActiveWeb3React } from 'hooks';
import metamaskImg from 'assets/img/homepage/metamask.png';
import bitkeepImg from 'assets/img/homepage/bitkeep.png';
import coinbaseImg from 'assets/img/homepage/coinbase.png';
import walletConnectImg from 'assets/img/homepage/walletconnect.png';
import closeImg from 'assets/img/homepage/close.png';
import logoImg from 'assets/img/logo.png';

const ModalContent = styled.div`
  border-radius: 6px;
  box-shadow: 0px 0px 10px 0px #1760ed;

  .close-btn {
    position: absolute;
    top: 23px;
    right: 23px;
  }
  .header-content {
    margin-top: 45px;
    .logo-image {
      margin-bottom: 30px;
    }
    .title {
      font-size: 24.5px;
      color: var(--color-text-main);
    }
  }
  .connect-wallet-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 20px;
    column-gap: 20px;
    margin-bottom: 20px;
  }

  .connect-wallet-content {
    .wallet-btn {
      background: #1f242c;
      padding: 20px 0px 16px;
      width: 204px;
      border-radius: 6px;
      border: 1px solid #1f242c;
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;

      img {
        height: 40px;
      }

      span {
        color: var(--color-text-main);
        font-weight: normal;
        font-size: 14px;
        margin-top: 10px;
      }

      .arrow-icon {
        height: 25px;
      }

      &:hover {
        border: 1px solid #0c8ce9;
        background: #2b3947;

        span {
          color: white;
        }

        svg path {
          fill: white !important;
        }
      }
    }
  }

  .error-status {
    margin: 20px 0px;
    text-align: center;
  }

  .error-msg {
    width: 204px;
    background-color: rgba(255, 0, 0, 0.03);
    padding: 5px 10px;
    border-radius: 6px;
    color: var(--color-red);
    a {
      margin-left: 5px;
    }
  }

  .terms {
    color: var(--color-text-secondary);
    font-size: 12px;
    margin-bottom: 23px;

    a {
      color: white;
      font-weight: bold;
    }
  }

  @media (max-width: 420px) {
    .connect-wallet-wrapper {
      margin-bottom: 20px;
    }
    .connect-wallet-content {
      .wallet-btn {
        padding: 20px 0px 16px;
        width: 160px;
      }
    }
  }
`;

// settings, setSetting
function ConnectModal({ visible, onCancel }) {
  const { account, requiredChainId, isActive } = useActiveWeb3React();
  const [pendingError, setPendingError] = useState();

  useEffect(() => {
    if (account && isActive) {
      onCancel();
    }
  }, [account]);

  useEffect(() => {
    setPendingError();
  }, [visible]);

  const tryActivation = async p => {
    setPendingError();
    const tempConnector = p.provider;
    if (
      CHAIN_IDS[localStorage.getItem('network') || 0] === requiredChainId &&
      account
    ) {
      return;
    }

    if (tempConnector instanceof WalletConnect) {
      await tempConnector
        .activate(CHAIN_IDS[localStorage.getItem('network') || 0])
        .then(() => {
          window.localStorage.setItem(connectorLocalStorageKey, p.id);
        })
        .catch(error => {
          console.log(error);
          if (error?.code === 4001) {
            setPendingError({ desc: 'User rejected' });
          } else {
            setPendingError({ desc: error?.message });
          }
        });
    } else {
      if (p.id === 2 && (!window.bitkeep || !window.bitkeep.ethereum)) {
        // Bitkeep
        setPendingError({
          desc: installExtentionLinks[p.id].desc,
          linkDesc: installExtentionLinks[p.id].linkDesc,
          link: installExtentionLinks[p.id].link
        });
        return;
      }
      await tempConnector
        .activate(
          getAddChainParameters(CHAIN_IDS[localStorage.getItem('network') || 0])
        )
        .then(() => {
          window.localStorage.setItem(connectorLocalStorageKey, p.id);
        })
        .catch(error => {
          console.log({ error });
          if (
            error?.name === 'NoMetaMaskError' ||
            error?.name === 'r' ||
            !window.ethereum
          ) {
            setPendingError({
              desc: installExtentionLinks[p.id].desc,
              linkDesc: installExtentionLinks[p.id].linkDesc,
              link: installExtentionLinks[p.id].link
            });
          } else if (error?.code === 4001) {
            setPendingError({ desc: 'User Rejected' });
          } else {
            setPendingError({ desc: error?.message });
          }
        });
    }
  };

  useEffect(() => {
    if (localStorage.getItem('connectorId'))
      tryActivation(
        connectors[parseInt(localStorage.getItem('connectorId'), 10) - 1]
      );
  }, []);

  return (
    <Modal
      className="connect-modal"
      width={480}
      visible={visible}
      onCancel={onCancel}
      footer={null}
      closable={false}
      maskClosable
      centered
      zIndex={10}
    >
      <ModalContent className="flex flex-column align-center just-center">
        <img
          className="close-btn pointer"
          src={closeImg}
          alt="close"
          onClick={onCancel}
        />
        <div className="flex flex-column align-center just-center header-content">
          <img src={logoImg} alt="logo" className="logo-image" />
        </div>
        <div className="connect-wallet-wrapper">
          <div className="connect-wallet-content">
            <div
              className="wallet-btn"
              onClick={() => tryActivation(connectors[0])}
            >
              <img src={metamaskImg} alt="metamask" />
              <span>MetaMask</span>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.1327 13L8.19682 7.15601C7.93216 6.89559 7.93486 6.4789 8.20222 6.21848L9.26355 5.195C9.53632 4.93457 9.97381 4.93457 10.2439 5.1976L17.7975 12.5286C17.9325 12.6588 18 12.8281 18 13C18 13.1719 17.9325 13.3412 17.7975 13.4714L10.2439 20.8024C9.97381 21.0654 9.53632 21.0654 9.26356 20.805L8.20222 19.7815C7.93486 19.5211 7.93216 19.1044 8.19682 18.844L14.1327 13Z"
                  fill="#34384C"
                />
              </svg>
            </div>
          </div>

          <div className="connect-wallet-content">
            <div
              className="wallet-btn"
              onClick={() => tryActivation(connectors[1])}
            >
              <img className="bitkeep-img" src={bitkeepImg} alt="bitkeep" />
              <span>Bitkeep</span>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.1327 13L8.19682 7.15601C7.93216 6.89559 7.93486 6.4789 8.20222 6.21848L9.26355 5.195C9.53632 4.93457 9.97381 4.93457 10.2439 5.1976L17.7975 12.5286C17.9325 12.6588 18 12.8281 18 13C18 13.1719 17.9325 13.3412 17.7975 13.4714L10.2439 20.8024C9.97381 21.0654 9.53632 21.0654 9.26356 20.805L8.20222 19.7815C7.93486 19.5211 7.93216 19.1044 8.19682 18.844L14.1327 13Z"
                  fill="#34384C"
                />
              </svg>
            </div>
          </div>

          <div className="connect-wallet-content">
            <div
              className="wallet-btn"
              onClick={() => tryActivation(connectors[2])}
            >
              <img src={walletConnectImg} alt="metamask" />
              <span>Wallet Connect</span>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.1327 13L8.19682 7.15601C7.93216 6.89559 7.93486 6.4789 8.20222 6.21848L9.26355 5.195C9.53632 4.93457 9.97381 4.93457 10.2439 5.1976L17.7975 12.5286C17.9325 12.6588 18 12.8281 18 13C18 13.1719 17.9325 13.3412 17.7975 13.4714L10.2439 20.8024C9.97381 21.0654 9.53632 21.0654 9.26356 20.805L8.20222 19.7815C7.93486 19.5211 7.93216 19.1044 8.19682 18.844L14.1327 13Z"
                  fill="#34384C"
                />
              </svg>
            </div>
          </div>

          <div className="connect-wallet-content">
            <div
              className="wallet-btn"
              onClick={() => tryActivation(connectors[3])}
            >
              <img src={coinbaseImg} alt="metamask" />
              <span>Coinbase Wallet</span>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.1327 13L8.19682 7.15601C7.93216 6.89559 7.93486 6.4789 8.20222 6.21848L9.26355 5.195C9.53632 4.93457 9.97381 4.93457 10.2439 5.1976L17.7975 12.5286C17.9325 12.6588 18 12.8281 18 13C18 13.1719 17.9325 13.3412 17.7975 13.4714L10.2439 20.8024C9.97381 21.0654 9.53632 21.0654 9.26356 20.805L8.20222 19.7815C7.93486 19.5211 7.93216 19.1044 8.19682 18.844L14.1327 13Z"
                  fill="#34384C"
                />
              </svg>
            </div>
          </div>

          {/* <div className="connect-wallet-content">
            <div
              className="wallet-btn"
              onClick={}
            >
              <img src={trusteWalletImg} alt="metamask" />
              <span>Trust Wallet</span>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.1327 13L8.19682 7.15601C7.93216 6.89559 7.93486 6.4789 8.20222 6.21848L9.26355 5.195C9.53632 4.93457 9.97381 4.93457 10.2439 5.1976L17.7975 12.5286C17.9325 12.6588 18 12.8281 18 13C18 13.1719 17.9325 13.3412 17.7975 13.4714L10.2439 20.8024C9.97381 21.0654 9.53632 21.0654 9.26356 20.805L8.20222 19.7815C7.93486 19.5211 7.93216 19.1044 8.19682 18.844L14.1327 13Z"
                  fill="#34384C"
                />
              </svg>
            </div>
          </div> */}
        </div>

        {pendingError && (
          <div className="error-status">
            <div className="error-msg">{pendingError.desc}</div>
            {pendingError.link && (
              <a href={pendingError.link} target="_blank" rel="noreferrer">
                <b>{pendingError.linkDesc}</b>
              </a>
            )}
          </div>
        )}

        <div className="terms">
          By connecting, I accept Strike’s{' '}
          <a href="https://strike.org/terms" target="_blank" rel="noreferrer">
            Terms of Service
          </a>
        </div>
      </ModalContent>
    </Modal>
  );
}

ConnectModal.propTypes = {
  visible: PropTypes.bool,
  // settings: PropTypes.object,
  onCancel: PropTypes.func
  // setSetting: PropTypes.func.isRequired
};

ConnectModal.defaultProps = {
  visible: false,
  // settings: {},
  onCancel: () => {}
};

const mapStateToProps = ({ account }) => ({
  settings: account.setting
});

const mapDispatchToProps = dispatch => {
  const { setSetting, getGovernanceStrike } = accountActionCreators;

  return bindActionCreators(
    {
      setSetting,
      getGovernanceStrike
    },
    dispatch
  );
};

export default compose(connectAccount(mapStateToProps, mapDispatchToProps))(
  ConnectModal
);
