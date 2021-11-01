import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import './Governance.scss';

const Governance = () => {
  return (
    <div className="governance" id="gorvernance">
      <div>Governance</div>
    </div>
  );
};

export default compose(withRouter)(Governance);
