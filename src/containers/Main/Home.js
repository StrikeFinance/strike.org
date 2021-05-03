/* eslint-disable no-useless-escape */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connectAccount, accountActionCreators } from 'core';
import { promisify } from 'utilities';
import MainLayout from 'containers/Layout/MainLayout';
import Section1 from 'components/Main/Home/Section1';
import Section2 from 'components/Main/Home/Section2';
import Section3 from 'components/Main/Home/Section3';
import Section4 from 'components/Main/Home/Section4';

const HomeWrapper = styled.div`
  height: 100%;
`;

function Home({ history, getGovernanceStrike }) {
  const [markets, setMarkets] = useState([]);
  const earnRef = useRef(null);
  const developersRef = useRef(null);

  const content = document.documentElement || document.body;

  const getMarkets = async () => {
    const res = await promisify(getGovernanceStrike, {});
    if (!res.status) {
      return;
    }
    setMarkets(res.data.markets);
  };

  const moveToEarn = () => {
    content.scrollTo({
      top: earnRef.current.offsetTop - 100,
      behavior: 'smooth'
    });
  };

  const moveToDevelopers = () => {
    content.scrollTo({
      top: developersRef.current.offsetTop - 100,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    getMarkets();
  }, []);

  return (
    <MainLayout moveToEarn={moveToEarn} moveToDevelopers={moveToDevelopers}>
      <HomeWrapper>
        <Section1 />
        <Section2 markets={markets} refProp={earnRef} />
        <Section3 markets={markets} refProp={developersRef} />
        <Section4 />
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
