import React from 'react';
import './styles.scss';
import { Icon, Progress, Pagination, Divider, Typography } from 'antd';

function Mobile(props) {
  const { data, address } = props;
  const handleLink = () => {
    window.open(
      `${process.env.REACT_APP_ETH_EXPLORER}/address/${address}`,
      '_blank'
    );
  };
  return (
    <div className="transaction-mobile">
      <div className="children-content">
        <Typography className="children-content__title">
          Transactions
        </Typography>
        <Divider />

        {data &&
          data.map((item, index) => {
            return (
              <div className="children-content__info">
                <div className="action">
                  <Typography className="action__title">Action</Typography>
                  <Typography className="action__info">
                    {item.action}
                  </Typography>
                </div>

                <div className="age">
                  <Typography className="age__title">Age</Typography>
                  <div className="date-arrow">
                    {item.isReceived ? (
                      <Icon type="arrow-up" className="green-color" />
                    ) : (
                      <Icon type="arrow-down" className="red-color" />
                    )}
                    <Typography className="date">{item.age}</Typography>
                  </div>
                </div>
                <div className="result">
                  <Typography className="result__title">Result</Typography>
                  <Typography className="result__info">
                    {item.result}
                  </Typography>
                </div>
                <Divider />
              </div>
            );
          })}
        <div className="view-more" onClick={() => handleLink()}>
          VIEW MORE
        </div>
      </div>
    </div>
  );
}

export default Mobile;
