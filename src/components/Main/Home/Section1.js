import React from 'react';
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

  @media only screen and (max-width: 768px) {
    padding-left: 20px;
  }

  .content {
    width: 75%;
    padding-left: 120px;

    .content-img {
      position: absolute;
      z-index: 0;
      left: 457px;
      top: 149px;
    }
    .content-img-bottom {
      position: absolute;
      top: 516px;
      left: 284px;
      z-index: 0;
    }

    h1 {
      max-width: 788px;
      margin-bottom: 39px;
      font-weight: 500;
      font-size: 61px;
      color: #0b0f23;

      @media only screen and (max-width: 768px) {
        font-size: 24px;
        padding-top: 40px;
      }
      .money-content {
        color: #107def;
        border: 1px;
        outline: none;
        background: rgba(216, 225, 250, 255);
        border-radius: 13px;
        padding: 9px 10px 3px 10px;
      }
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
  }

  .imgs {
    position: relative;
    width: 60%;
    height: 100%;
    right: -141px;
    padding-left: 80px;

    @media only screen and (max-width: 768px) {
      padding: 0;
    }

    .vector-image {
      position: absolute;
      top: -113px;
      z-index: 0;
      left: 368px;
    }

    .coin-image {
      position: absolute;
      top: -210px;
      left: 0;
      width: 60%;
      margin: auto;
      @media only screen and (max-width: 768px) {
        width: 80%;
        top: 0;
      }
    }
  }
  .mouse {
    position: absolute;
    z-index: 0;
    top: 67%;
    left: 50%;
    display: flex;
    flex-direction: column;

    .icon-mouse {
      padding-bottom: 14px;
    }
    .icon-arrow {
      animation: bounce 3s infinite;
    }
    @keyframes bounce {
      0%,
      20%,
      50%,
      80%,
      100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-10px);
      }
      60% {
        transform: translateY(-5px);
      }
    }
  }
`;

function Section1({ history }) {
  return (
    <Section1Wrapper id="hero" className="flex align-center just-between">
      <div className="content">
        <img className="content-img" src={vector} />
        <h1>
          The Strike protocol currently has{' '}
          <span className="money-content">$18,456,998</span> TVL across 10
          sToken markets
        </h1>
        <img className="content-img-bottom" src={vector3} />
      </div>
      <div className="imgs">
        <img src={vector4} className="vector-image" alt="" />
        <img src={vector2} className="coin-image" alt="" />
      </div>
      <div className="mouse">
        <img src={mouse} className="icon-mouse" />
        <img src={arrowDown} className="icon-arrow" />
      </div>
    </Section1Wrapper>
  );
}

Section1.propTypes = {
  history: PropTypes.object
};

Section1.defaultProps = {
  history: {}
};

export default compose(withRouter)(Section1);
