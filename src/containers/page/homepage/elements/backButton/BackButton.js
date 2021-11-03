import React from 'react';
import { useHistory } from 'react-router';
import arrowRightImg from 'assets/img/arrow-right.png';
import './BackButton.scss';

const BackButton = ({ title }) => {
  const history = useHistory();
  const handleRoute = () => {
    history.go(-1);
  };
  return (
    <div className="title-wrapper" onClick={handleRoute}>
      <div className="title-wrapper-child">
        <div>
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

export default BackButton;
