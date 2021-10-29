/* eslint-disable no-useless-escape */
import Section1 from 'components/Main/Home/Section1';
import Section2 from 'components/Main/Home/Section2';
import Section3 from 'components/Main/Home/Section3';
import Section4 from 'components/Main/Home/Section4';
import MainLayout from 'containers/Layout/MainLayout';
import { accountActionCreators, connectAccount, getGovernance } from 'core';
import { off } from 'npm';
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

function Home({
  history,
  getGovernanceStrike,
  getDecimals,
  setSetting,
  getGovernance
}) {
  const [markets, setMarkets] = useState([]);
  const location = useLocation();
  const [isLoading, setisLoading] = useState(true);
  const [data, setdata] = useState();
  const [governance, setgovernance] = useState([]);
  const [current, setCurrent] = useState(1);
  const [currentGor, setCurrentGor] = useState(1);
  const [updateListData, setUpdateListData] = useState(false);

  // const handleUpdateListData = () => {
  //   setUpdateListData(prevUpdateListData => !prevUpdateListData);
  // };

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
    const res = await promisify(getGovernanceStrike, {
      offset: 0,
      limit: 4
    });
    if (!res.status) {
      return;
    }
    setisLoading(false);
    setdata(() => res.data);
    setMarkets(res.data.markets);
  };

  const handleChangePageStrike = (pageNumber, offset, limit) => {
    setCurrent(pageNumber);
    setisLoading(true);
    promisify(getGovernanceStrike, {
      offset,
      limit
    })
      .then(res => {
        setdata(res.data);
        setMarkets(res.data.markets);
        setisLoading(false);
        // handleUpdateListData();
      })
      .catch(() => {
        setisLoading(false);
      });
  };

  const handleChangePageStrikeGor = (pageNumber, offset, limit) => {
    setCurrentGor(pageNumber);
    setisLoading(true);
    promisify(getGovernance, { limit, offset })
      .then(res => {
        setgovernance(res.data.result);
        setisLoading(false);
      })
      .catch(() => {
        setisLoading(false);
      });
  };

  const getGovernanceFunc = async () => {
    const res = await promisify(getGovernance, { limit: 5, offset: 0 });
    if (!res.status) {
      return;
    }
    setgovernance(res.data.result);
  };

  useEffect(() => {
    getGovernanceFunc();
  }, []);

  useEffect(() => {
    getMarkets();
  }, [updateListData]);

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
      {data ? (
        <HomeWrapper>
          <Section1 markets={markets} />
          <Section2 data={data} />
          <Section3
            markets={markets}
            governance={governance}
            handleChangePageStrike={handleChangePageStrike}
            total={data.total || 0}
            isLoading={isLoading}
          />
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
    getGovernance
  } = accountActionCreators;

  return bindActionCreators(
    {
      getGovernanceStrike,
      getInterateModel,
      getDecimals,
      getGovernance
    },
    dispatch
  );
};

export default compose(
  withRouter,
  connectAccount(null, mapDispatchToProps)
)(Home);
