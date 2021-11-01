import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';

const WrapLayout = ({ children }) => {
  useEffect(() => {}, []);
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
};
WrapLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

WrapLayout.defaultProps = {
  children: null
};
export default WrapLayout;
