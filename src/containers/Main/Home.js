/* eslint-disable no-useless-escape */
import Section1 from 'components/Main/Home/Section1';
import Section2 from 'components/Main/Home/Section2';
import Section3 from 'components/Main/Home/Section3';
import Section4 from 'components/Main/Home/Section4';
import MainLayout from 'containers/Layout/MainLayout';
import { accountActionCreators, connectAccount } from 'core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { promisify } from 'utilities';
import arrow_down from '../../assets/img/arrow_down.svg';
import mouse from '../../assets/img/mouse.svg';
import LoadingSpinner from '../../components/Basic/LoadingSpinner';
import Section5 from '../../components/Main/Home/Section5';
import Section6 from '../../components/Main/Home/Section6';

const HomeWrapper = styled.div`
  height: 100%;
  .blink {
    text-align: center;
    animation: blink-animation 1s steps(5, start) infinite;
    -webkit-animation: blink-animation 1s steps(5, start) infinite;
  }
  @keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }
  @-webkit-keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }
`;

const SpinnerWrapper = styled.div`
  height: 85vh;
  width: 100%;

  @media only screen and (max-width: 1440px) {
    height: 70vh;
  }
`;

function Home({ history, getGovernanceStrike, getDecimals, setSetting }) {
  const [markets, setMarkets] = useState([]);
  const location = useLocation();
  const [isLoading, setisLoading] = useState(true);

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

  const getDecimal = async () => {
    const res = await promisify(getDecimals, {});
    if (!res.status) {
      return;
    }
    setisLoading(false);
    setSetting({ decimals: res.data.decimal });
  };

  useEffect(() => {
    getDecimal();
  }, []);

  return (
    <MainLayout>
      <HomeWrapper>
        <Section1 />
        <div className="blink">
          <img src={mouse} alt="scroll" />
        </div>
        <div className="blink">
          <img src={arrow_down} alt="scroll" />
        </div>
        <Section2 markets={markets} />
        <Section5 markets={markets} />
        <Section6 />
        <Section3 markets={markets} />
        <Section4 />
      </HomeWrapper>
    </MainLayout>
  );
}

Home.propTypes = {
  history: PropTypes.object,
  getGovernanceStrike: PropTypes.func.isRequired,
  getDecimals: PropTypes.func.isRequired,
  setSetting: PropTypes.func.isRequired
};

Home.defaultProps = {
  history: {}
};

const mapDispatchToProps = dispatch => {
  const {
    getGovernanceStrike,
    getDecimals,
    getInterateModel
  } = accountActionCreators;

  return bindActionCreators(
    {
      getGovernanceStrike,
      getInterateModel,
      getDecimals
    },
    dispatch
  );
};

export default compose(
  withRouter,
  connectAccount(null, mapDispatchToProps)
)(Home);
