import React, { useState } from 'react';
import Minus from 'assets/img/svgs/minus.svg';
import Plus from 'assets/img/svgs/plus.svg';
import './Faq.scss';

const faq = [
  {
    q: 'What is Strike Finance?',
    ans:
      'Strike Finance is a decentralized finance platform offering exceptional APY rates for various token markets, including wstETH.'
  },
  {
    q: 'How does Strike Finance differ from Aave and Compound?',
    ans:
      'Strike Finance provides significantly higher APY rates in the wstETH market, ensuring greater earnings potential.'
  },
  {
    q: 'What is the current APY offered by Strike Finance for wstETH?',
    ans: `Strike Finance's APY for wstETH is substantially higher than other platforms, allowing for increased earnings.`
  },
  {
    q: 'How much can I earn supplying wstETH to Strike Finance?',
    ans:
      'For 100 wstETH supplied for 30 days, you can potentially earn around 88.04108584 STRK, valued at ~$1000.'
  },
  {
    q: `What's the long-term potential for earnings with wstETH on Strike Finance?`,
    ans: `Supplying 100 wstETH for a year could yield approximately 1071.166544 STRK, valued at ~$12854.`
  },
  {
    q: `Are there any exclusive incentives for Lido Finance users moving to Strike Finance?`,
    ans: `Yes, migrating to Strike Finance offers exclusive incentives in addition to ETH rewards from Lido Finance.`
  },
  {
    q: `Can I earn additional STRK and USDC rewards by vesting my STRK rewards from wstETH supply?`,
    ans: `Vesting your STRK rewards can unlock further STRK and USDC rewards from Strike Finance.`
  },
  {
    q: 'How will Strike Finance increase STRK rewards?',
    ans: `STRK rewards will increase by boosting the wstETH market volume, providing more opportunities for higher earnings.`
  },
  {
    q: `Is my wstETH safe on Strike Finance?`,
    ans: `Strike Finance employs robust security measures to ensure the safety of user assets.`
  },
  {
    q: `How easy is it to start supplying wstETH on Strike Finance?`,
    ans: `Supplying wstETH is a straightforward process on Strike Finance and can be initiated with a few simple steps.`
  },
  {
    q: 'Are there any fees associated with supplying wstETH?',
    ans: `Strike Finance operates with minimal fees, maximizing user earnings.`
  },
  {
    q: `Can I withdraw my supplied wstETH at any time?`,
    ans: `Users can withdraw their supplied wstETH whenever they desire, ensuring flexibility.`
  },
  {
    q: `Is there a minimum requirement to supply wstETH to Strike Finance?`,
    ans: `Strike Finance accommodates various supply amounts, ensuring accessibility for all users.`
  },
  {
    q: `What advantages does Strike Finance offer for long-term wstETH suppliers?`,
    ans: `Long-term suppliers stand to gain significantly higher rewards due to compounding effects.`
  },
  {
    q: `Does Strike Finance offer customer support for user queries?`,
    ans: `Yes, Strike Finance has a dedicated customer support system to assist users with any questions or concerns.`
  },
  {
    q: 'Can I track my earnings and rewards on Strike Finance?',
    ans: `Strike Finance provides an interface where users can monitor their earnings and rewards.`
  },
  {
    q: 'What kind of rewards can I expect in addition to STRK and USDC?',
    ans:
      'Strike Finance offers a range of rewards, including exclusive bonuses and further incentives.'
  },

  {
    q: 'How frequently are rewards distributed by Strike Finance?',
    ans: `Rewards are distributed at regular intervals as per the platform's defined schedule.`
  },
  {
    q: 'Does Strike Finance provide incentives for referring new users?',
    ans:
      'Strike Finance offers referral incentives for users who bring in new participants.'
  },
  {
    q: `Where can I learn more about Strike Finance's wstETH market and rewards system?`,
    ans: `For detailed information, visit Strike Finance's platform or social media channels for comprehensive insights into the wstETH market and reward system.`
  }
];
const Faq = () => {
  const [ans, setAns] = useState(-1);
  return (
    <div className="faq" id="faq">
      <div className="faq-wrapper">
        <div className="slider-animation">
          <div className="slider">
            <span className="slider-text">FAQS</span>
            <span className="slider-text">FAQS</span>
            <span className="slider-text">FAQS</span>
            <span className="slider-text">FAQS</span>
            <span className="slider-text">FAQS</span>
            <span className="slider-text">FAQS</span>
            <span className="slider-text">FAQS</span>
          </div>
          <div className="slider">
            <span className="slider-text">FAQS</span>
            <span className="slider-text">FAQS</span>
            <span className="slider-text">FAQS</span>
            <span className="slider-text">FAQS</span>
            <span className="slider-text">FAQS</span>
            <span className="slider-text">FAQS</span>
            <span className="slider-text">FAQS</span>
          </div>
        </div>
        <div className="faq-content">
          {faq.map((item, idx) => {
            return (
              <div key={idx} className="faq-wrapper" id={idx}>
                <div className="flex align-center just-between faq-wrapper-question">
                  <span className="question">{item.q}</span>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => setAns(idx === ans ? -1 : idx)}
                  >
                    <img alt="icon" src={idx === ans ? Minus : Plus} />
                  </button>
                </div>
                <div className={`ans ${idx === ans ? 'open' : 'collapse'}`}>
                  {item.ans}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Faq;
