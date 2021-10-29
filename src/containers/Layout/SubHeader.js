import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
// import { Input } from 'antd';
import arrowRightImg from 'assets/img/arrow-right.png';

const SubHeaderWrapper = styled.div`
  height: 50px;
  margin: 20px 15px 0;
  margin-top: 100px;
  padding: 40px 84px 20px;
  .title-wrapper {
    img {
      height: 16px;
      transform: rotate(180deg);
      margin-right: 18px;
    }
    p {
      font-size: 20px;
      font-weight: 900;
      color: var(--color-text-main);
    }
  }

  @media only screen and (max-width: 768px) {
    position: relative;
    .position-sub-header {
      position: absolute;
      left: 0;
    }
  }
`;

function SubHeader({ title, history }) {
  const handleRoute = () => {
    if (title === 'Overview' || title === 'Details') {
      history.go(-1);
    }
    if (title === 'Market') {
      history.push('/market');
    }
  };

  return (
    <SubHeaderWrapper className="flex align-center just-between">
      <div
        className="flex align-center pointer title-wrapper position-sub-header"
        onClick={handleRoute}
      >
        {(title === 'Overview' || title === 'Details' || title === 'Market') && (
          <img src={arrowRightImg} alt="arrow-left" />
        )}
        <p className={`${(title === 'Overview' || title === 'Details') ? 'highlight' : ''}`}>
          {title}
        </p>
      </div>
    </SubHeaderWrapper>
  );
}

SubHeader.propTypes = {
  title: PropTypes.string,
  history: PropTypes.object
};

SubHeader.defaultProps = {
  title: '',
  history: {}
};
export default compose(withRouter)(SubHeader);
