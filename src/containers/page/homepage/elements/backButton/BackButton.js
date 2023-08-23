import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import arrowRightImg from 'assets/img/arrow-right.png';
import './BackButton.scss';

const BackButton = ({ title }) => {
  const history = useHistory();
  const handleRoute = () => {
    history.go(-1);
  };
  return (
    <div className="title-wrapper">
      <div className="title-wrapper-child">
        <div onClick={handleRoute}>
          <img src={arrowRightImg} alt="arrow-left" />
        </div>
        <div>
          <p
            className={`${
              title === 'Overview' || title === 'Details' ? 'highlight' : ''
            }`}
          >
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

BackButton.propTypes = {
  title: PropTypes.string
};

BackButton.defaultProps = {
  title: ''
};

export default BackButton;
