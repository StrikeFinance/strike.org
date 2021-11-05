import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Governance.scss';
import completed from 'assets/img/homepage/success.svg';
import cancel from 'assets/img/landingpage/cancel.png';
import { Col, Row } from 'antd';
import ArrowCrossFillImg from 'assets/img/homepage/arrow-cross-fill.svg';
import ArrowCrossBlackOpacity from 'assets/img/homepage/arrow-cross-black-opacity.png';
import ArrowCrossBlack from 'assets/img/homepage/arrow-cross-black.png';
import ArrowCrossAboveOpacity from 'assets/img/homepage/arrow-cross-above-opacity.png';
import ArrowBlackDownOpacity from 'assets/img/homepage/arrow-black-down-opacity.png';
import { useWindowResizeMobile } from 'utilities/hook';
import { promisify } from 'utilities/promisify';
import MarketsAvailable from 'containers/page/homepage/elements/market/markets-available/MarketsAvailable';
import { accountActionCreators } from 'core/modules/account/actions';
import { connectAccount } from 'core/modules/account/connectAccount';

const Governance = ({ getGovernance, history }) => {
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
  const [isMobile] = useWindowResizeMobile(767);
  const [governance, setGovernance] = useState([]);

  const getGovernanceData = async () => {
    const res = await promisify(getGovernance, { limit: 5, offset: 0 });
    // console.log(res?.data);
    setGovernance(res?.data?.result);
  };
  useEffect(() => {
    getGovernanceData();
  }, []);
  return (
    <div className="governance" id="gorvernance">
      <div className="governance-wrapper">
        <div className="markets-available-content">
          <MarketsAvailable />
        </div>
        <div className="governance-content">
          <Row className="docs" gutter={isMobile ? [40, 40] : [100, 40]}>
            <Col
              xs={24}
              sm={24}
              md={10}
              lg={10}
              xl={10}
              className="content-left"
            >
              <div className="title">Governance</div>
              <div className="desc">
                Strike is managed by a decentralized community of Strike
                token-holders and their delegates, who propose and vote on
                upgrades to the protocol.
              </div>
              <div className="arrow-cross-above-opacity">
                <img
                  src={ArrowCrossAboveOpacity}
                  alt="arrow-cross-above-opacity"
                />
              </div>
              <div className="arrow-black-down-opacity">
                <img
                  src={ArrowBlackDownOpacity}
                  alt="arrow-black-down-opacity"
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={14} lg={14} xl={14}>
              <div className="recent-proposals">
                <div className="title-proposals">Recent Proposals</div>
                <div className="recent-list">
                  {governance.map((item, index) => (
                    <div
                      onClick={() =>
                        history.push(`/governance-detail/${item.id}`)
                      }
                      className="recent-item flex just-between"
                      key={index}
                    >
                      <div className="">
                        <div className="description">
                          {item?.description.split('\n')[0]}
                        </div>
                        {isMobile ? (
                          <div className="">
                            <div className="mx-auto time">
                              {moment(item?.createdAt).format('MMMM Do, YYYY')}
                            </div>
                            <div className={`mx-auto ${getStatus(item) === 'Failed' ? 'failed' : 'status'}`}>
                              {getStatus(item)}
                            </div>
                          </div>
                        ) : (
                          <div className="flex">
                            <div
                              className={`${
                                isMobile
                                  ? `mx-auto ${getStatus(item) === 'Failed' ? 'failed' : 'status'}`
                                  : `mr-1 mx-auto ${getStatus(item) === 'Failed' ? 'failed' : 'status'}`
                              }`}
                            >
                              {getStatus(item)}
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
                            src={`${getStatus(item) === 'Failed' ? cancel : completed}`}
                          />
                        </div>
                        <div
                          className={`${isMobile ? 'state' : 'mx-auto state'}`}
                        >
                          {item.state}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="arrow-cross">
                  <img src={ArrowCrossFillImg} alt="arrow-cross" />
                </div>
                <div className="arrow-cross-black-opacity">
                  <img
                    src={ArrowCrossBlackOpacity}
                    alt="arrow-cross-black-opacity"
                  />
                </div>
                <div className="arrow-cross-black">
                  <img alt="arrow-cross-black" src={ArrowCrossBlack} />
                </div>
              </div>
            </Col>
          </Row>
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
