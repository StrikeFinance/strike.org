import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const WrapLayout = ({ children }) => {
  useEffect(() => {}, []);
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
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
export default withTheme(WrapLayout);
