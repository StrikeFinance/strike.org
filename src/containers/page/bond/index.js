import React from 'react';
import WrapLayout from 'containers/Layout/WrapLayout/WrapLayout';
import './index.scss';

const BondPage = () => {
  return (
    <WrapLayout>
      <div className="wrap-terms-container">
        <iframe
          title="apebond"
          src="https://ape.bond/iframe-buy-bond?config=%7B%22bondAddress%22%3A%220x5fa4A0df090f6728Bd61EbCB821bDf533B0ecd1F%22%2C%22chain%22%3A%221%22%2C%22referenceId%22%3A%22strike%22%2C%22styles%22%3A%7B%22primary%22%3A%22%23107def%22%2C%22background%22%3A%22%23191919%22%2C%22background2%22%3A%22%23141414%22%2C%22background3%22%3A%22%230E0E0E%22%2C%22background4%22%3A%22%23000000%22%2C%22borderRadius%22%3A%220px%22%7D%7D"
          className="apeframe"
        />
      </div>
    </WrapLayout>
  );
};

export default BondPage;
