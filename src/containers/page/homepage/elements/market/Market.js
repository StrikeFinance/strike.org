import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import Borrow from './borrow/Borrow';
import MarketsAvailable from './markets-available/MarketsAvailable';
import TotalSupply from './total-supply/TotalSupply';
import './Market.scss';

const Market = () => {
  return (
    <div className="market-homepage" id="earn">
      <TotalSupply />
      <Borrow />
      <MarketsAvailable />
    </div>
  );
};

export default compose(withRouter)(Market);
