import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Pagination } from 'antd';
import { useWindowResizeMobile } from 'utilities/hook';
import { promisify } from 'utilities/promisify';
import { accountActionCreators } from 'core/modules/account/actions';
import { connectAccount } from 'core/modules/account/connectAccount';
import completed from 'assets/img/homepage/success.svg';
import cancel from 'assets/img/landingpage/cancel.png';
import './Governance.scss';

const Governance = ({ getGovernance }) => {
  const getStatus = p => {
    if (p.state === 'Executed') {
      return 'Passed';
    }
    if (p.state === 'Active') {
      return 'Active';
    }
    if (p.state === 'Defeated') {
      return 'Failed';
    }
    return p.state;
  };
  const [isMobile] = useWindowResizeMobile(768);
  const [governance, setGovernance] = useState([]);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);

  const getGovernanceData = async ({ offset, limit }) => {
    const res = await promisify(getGovernance, { offset, limit });
    // console.log(res?.data);
    setGovernance(res?.data?.result);
    setTotal(res?.data?.total);
  };

  const onChangePage = value => {
    setCurrent(value);
    getGovernanceData({ offset: (value - 1) * 5, limit: 5 });
  };

  useEffect(() => {
    getGovernanceData({ offset: 0, limit: 5 });
  }, []);
  return (
    <div className="governance" id="gorvernance">
      <div className="governance-wrapper">
        <div className="slider-animation">
          <div className="slider">
            <span className="slider-text">
              <FormattedMessage id="GOVERNANCE" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="GOVERNANCE" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="GOVERNANCE" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="GOVERNANCE" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="GOVERNANCE" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="GOVERNANCE" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="GOVERNANCE" />
            </span>
          </div>
          <div className="slider">
            <span className="slider-text">
              <FormattedMessage id="GOVERNANCE" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="GOVERNANCE" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="GOVERNANCE" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="GOVERNANCE" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="GOVERNANCE" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="GOVERNANCE" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="GOVERNANCE" />
            </span>
          </div>
        </div>
        <div className="governance-content">
          <div className="desc">
            <FormattedMessage id="Section_4_desc" />
          </div>
          <div className="recent-proposals">
            <div className="recent-proposals-inner">
              <div className="title-proposals">
                <FormattedMessage id="Governance_Proposals" />
              </div>

              {governance.map((item, index) => (
                <div className="recent-list" key={index}>
                  <div
                    onClick={() =>
                      window.open(
                        `https://app.strike.org/vote/proposal/${item.id}`,
                        '_blank'
                      )
                    }
                    className="recent-item flex just-between"
                  >
                    <div>
                      <div className="description">
                        {item?.description.replace('# ', '').split('\n')[0] ||
                          item?.description.replace('# ', '').split('\n')[1]}
                      </div>
                      {isMobile ? (
                        <div className="">
                          <div className="mx-auto time">
                            {moment(item?.createdAt).format('MMMM Do, YYYY')}
                          </div>
                          <div
                            className={`mx-auto ${
                              getStatus(item) === 'Failed' ? 'failed' : 'status'
                            }`}
                          >
                            {getStatus(item) && (
                              <FormattedMessage id={getStatus(item)} />
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="flex">
                          <div
                            className={`${
                              isMobile
                                ? `mx-auto ${
                                    getStatus(item) === 'Failed'
                                      ? 'failed'
                                      : 'status'
                                  }`
                                : `mr-1 mx-auto ${
                                    getStatus(item) === 'Failed'
                                      ? 'failed'
                                      : 'status'
                                  }`
                            }`}
                          >
                            {getStatus(item) && (
                              <FormattedMessage id={getStatus(item)} />
                            )}
                          </div>
                          <div className="mx-auto time">
                            {moment(item?.createdAt).format('MMMM Do, YYYY')}
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      className={`${isMobile ? 'flex mt-1' : 'flex mx-auto'}`}
                    >
                      <div className="mr-1">
                        <img
                          alt="status"
                          src={`${
                            getStatus(item) === 'Failed' ? cancel : completed
                          }`}
                        />
                      </div>
                      <div
                        className={`${isMobile ? 'state' : 'mx-auto state'}`}
                      >
                        {item.state && <FormattedMessage id={item.state} />}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pagination">
                <Pagination
                  onChange={onChangePage}
                  total={total}
                  pageSize={5}
                  current={current}
                  size={isMobile ? 'small' : 'default'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
Governance.propTypes = {
  getGovernance: PropTypes.func.isRequired
};

Governance.defaultProps = {};
export default compose(
  withRouter,
  connectAccount(null, mapDispatchToProps)
)(Governance);
