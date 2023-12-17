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
import SaleCard from './SaleCard';
import ClaimCard from './ClaimCard';
import './Sale.scss';

const Sale = () => {
  const totalRaiseStrk = process.env.REACT_APP_TOTAL_RAISE_STRK;
  const { chainId, requiredChainId } = useActiveWeb3React();
  const web3 = useWeb3();
  const { fastRefresh } = useRefresh();
  const saleInfo = useSaleInfo(web3, chainId || requiredChainId);
  const [timeToWait, setTimeToWait] = useState(new Date().getTime());
  const [round, setRound] = useState(0);
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
      } else if (i === 3) {
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

  return (
    <div className="sale-homepage">
      <div className="sale-content">
        <div className="left">
          <div>
            <div className="title">
              WE ARE ABOUT TO CONQUER WEB3
              <div className="sub-title">
                <span className="text-highlight">STRK Sale</span> IS HERE
              </div>
            </div>
            <div className="description">
              After four years of relentless development, we are approaching the
              goal of our mission. Our objectives are ambitious, aiming beyond
              the ordinary.
            </div>
            <div className="register-link">
              Register{' '}
              <a
                href="https://forms.gle/bVgJeV6Bo9SWR6bk8"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>{' '}
              for the Elite Group
            </div>
          </div>

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
                        Round 1 - start price $9.99 with 3 months vesting /
                        vesting price $10.59 with 1 month vesting and 30%
                        release at the end of the private round for 40k $STRK
                      </div>
                      <div style={{ marginBottom: '10px' }}>
                        Round 2 - start price $10.29 with 3 months vesting /
                        vesting price $10.89 with 1 month vesting and 30%
                        release at the end of the private round for 30k $STRK
                      </div>
                      <div style={{ marginBottom: '10px' }}>
                        Round 3 - start price $10.59 / vesting price $11.19 with
                        20k $STRK
                      </div>
                      <div>
                        Round 4 - start price $10.89 / vesting price $11.49 with
                        10k $STRK
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
                        (roundSold.strkAmount / roundSold.offeringAmount) * 100
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
                      (roundSold.strkAmount / roundSold.offeringAmount) * 100
                    ).toFixed(2)
                  : 0}
                %
              </span>
              <span className="round">Round {round + 1}/4</span>
              <span className="raise-amount">100%</span>
            </div>
          </div>
        </div>
        <div className="right">
          {Number(process.env.REACT_APP_CLAIM_OPEN) === 0 ? (
            <SaleCard
              round={round}
              openStatus={openStatus}
              onSoldReload={() =>
                setRoundSoldReload(prevState => prevState + 1)
              }
              setCurrentPrice={price => setCurrentPrice(price)}
            />
          ) : (
            <ClaimCard />
          )}
        </div>
      </div>
    </div>
  );
};

export default compose(withRouter)(Sale);
