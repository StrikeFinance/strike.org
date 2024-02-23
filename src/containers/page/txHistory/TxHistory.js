import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import WrapLayout from 'containers/Layout/WrapLayout/WrapLayout';
import { useActiveWeb3React } from 'hooks';
import { useUserTxHistory } from 'hooks/useUserTxHistory';
import { shortenAddr } from 'utilities/common';
import ConnectWalletButton from 'components/ConnectWalletButton';
import EmptyBoxImg from 'assets/img/homepage/empty-box.svg';
import './TxHistory.scss';

const TxHistory = () => {
  const { account } = useActiveWeb3React();
  const userTxHistory = useUserTxHistory(account);

  return (
    <WrapLayout>
      <div className="tx-history-homepage">
        <div className="tx-history-content">
          <div className="title">
            <FormattedMessage id="Transaction_History" />
          </div>
          {/* <div className="description">
            Earn 20% of deposits of your referrals. 15% in the token they
            deposited + 5% in DEFI tokens.
          </div> */}
          <div className="history-card">
            {account ? (
              <>
                {false ? (
                  <div className="empty-card">
                    <img src={EmptyBoxImg} alt="empty-box" />
                    <span>
                      <FormattedMessage id="You_do_not_have_transactions" />
                    </span>
                  </div>
                ) : (
                  <div className="history-table">
                    <div className="tbl-header">
                      <div className="tbl-col">
                        <FormattedMessage id="No" />.
                      </div>
                      <div className="tbl-col">
                        <FormattedMessage id="Chain" />
                      </div>
                      <div className="tbl-col">
                        <FormattedMessage id="Round" />
                      </div>
                      <div className="tbl-col">
                        <FormattedMessage id="Vesting" />
                      </div>
                      <div className="tbl-col">
                        <FormattedMessage id="txhash" />
                      </div>
                      <div className="tbl-col">
                        <FormattedMessage id="Asset" />
                      </div>
                      <div className="tbl-col">STRK</div>
                      <div className="tbl-col">
                        <FormattedMessage id="Date" />
                      </div>
                    </div>
                    {userTxHistory.map((item, index) => (
                      <div className="tbl-row" key={`row_${index}`}>
                        <div className="tbl-col">
                          <span className="tbl-mobile-col">
                            <FormattedMessage id="No" />:
                          </span>
                          <span>{index + 1}</span>
                        </div>
                        <div className="tbl-col">
                          <span className="tbl-mobile-col">
                            <FormattedMessage id="Chain" />:
                          </span>
                          <span>{item.chain}</span>
                        </div>
                        <div className="tbl-col">
                          <span className="tbl-mobile-col">
                            <FormattedMessage id="Round" />:
                          </span>
                          <span>{item.pid >= 0 ? item.pid + 1 : ''}</span>
                        </div>
                        <div className="tbl-col">
                          <span className="tbl-mobile-col">
                            <FormattedMessage id="Plan" />:
                          </span>
                          <span>{item.plan}</span>
                        </div>
                        <div className="tbl-col">
                          <span className="tbl-mobile-col">
                            <FormattedMessage id="txhash" />:
                          </span>
                          <a
                            href={item.txHash}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {shortenAddr(item.txHash, 20)}
                          </a>
                        </div>
                        <div className="tbl-col">
                          <span className="tbl-mobile-col">
                            <FormattedMessage id="Asset" />:
                          </span>
                          <span>
                            {item.amount} {item.asset}
                          </span>
                        </div>
                        <div className="tbl-col">
                          <span className="tbl-mobile-col">STRK:</span>
                          <span>{item.boughtAmount} STRK</span>
                        </div>
                        <div className="tbl-col">
                          <span className="tbl-mobile-col">
                            <FormattedMessage id="Date" />:
                          </span>
                          <div>{item.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="empty-card">
                <span style={{ marginBottom: '20px' }}>
                  <FormattedMessage id="Please_connect_your_wallet" />
                </span>
                <div className="connect-btn">
                  <ConnectWalletButton />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </WrapLayout>
  );
};

export default compose(withRouter)(TxHistory);
