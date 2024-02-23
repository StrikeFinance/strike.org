import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Minus from 'assets/img/svgs/minus.svg';
import Plus from 'assets/img/svgs/plus.svg';
import './Faq.scss';

const faqCount = 20;

const Faq = () => {
  const [ans, setAns] = useState(-1);
  return (
    <div className="faq" id="faq">
      <div className="faq-wrapper">
        <div className="slider-animation">
          <div className="slider">
            <span className="slider-text">
              <FormattedMessage id="FAQS" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="FAQS" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="FAQS" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="FAQS" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="FAQS" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="FAQS" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="FAQS" />
            </span>
          </div>
          <div className="slider">
            <span className="slider-text">
              <FormattedMessage id="FAQS" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="FAQS" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="FAQS" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="FAQS" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="FAQS" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="FAQS" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="FAQS" />
            </span>
          </div>
        </div>
        <div className="faq-content">
          {Array.from({ length: faqCount }, (_, idx) => {
            return (
              <div className="faq-wrapper" id={idx}>
                <div className="flex align-center just-between faq-wrapper-question">
                  <span className="question">
                    <FormattedMessage id={`Faq_Q_${idx + 1}`} />
                  </span>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => setAns(idx === ans ? -1 : idx)}
                  >
                    <img alt="icon" src={idx === ans ? Minus : Plus} />
                  </button>
                </div>
                <div className={`ans ${idx === ans ? 'open' : 'collapse'}`}>
                  <FormattedMessage id={`Faq_A_${idx + 1}`} />
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
