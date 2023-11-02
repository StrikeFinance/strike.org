import React, { useState } from 'react';
import imgFaqExpand from 'assets/img/homepage/faq-expand.svg';
import imgFaqCollapse from 'assets/img/homepage/faq-collapse.svg';

import './Faq.scss';

const initialFaqData = [
  {
    question:
      'Similar visual appearance across all print processes goes perfectly ?',
    answer:
      'The other hand we denounce with righteou indg ation and dislike men who are so beguiled and demorali ed by the of pleasure of the moment.Dislike men who are so beguiled demoraliz worlds ed by the charms of pleasure of the moment. Lorem ipsum dolor sit',
    open: true
  },
  {
    question:
      'Similar visual appearance across all print processes goes perfectly ?',
    answer:
      'The other hand we denounce with righteou indg ation and dislike men who are so beguiled and demorali ed by the of pleasure of the moment.Dislike men who are so beguiled demoraliz worlds ed by the charms of pleasure of the moment. Lorem ipsum dolor sit',
    open: false
  },
  {
    question:
      'Similar visual appearance across all print processes goes perfectly ?',
    answer:
      'The other hand we denounce with righteou indg ation and dislike men who are so beguiled and demorali ed by the of pleasure of the moment.Dislike men who are so beguiled demoraliz worlds ed by the charms of pleasure of the moment. Lorem ipsum dolor sit',
    open: false
  },
  {
    question:
      'Similar visual appearance across all print processes goes perfectly ?',
    answer:
      'The other hand we denounce with righteou indg ation and dislike men who are so beguiled and demorali ed by the of pleasure of the moment.Dislike men who are so beguiled demoraliz worlds ed by the charms of pleasure of the moment. Lorem ipsum dolor sit',
    open: false
  },
  {
    question:
      'Similar visual appearance across all print processes goes perfectly ?',
    answer:
      'The other hand we denounce with righteou indg ation and dislike men who are so beguiled and demorali ed by the of pleasure of the moment.Dislike men who are so beguiled demoraliz worlds ed by the charms of pleasure of the moment. Lorem ipsum dolor sit',
    open: false
  }
];
function Faq() {
  const [faqData, setFaqData] = useState(initialFaqData);

  const updateOpenStatus = clickedIndex => {
    const temp = faqData.map((item, index) => {
      if (clickedIndex === index) {
        return { ...item, open: !item.open };
      }
      return item;
    });
    setFaqData([...temp]);
  };

  return (
    <div className="faqs" id="faqs">
      <div className="slider-animation">
        <div className="slider">
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
        </div>
      </div>
      <div className="faq-content">
        <div className="content">
          {faqData.map((faq, index) => (
            <div
              className="faq-item"
              key={`faq_${index}`}
              onClick={() => updateOpenStatus(index)}
            >
              <div className="faq-question">
                <div>{faq.question}</div>
                <img
                  className="action-img"
                  src={faq.open ? imgFaqCollapse : imgFaqExpand}
                  alt="action"
                />
              </div>
              {faq.open && <div className="faq-answer">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Faq;
