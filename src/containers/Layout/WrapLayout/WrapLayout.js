import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const WrapLayout = ({ children, showMenu }) => {
  useEffect(() => {}, []);
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header showMenuHead={showMenu} />
      <div>{children}</div>
      <Footer />
    </div>
  );
};
WrapLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  showMenu: PropTypes.bool
};

WrapLayout.defaultProps = {
  children: null,
  showMenu: true
};
export default withTheme(WrapLayout);
