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
import LoadingSpinner from '../../components/Basic/LoadingSpinner';

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

function Home({ history, getGovernanceStrike, getDecimals, setSetting, getGovernance, getGovernanceStrikeWithParam }) {
  const [markets, setMarkets] = useState([]);
  const [section3Market, setSection3Market] = useState();
  const location = useLocation();
  const [isLoading, setisLoading] = useState(true);
  const [data, setdata] = useState();
  const [governance, setgovernance] = useState();

  useEffect(() => {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1));
      if (elem) {
        window.scrollTo({
          top: elem.offsetTop - 10,
          behavior: 'smooth'
        });
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [location]);

  const getMarkets = async () => {
    const res = await promisify(getGovernanceStrikeWithParam, { offset: 0, limit: 5 });
    if (!res.status) {
      return;
    }
    setisLoading(false);
    setSection3Market(res.data);
    setdata(() => res.data);
  };

  const getMarketsSection1 = async () => {
    const res = await promisify(getGovernanceStrike, {});
    if (!res.status) {
      return;
    }
    setMarkets(res.data.markets.filter(m => m.deprecated === false));
  };

  const getGovernanceFunc = async () => {
    const res = await promisify(getGovernance, { limit: 5, offset: 0 });
    if (!res.status) {
      return;
    }
    setgovernance(res.data.result);
  };
  useEffect(() => {
    getMarketsSection1();
    getMarkets();
    getGovernanceFunc();
  }, []);

  const getDecimal = async () => {
    const res = await promisify(getDecimals, {});
    if (!res.status) {
      return;
    }
    setSetting({ decimals: res.data.decimal });
    setisLoading(false);
  };

  useEffect(() => {
    getDecimal();
  }, []);

  const handleChangePage = (pageNumber, offset, limit) => {
    promisify(getGovernanceStrike, {
      offset,
      limit
    })
      .then(res => {
        setSection3Market(res.data);
      })
      .catch(() => { });
  };

  return (
    <MainLayout isHeader={false}>
      {data && governance && markets ? (
        <HomeWrapper>
          <Section1 markets={markets.filter(m => m.deprecated === false)} />
          <Section2 data={data} />
          <Section3 markets={section3Market} governance={governance} total={data.total} onChangePage={handleChangePage} setSetting={setSetting} />
          <Section4 />
        </HomeWrapper>
      ) : (
        <SpinnerWrapper>
          <LoadingSpinner />
        </SpinnerWrapper>
      )}
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
    getInterateModel,
    getGovernance,
    getGovernanceStrikeWithParam
  } = accountActionCreators;

  return bindActionCreators(
    {
      getGovernanceStrike,
      getInterateModel,
      getDecimals,
      getGovernance,
      getGovernanceStrikeWithParam
    },
    dispatch
  );
};

export default compose(
  withRouter,
  connectAccount(null, mapDispatchToProps)
)(Home);
