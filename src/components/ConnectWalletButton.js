import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import ConnectModal from 'components/ConnectModal';
import ConnectWalletImg from 'assets/img/homepage/connect-wallet.svg';
import { connectorLocalStorageKey } from 'connectors';
import { useActiveWeb3React } from 'hooks';
import { useOutside } from 'hooks/useOutside';
import { useTokenBalance } from 'hooks/useTokenBalance';
import { shortenAddr, getReadableNumber } from 'utilities/common';

const StyledWalletInfoPopup = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const StyledPopup = styled.div`
  position: absolute;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  box-shadow: 0px 7px 80px rgba(0, 0, 0, 0.07),
    0px 2.92443px 33.4221px rgba(0, 0, 0, 0.0503198),
    0px 1.56354px 17.869px rgba(0, 0, 0, 0.0417275),
    0px 0.876509px 10.0172px rgba(0, 0, 0, 0.035),
    0px 0.465507px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 0.193708px 2.21381px rgba(0, 0, 0, 0.0196802);
  border-radius: 2px;
  padding: 16px 0;
  user-select: none;
  z-index: 10;

  @media (max-width: 1280px) {
    bottom: 40px;
  }

  @media (max-width: 480px) {
    bottom: 30px;
  }
`;

const StyledItem = styled.div`
  white-space: nowrap;
  padding: 10px 20px;
  display: flex;
  align-items: center;

  @media (max-width: 1280px) {
    font-size: 14px;
    padding: 5px 20px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 3px 20px;
  }
`;

const StyledWalletBalance = styled(StyledItem)`
  line-height: 20px;
  color: #f5f5f5;
  gap: 10px;
`;

const StyledWalletAddress = styled(StyledItem)`
  line-height: 18px;
  color: rgba(245, 245, 245, 0.8);
  gap: 7px;

  svg {
    cursor: pointer;
  }
`;

const StyledDisconnect = styled(StyledItem)`
  font-weight: 500;
  line-height: 20px;
  color: #e02b2b;
  cursor: pointer;
`;

export const Divider = styled.div`
  height: 1px;

  background: linear-gradient(
    90deg,
    rgba(245, 245, 245, 0.058) 0%,
    rgba(245, 245, 245, 0.2) 52.08%,
    rgba(245, 245, 245, 0.058) 100%
  );
`;

const StyledDivider = styled(Divider)`
  margin: 4px 0px;

  @media (max-width: 1280px) {
    margin: 3px 0px;
  }

  @media (max-width: 480px) {
    margin: 2px 0px;
  }
`;

const ConnectBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  color: white;
  width: 100%;
  padding: 12px 24px;
  border: 1px solid white;
  background: #1e1a22;
  font-size: 18px;
  max-height: 53px;

  img {
    width: 25px;
    height: 25px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    font-weight: 400;
  }
`;

const StyledCopied = styled.div`
  position: fixed;
  visibility: ${props => (props.showCopied ? 'visible' : 'hidden')};
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 16px;
  background-color: #107def;
  border-radius: 8px;
  transition: all 1s;
  color: white;
  opacity: ${props => (props.showCopied ? '1' : '0')};
  z-index: 200;
`;

// eslint-disable-next-line react/prop-types
function ConnectWalletButton({ tokenBalanceReload }) {
  const { connector, account, chainId } = useActiveWeb3React();

  const [openConnectModal, setOpenConnectModal] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const strkBalance = useTokenBalance(
    chainId,
    account,
    'strk',
    tokenBalanceReload
  );

  const wrapperRef = useRef(null);
  useOutside(wrapperRef, setShowPopup);

  const logout = async () => {
    window.localStorage.removeItem(connectorLocalStorageKey);
    if (account) {
      if (connector?.deactivate) {
        connector.deactivate();
      } else {
        connector.resetState();
      }
    }
  };

  const copiedWalletAddress = () => {
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const fallbackCopyTextToClipboard = text => {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      copiedWalletAddress();
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
  };

  const copyWalletAddress = address => {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(address);
      return;
    }
    navigator.clipboard.writeText(address).then(
      function() {
        copiedWalletAddress();
      },
      function(err) {
        console.error('Async: Could not copy text: ', err);
      }
    );
  };

  return (
    <>
      {account ? (
        <StyledWalletInfoPopup>
          <StyledCopied showCopied={showCopied}>Copied!</StyledCopied>
          <ConnectBtn
            onMouseUp={e => {
              e.preventDefault();
              e.stopPropagation();
              setShowPopup(!showPopup);
            }}
          >
            <img src={ConnectWalletImg} alt="connect-wallet" />
            {shortenAddr(account, 6, 6)}
          </ConnectBtn>
          {showPopup && (
            <StyledPopup ref={wrapperRef}>
              <StyledWalletBalance>
                Balance: {getReadableNumber(strkBalance, 18)} STRK
              </StyledWalletBalance>
              <StyledDivider />
              <StyledWalletAddress>
                {shortenAddr(account, 6, 6)}
                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => copyWalletAddress(account)}
                >
                  <path
                    d="M3.9 9.75H1.3C0.955219 9.75 0.624559 9.61304 0.380761 9.36924C0.136964 9.12544 0 8.79478 0 8.45V1.3C0 0.955218 0.136964 0.624558 0.380761 0.380761C0.624559 0.136964 0.955219 0 1.3 0L6.5 0C6.84478 0 7.17544 0.136964 7.41924 0.380761C7.66304 0.624558 7.8 0.955218 7.8 1.3V3.25H9.75L11.7 5.2V11.7C11.7 12.0448 11.563 12.3754 11.3192 12.6192C11.0754 12.863 10.7448 13 10.4 13H5.2C4.85522 13 4.52456 12.863 4.28076 12.6192C4.03696 12.3754 3.9 12.0448 3.9 11.7V9.75ZM3.9 8.45V4.55C3.9 4.20522 4.03696 3.87456 4.28076 3.63076C4.52456 3.38696 4.85522 3.25 5.2 3.25H6.5V1.3H1.3V8.45H3.9ZM9.2118 4.55H5.2V11.7H10.4V5.7382L9.2118 4.55Z"
                    fill="#F5F5F5"
                  />
                </svg>
              </StyledWalletAddress>
              <StyledDivider />
              <StyledDisconnect onClick={() => logout()}>
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.258 8.56914C11.258 9.12136 10.8103 9.56902 10.2581 9.56902L7.67722 9.56902C7.67692 9.56902 7.67662 9.56902 7.67632 9.56903C6.76665 9.57107 5.89476 9.93333 5.25166 10.5764C4.6088 11.2193 4.2467 12.0906 4.2444 12.9999C4.24674 13.9092 4.60886 14.7805 5.25166 15.4233C5.89501 16.0666 6.76729 16.4289 7.6772 16.4307C8.22903 16.4318 8.67565 16.8797 8.67512 17.4315C8.67458 17.9834 8.22709 18.4304 7.67526 18.4305L7.60929 18.4305C7.59027 18.4305 7.57138 18.4299 7.55262 18.4289C6.15754 18.3952 4.82663 17.8264 3.83762 16.8373C2.82014 15.8199 2.2475 14.4407 2.24464 13.0018L2.24464 12.9979C2.24747 11.5591 2.82009 10.1799 3.83762 9.16238C4.85505 8.14495 6.23437 7.57212 7.67325 7.56927L10.2581 7.56927C10.8103 7.56927 11.258 8.01693 11.258 8.56914Z"
                    fill="#E02B2B"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.2045 10.5765C19.5611 9.93313 18.6888 9.57087 17.7789 9.56908C17.2271 9.568 16.7805 9.12006 16.781 8.56822C16.7815 8.01639 17.229 7.56933 17.7809 7.56932L17.8468 7.56932C17.8658 7.56932 17.8847 7.56985 17.9034 7.5709C19.2985 7.60455 20.6295 8.17342 21.6185 9.16244C22.636 10.1799 23.2086 11.5591 23.2115 12.9979L23.2115 13.0019C23.2086 14.4407 22.636 15.8199 21.6185 16.8374C20.6011 17.8548 19.2217 18.4277 17.7829 18.4305L17.7809 18.4305L15.198 18.4305C14.6458 18.4305 14.1981 17.9829 14.1981 17.4306C14.1981 16.8784 14.6458 16.4308 15.198 16.4308L17.7789 16.4308C17.7792 16.4308 17.7794 16.4308 17.7797 16.4308C18.6894 16.4287 19.5613 16.0665 20.2045 15.4234C20.8473 14.7805 21.2094 13.9092 21.2117 13C21.2094 12.0906 20.8473 11.2193 20.2045 10.5765Z"
                    fill="#E02B2B"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.273 4.30617C16.7844 4.51468 17.0299 5.09823 16.8214 5.60957L10.4865 21.1452C10.2779 21.6565 9.6944 21.902 9.18306 21.6935C8.67171 21.485 8.42622 20.9015 8.63473 20.3901L14.9696 4.8545C15.1782 4.34316 15.7617 4.09766 16.273 4.30617Z"
                    fill="#E02B2B"
                  />
                </svg>
                Disconnect
              </StyledDisconnect>
            </StyledPopup>
          )}
        </StyledWalletInfoPopup>
      ) : (
        <ConnectBtn onClick={() => setOpenConnectModal(true)}>
          <img src={ConnectWalletImg} alt="connect-wallet" />
          Connect Wallet
        </ConnectBtn>
      )}
      <ConnectModal
        visible={openConnectModal}
        onCancel={() => setOpenConnectModal(false)}
      />
    </>
  );
}

export default ConnectWalletButton;
