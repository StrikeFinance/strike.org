import React from 'react';
import { ToastContainer } from 'react-toastify';
import WrapLayout from 'containers/Layout/WrapLayout/WrapLayout';

import Sale from './Sale';
import 'react-toastify/dist/ReactToastify.css';

const SalePage = () => {
  return (
    <WrapLayout>
      <div className="main-container">
        <Sale sale />
        <Sale claim />
        <ToastContainer />
      </div>
    </WrapLayout>
  );
};
export default SalePage;
