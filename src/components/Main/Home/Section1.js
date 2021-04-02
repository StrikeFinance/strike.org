import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import vector1 from 'assets/img/vector1-1.png';
import vector2 from 'assets/img/vector1-2.png';

const Section1Wrapper = styled.div`
  width: 100%;
  padding-left: 84px;
  background-color: var(--color-bg-main);
  margin: 100px 0;

  @media only screen and (max-width: 768px) {
    padding-left: 20px;
  }

  .content {
    width: 55%;
    h4 {
      max-width: 350px;
      margin-bottom: 39px;

      @media only screen and (max-width: 768px) {
        font-size: 24px;
        padding-top: 40px;
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
    right: 0;
    padding-left: 80px;

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

function Section1({ history }) {
  return (
    <Section1Wrapper className="flex align-center just-between">
      <div className="content">
        <h4>Strike Finance Money Markets</h4>
        <div className="flex align-center btn-wrapper">
          <div
            className="flex align-center just-center app-btn pointer"
            onClick={() => {
              window.open('https://app.strike.org', '_blank');
            }}
          >
            App
          </div>
          <div
            className="flex align-center just-center whitepaper-btn pointer"
            onClick={() => {
              window.open('/Whitepaper.pdf', '_blank');
            }}
          >
            WHITEPAPER
          </div>
        </div>
      </div>
      <div className="imgs">
        <img src={vector1} className="vector-image" alt="" />
        <img src={vector2} className="coin-image" alt="" />
      </div>
    </Section1Wrapper>
  );
}

Section1.propTypes = {
  history: PropTypes.object,
};

Section1.defaultProps = {
  history: {}
};

export default compose(withRouter)(Section1);
