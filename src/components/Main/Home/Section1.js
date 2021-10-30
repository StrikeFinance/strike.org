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
import BigNumber from 'bignumber.js';

const Section1Wrapper = styled.div`
width: 100%;
padding-left: 84px;
background-color: var(--color-bg-main);
margin: 50px 0;
height: 500px;
display: flex;

@media only screen and (max-width: 768px) {
  padding-left: 20px;
  display: inline-block;
}

#hero {
  display: flex;
  justify-content: space-between;
}
.fix-class-hero {
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    display: inline-block;
  }
}
.content {
  overflow: hidden;
  margin-left: 120px;
  flex: 2;

  @media only screen and (max-width: 768px) {
    margin-left: 0;
    overflow: auto;
  }

  img.vector {
    position: absolute;
    top: 31%;
    left: 19%;
  }
  img.rectangle {
    margin-left: 7%;
  }
  h4 {
    font-family: 'Avenir'
    font-size: 61px;
    font-weight: 600;
    @media only screen and (max-width: 768px) {
      font-size: 39px;
    }
    span {
      color: #107DEF;
      border-radius: 13px;
      background: #c5d8f6;
      padding: 2px;
      height: 65px;
      white-space: normal;
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
    width: 100%;
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
    position: relative;
  }
  .vector-image {
    max-width: 100%;
  }
  .coin-image {
    position: absolute;
    top: 5%;
    width: 416px;
    margin: auto;
    @media only screen and (max-width: 768px) {
      width: 50%;
      position: absolute;
      right: 0;
    }
  }
  img.rectangle-opacity {
    margin-left: 45%;
    margin-top: 15%;
}
}
`;

const MouseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 768px) {
    padding: 100px 0px;
  }

  .mouse-wrapper{
    display: flex;
    flex-direction: column;
    margin: auto;
    .mouse {
      width: 20px;
      height: 30px;
    }
    .icon-arrow {
      width: 14.14px;
      height: 20.82px;
      margin-top: 5px;
      margin-left: 3px;
    }
  }
`;

function Section1({ markets }) {
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
    <>
      <Section1Wrapper id="hero" className="test-123 fix-class-hero">
        <div className="content">
          <img src={vector} className="vector" />
          <div
            className="slideshowSlider"
          >
            <div className="slide-show">
              <h4>The Strike protocol currently</h4>
              <h4>
                has{' '}
                <span>
                  $
                  {new Intl.NumberFormat({
                    maximumSignificantDigits: 3
                  }).format(markets.reduce((a,b) => a.plus(new BigNumber(b.totalSupply)), new BigNumber('0')))}
                </span>{' '}
                TVL across
              </h4>
              <h4>{markets.length} sToken markets</h4>
            </div>
          </div>
          <img src={vector3} className="rectangle" />
        </div>
        <div className="imgs">
          <img src={vector2} className="coin-image" alt="" />
          <img src={vector4} className="rectangle-opacity" alt="" />
        </div>
      </Section1Wrapper>
      <MouseWrapper>
        <div className="mouse-wrapper">
          <img src={mouse} className="icon-mouse" />
          <img src={arrowDown} className="icon-arrow" />
        </div>
      </MouseWrapper>
    </>
  );
}

Section1.propTypes = {
  markets: PropTypes.object
};

Section1.defaultProps = {
  markets: {}
};

export default compose(withRouter)(Section1);
