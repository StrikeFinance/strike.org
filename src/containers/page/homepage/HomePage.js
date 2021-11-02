import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import WrapLayout from 'containers/Layout/WrapLayout/WrapLayout';
import React from 'react';
import Banner from './elements/banner/Banner';
import Governance from './elements/governance/Governance';
import Market from './elements/market/Market';
import Developers from './elements/developers/Developers';

const HomePage = () => {
  return (
    <WrapLayout>
      <div style={{ backgroundColor: '#eceff9' }}>
        <Banner />
        <div>
          <Market />
        </div>
        <div>
          <Governance />
        </div>
        <div>
          <Developers />
        </div>
      </div>
    </WrapLayout>
  );
};

export default compose(withRouter)(HomePage);
