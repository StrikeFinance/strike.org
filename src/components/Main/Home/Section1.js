import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import vector2 from 'assets/img/vector1-2.png';
import vector from 'assets/img/landingpage/rectangle-opacity-1.png';
import vector3 from 'assets/img/landingpage/rectangle.png';
import vector4 from 'assets/img/landingpage/rectangle-opacity-2.png';
import mouse from 'assets/img/landingpage/mouse.png';
import arrowDown from 'assets/img/landingpage/arrow-down.png';

const Section1Wrapper = styled.div`
width: 100%;
padding-left: 84px;
background-color: var(--color-bg-main);
margin: 100px 0;
height: 500px;

@media only screen and (max-width: 768px) {
  padding-left: 20px;
}
#hero {
  display: flex;
  justify-content: space-between;
}
.content {
  overflow: hidden;
  margin-left: 120px;
  flex: 2;
  h4 {
    font-family: 'Avenir'
    font-size: 61px;
    font-weight: 600;
    @media only screen and (max-width: 768px) {
      font-size: 24px;
      padding-top: 40px;
    }
    span {
      color: #107DEF;
      border-radius: 13px;
      background: #c5d8f6;
      padding: 2px;
      height: 65px;
      display: inline-block;
    }
  }
  .slideshowSlider {
    white-space: nowrap;
    transition: ease 1000ms;
  }
  .btn-wrapper {
    .app-btn {
      width: 150px;
      height: 32px;
      border-radius: 5px;
      box-shadow: 0px 4px 13px 0 rgba(39, 126, 230, 0.64);
      background-color: #277ee6;
      font-size: 13.5px;
      font-weight: 500;
      color: #ffffff;
      margin-right: 22px;
      &:hover {
        background-color: #477ee6;
        color: #ffffff;
      }
      @media only screen and (max-width: 768px) {
        font-size: 12px;
      }
    }
    .whitepaper-btn {
      width: 150px;
      height: 32px;
      border-radius: 5px;
      box-shadow: 0px 4px 13px 0 rgba(39, 126, 230, 0.64);
      background-color: #435fbd;
      font-size: 13.5px;
      font-weight: 500;
      color: #ffffff;
      &:hover {
        background-color: #477ee6;
        color: #ffffff;
      }
      @media only screen and (max-width: 768px) {
        font-size: 12px;
      }
    }
  }
  .slide-show {
    display: inline-block;
    width: 100%
    h4 {
      word-wrap: break-word;

    }
  }
}
.imgs {
  position: relative;
  width: 100%;
  height: 100%;
  right: 0;
  padding-left: 80px;
  flex: 1;
  @media only screen and (max-width: 768px) {
    padding: 0;
  }
  .vector-image {
    max-width: 100%;
  }
  .coin-image {
    position: absolute;
    top: 5%;
    left: 0;
    width: 45%;
    margin: auto;
    @media only screen and (max-width: 768px) {
      width: 80%;
      top: 0;
    }
  }
}
`;

function Section1({ history, markets }) {
  const dataFake = [
    {
      cryptoName: 'ETH',
      amount: '$12,123,652',
      size: 100
    },
    {
      cryptoName: 'BTC',
      amount: '$65,123,652',
      size: 152
    },
    {
      cryptoName: 'ELM',
      amount: '$82,123,652',
      size: 104
    }
  ];
  const [index, setIndex] = useState(0);
  const timeoutRef = React.useRef(null);
  const delay = 2500;
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex(prevIndex =>
          prevIndex === markets.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);
  return (
    <Section1Wrapper
      id="hero"
      className="test-123 flex align-center just-between"
    >
      <div className="content">
        <div
          className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {markets.map((data, i) => {
            return (
              <div className="slide-show" key={i}>
                <h4>The Strike protocol currently</h4>
                <h4>
                  has <span>${new Intl.NumberFormat({ maximumSignificantDigits: 3 }).format(data.totalSupply)
                  }</span> {data.underlyingName} across
                </h4>
                <h4>{data.supplyApy}% sToken markets</h4>
              </div>
            );
          })}
        </div>
      </div>
      <div className="imgs">
        <img src={vector2} className="coin-image" alt="" />
      </div>

      {/* <div className="mouse">
        <img src={mouse} className="icon-mouse" />
        <img src={arrowDown} className="icon-arrow" />
      </div> */}
    </Section1Wrapper>
  );
}

Section1.propTypes = {
  history: PropTypes.object,
  markets: PropTypes.object
};

Section1.defaultProps = {
  history: {},
  markets: {}
};

export default compose(withRouter)(Section1);
