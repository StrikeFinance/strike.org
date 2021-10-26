/* eslint-disable no-useless-escape */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'recompose';
import { withRouter, useLocation } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connectAccount, accountActionCreators } from 'core';
import { promisify } from 'utilities';
import MainLayout from 'containers/Layout/MainLayout';
import Section1 from 'components/Main/Home/Section1';
// import Section2 from 'components/Main/Home/Section2';
// import Section3 from 'components/Main/Home/Section3';
// import Section4 from 'components/Main/Home/Section4';

const HomeWrapper = styled.div`
  height: 100%;
`;

function Home({ history, getGovernanceStrike }) {
  const [markets, setMarkets] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1));
      if (elem) {
        window.scrollTo({
          top: elem.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [location]);

  const getMarkets = async () => {
    const res = await promisify(getGovernanceStrike, {});
    if (!res.status) {
      return;
    }
    setMarkets(res.data.markets);
  };

  useEffect(() => {
    getMarkets();
  }, []);

  return (
    <MainLayout>
      <HomeWrapper>
        <Section1 />
        {/* <Section2 markets={markets} /> */}
        {/* <Section3 markets={markets} /> */}
        {/* <Section4 /> */}
      </HomeWrapper>
    </MainLayout>
  );
}

Home.propTypes = {
  history: PropTypes.object,
  getGovernanceStrike: PropTypes.func.isRequired
};

Home.defaultProps = {
  history: {}
};

const mapDispatchToProps = dispatch => {
  const { getGovernanceStrike } = accountActionCreators;

  return bindActionCreators(
    {
      getGovernanceStrike
    },
    dispatch
  );
};

export default compose(
  withRouter,
  connectAccount(null, mapDispatchToProps)
)(Home);
