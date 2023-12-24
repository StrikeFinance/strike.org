/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import Countdown, { zeroPad } from 'react-countdown';
import { Progress, Tooltip } from 'antd';
import useRefresh from 'hooks/useRefresh';
import { useSaleInfo } from 'hooks/useSaleInfo';
import { useSoldInfo } from 'hooks/useSoldInfo';
import { useWeb3, useActiveWeb3React } from 'hooks';
import infoImg from 'assets/img/homepage/question.png';
import santaHatImg from 'assets/img/homepage/santa-hat.svg';
import christmasBannerImg from 'assets/img/homepage/christmas-banner.svg';
import SaleCard from './SaleCard';
import ClaimCard from './ClaimCard';
import './Sale.scss';

const Sale = ({ xmasSale, claim }) => {
  const totalRaiseStrk = process.env.REACT_APP_TOTAL_RAISE_STRK;
  const { account, chainId, requiredChainId } = useActiveWeb3React();
  const web3 = useWeb3();
  const { fastRefresh } = useRefresh();
  const saleInfo = useSaleInfo(web3, chainId || requiredChainId);
  const [timeToWait, setTimeToWait] = useState(new Date().getTime());
  const [round, setRound] = useState(-1);
  const [openStatus, setOpenStatus] = useState('Coming');
  const [currentPrice, setCurrentPrice] = useState('$0');
  const [roundSoldReload, setRoundSoldReload] = useState(0);
  const { roundSold } = useSoldInfo(round, roundSoldReload);

  useEffect(() => {
    const currentTimestamp = Math.floor(new Date().getTime() / 1000);

    for (let i = 0; i < saleInfo.poolInfos.length; i += 1) {
      if (saleInfo.poolInfos[i].startTime === 0) {
        setTimeToWait(new Date().getTime());
        if (i > 0) {
          setRound(i - 1);
          setOpenStatus('Done');
        } else {
          setOpenStatus('Coming');
        }
        break;
      }
      if (currentTimestamp < saleInfo.poolInfos[i].startTime) {
        setTimeToWait(saleInfo.poolInfos[i].startTime * 1000);
        setRound(i);
        setOpenStatus('Coming');
        break;
      }
      if (currentTimestamp < saleInfo.poolInfos[i].endTime) {
        setTimeToWait(saleInfo.poolInfos[i].endTime * 1000);
        setRound(i);
        setOpenStatus('Open');
        break;
      } else if (i === 4) {
        setTimeToWait(new Date().getTime());
        setRound(i);
        setOpenStatus('Done');
      }
    }
  }, [saleInfo, fastRefresh]);

  const renderer = ({ days, hours, minutes, seconds }) => {
    return (
      <div className="countdown">
        <div className="pad">
          <div className="value">{zeroPad(days)}</div>
          <div className="label">Days</div>
        </div>

        <div className="pad">
          <div className="value">{zeroPad(hours)}</div>
          <div className="label">Hours</div>
        </div>

        <div className="pad">
          <div className="value">{zeroPad(minutes)}</div>
          <div className="label">Minutes</div>
        </div>

        <div className="pad">
          <div className="value">{zeroPad(seconds)}</div>
          <div className="label">Seconds</div>
        </div>
      </div>
    );
  };

  if (
    (xmasSale && round === 4 && openStatus !== 'Done') ||
    (((round === 4 && openStatus === 'Done') || account) && claim)
  )
    return (
      <div className="sale-homepage">
        <div className="sale-content-wrapper">
          <div className="sale-content">
            <div className="left">
              {xmasSale ? (
                <div>
                  <img
                    src={santaHatImg}
                    alt="santa-hat"
                    className="santa-hat"
                  />
                  <div className="title">
                    JOIN OUR CHRISTMAS CELEBRATION AT STRIKE FINANCE
                    <div className="sub-title">
                      🎄
                      <span className="text-highlight">STRK TOKEN SALE</span>-
                      HOLIDAY SPECIAL!🌟
                    </div>
                  </div>
                  <div className="description">
                    This festive season, Strike Finance brings you an exciting
                    opportunity. Join us in our special Christmas STRK Token
                    Sale. It&apos;s time to add some holiday cheer to our
                    journey.
                    <br />
                    <br />
                    Check out our easy-to-follow{' '}
                    <a
                      href="https://strike-finance.medium.com/how-to-purchase-strk-tokens-in-the-strk-token-sale-039e21d81507"
                      target="_blank"
                      rel="noreferrer"
                    >
                      guide
                    </a>{' '}
                    to participate in the token sale and celebrate this holiday
                    season with us at Strike Finance.
                  </div>
                </div>
              ) : (
                <div>
                  <div className="title">
                    <div className="sub-title">IT&apos;S TIME TO CLAIM!</div>
                  </div>
                  <div className="description">
                    Thank you for participating in our STRK Token Sale. The sale
                    has now concluded, and it&apos;s time to claim the STRK
                    tokens you&apos;ve purchased.
                    <br />
                    <br />
                    If you have any questions or need assistance, please read
                    our{' '}
                    <a
                      href="https://strike-finance.medium.com/harvesting-and-claiming-strk-tokens-a-step-by-step-guide-41a1d41a61cb"
                      target="_blank"
                      rel="noreferrer"
                    >
                      claim tutorial
                    </a>{' '}
                    or contact our{' '}
                    <a
                      href="https://t.me/StrikeFinance"
                      target="_blank"
                      rel="noreferrer"
                    >
                      support team
                    </a>
                    .
                    <br />
                    <br />
                    We thank you for your participation and look forward to your
                    continued engagement with Strike Finance!
                  </div>
                </div>
              )}

              {xmasSale && (
                <div>
                  <div className="status">
                    <span className={`dot ${openStatus}`} />
                    <span>{openStatus.toUpperCase()}</span>
                  </div>

                  <Countdown
                    key={`timer_${timeToWait}`}
                    date={timeToWait}
                    renderer={renderer}
                  />

                  <div className="price-bar">
                    <div className="label" />
                    <div className="price">
                      Current round price:{' '}
                      <span className="high-light">{currentPrice}</span>
                      <Tooltip
                        placement="top"
                        title={
                          <div>
                            <div style={{ marginBottom: '10px' }}>
                              Round 1 - start price $9.99 with 3 months vesting
                              / vesting price $10.59 with 1 month vesting and
                              30% release at the end of the private round for
                              40k $STRK
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                              Round 2 - start price $10.29 with 3 months vesting
                              / vesting price $10.89 with 1 month vesting and
                              30% release at the end of the private round for
                              30k $STRK
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                              Round 3 - start price $10.59 / vesting price
                              $11.19 with 20k $STRK
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                              Round 4 - start price $10.89 / vesting price
                              $11.49 with 10k $STRK
                            </div>
                            <div>
                              Round 5 - start price $9.99 with 3 months vesting
                              / vesting price $10.59 with 1 month vesting and
                              30% release at the end of the private round for
                              40k $STRK
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
                    </div>
                  </div>

                  <div className="progress-bar">
                    <Progress
                      percent={
                        Number(roundSold.offeringAmount) > 0
                          ? Number(
                              (roundSold.strkAmount /
                                roundSold.offeringAmount) *
                                100
                            ).toFixed(2)
                          : 0
                      }
                      strokeColor="#107DEF"
                      strokeWidth={18}
                      showInfo={false}
                    />
                  </div>

                  <div className="round-bar">
                    <span className="sale-amount">
                      {Number(roundSold.offeringAmount) > 0
                        ? Number(
                            (roundSold.strkAmount / roundSold.offeringAmount) *
                              100
                          ).toFixed(2)
                        : 0}
                      %
                    </span>
                    <span className="round">
                      Round {round >= 0 ? round + 1 : '?'}/5
                    </span>
                    <span className="raise-amount">100%</span>
                  </div>
                </div>
              )}
            </div>
            <div className="right">
              {xmasSale ? (
                <SaleCard
                  round={round}
                  openStatus={openStatus}
                  onSoldReload={() =>
                    setRoundSoldReload(prevState => prevState + 1)
                  }
                  setCurrentPrice={price => setCurrentPrice(price)}
                />
              ) : (
                <ClaimCard
                  xmasSaleDone={round === 4 && openStatus === 'Done'}
                />
              )}
            </div>
          </div>
        </div>
        {xmasSale && (
          <img
            src={christmasBannerImg}
            alt="christmas-banner"
            className="christmas-banner"
          />
        )}
      </div>
    );

  return <></>;
};

export default compose(withRouter)(Sale);
