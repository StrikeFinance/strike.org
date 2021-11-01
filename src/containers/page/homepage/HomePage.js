import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import WrapLayout from 'containers/Layout/WrapLayout/WrapLayout';
import React from 'react';
import Banner from './elements/banner/Banner';
import Governance from './elements/governance/Governance';
import Market from './elements/market/Market';

const HomePage = () => {
  return (
    <WrapLayout>
      <Banner />
      <Market />
      <Governance />
    </WrapLayout>
  );
};

export default compose(withRouter)(HomePage);
