import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

const Section4Wrapper = styled.div`
  width: 100%;
  padding-left: 84px;
  background-color: var(--color-bg-main);
  padding: 119px 0 164px 0;

  @media only screen and (max-width: 768px) {
    padding: 50px;
  }

  p {
    font-size: 22px;
    font-weight: 900;
    color: #277ee6;

    @media only screen and (max-width: 768px) {
      font-size: 16px;
    }
  }

  h4 {
    max-width: 570px;
    margin-top: 19px;
    margin-bottom: 60px;

    @media only screen and (max-width: 768px) {
      font-size: 20px;
      margin-bottom: 20px;
    }
  }

  .get-stated-today {
    padding: 64px 175px 65px 177px;
    border-radius: 5px;
    box-shadow: 0px 13px 32px 0 rgba(6, 12, 63, 0.1);
    background-color: #ffffff;

    @media only screen and (max-width: 768px) {
      padding: 64px 70px;
    }

    .read-docs-btn {
      width: 150px;
      height: 32px;
      border-radius: 5px;
      box-shadow: 0px 4px 13px 0 rgba(39, 126, 230, 0.64);
      background-color: #277ee6;
      font-size: 13.5px;
      font-weight: 500;
      color: #ffffff;
      margin-top: 44px;

      &:hover {
        background-color: #477ee6;
        color: #ffffff;
      }
    }
  }
`;

function Section4({ history }) {
  return (
    <Section4Wrapper className="flex flex-column align-center just-center">
      <p>Developers Unite</p>
      <h4 className="center">Build your next application powered by Strike</h4>
      <div className="flex flex-column align-center just-center get-stated-today">
        <p>Get started today</p>
        <div
          className="flex align-center just-center read-docs-btn pointer"
          onClick={() => {
            window.open('https://docs.strike.org', '_blank');
          }}
        >
          Read Docs
        </div>
      </div>
    </Section4Wrapper>
  );
}

Section4.propTypes = {
  history: PropTypes.object,
};

Section4.defaultProps = {
  history: {}
};

export default compose(
  withRouter,
)(Section4);
