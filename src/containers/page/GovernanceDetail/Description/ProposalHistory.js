import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import { Steps, Icon, Divider } from 'antd';
import { Card } from 'components/Basic/Card';

const ProposalHistoryWrapper = styled.div`
  width: 100%;
  border-radius: 5px;

  .title {
    font-size: 20px;
    font-weight: 800;
    color: #000000;
    padding-top: 22px;
    @media screen and (max-width: 812px) {
      font-size: 16px;
    }
  }

  .history-steps-wrapper {
    width: 100%;
    margin-top: 28px;
    .ant-steps {
      .ant-steps-item-tail {
        display: none !important;
      }
      .ant-steps-item-container {
        display: flex;
        .ant-steps-item-title {
          font-size: 17px;
          font-weight: 900;
          line-height: unset;
          color: #000000;
          @media screen and (max-width: 812px) {
            font-size: 16px;
          }
        }
        .ant-steps-item-description {
          font-size: 14px;
          color: #9D9FA7;
          @media screen and (max-width: 812px) {
            font-size: 14px;
          }
        }
        .ant-steps-item-icon {
          width: 22px;
          height: 22px;
          background: var(--color-blue);
          .ant-steps-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            line-height: unset;
            font-size: 16px;
          }
        }
      }
      .ant-steps-item-process .ant-steps-item-icon {
        background: var(--color-text-inactive);
        border: none;
      }
      .ant-steps-item-wait .ant-steps-item-icon {
        background: var(--color-text-inactive);
        border: none;
      }
    }
  }
`;

const { Step } = Steps;

// Pending,
// Active,
// Canceled,
// Defeated,
// Succeeded,
// Queued,
// Expired,
// Executed

const STATUSES = ['Pending', 'Active', 'Succeeded', 'Queued', 'Executed'];

function ProposalHistory({ governanceInfo }) {
  const getStepNumber = () => {
    if (
      governanceInfo.state === 'Defeated' ||
      governanceInfo.state === 'Canceled'
    )
      return 2;
    return STATUSES.findIndex(s => s === governanceInfo.state) + 1;
  };
  return (
    <Card>
      <ProposalHistoryWrapper>
        <p className="title">Proposal history</p>
        <Divider />
        <div className="history-steps-wrapper">
          <Steps direction="vertical" current={getStepNumber()}>
            <Step
              title="Created"
              description={
                governanceInfo.createdTimestamp
                  ? moment(governanceInfo.createdTimestamp * 1000).format('LLL')
                  : ''
              }
              icon={
                <Icon
                  type="check"
                  style={{ fontSize: '10px', color: 'white' }}
                />
              }
              disabled
            />
            <Step
              title="Active"
              description={
                governanceInfo.startTimestamp
                  ? moment(governanceInfo.startTimestamp * 1000).format('LLL')
                  : ''
              }
              icon={
                <Icon
                  type="check"
                  style={{ fontSize: '10px', color: 'white' }}
                />
              }
              disabled
            />
            <Step
              title={
                governanceInfo.state === 'Canceled' ||
                governanceInfo.state === 'Defeated'
                  ? governanceInfo.state === 'Defeated'
                    ? 'Failed'
                    : 'Canceled'
                  : `${
                      governanceInfo.state === 'Succeeded'
                        ? 'Succeeded'
                        : 'Succeed'
                    }`
              }
              description={
                governanceInfo.endTimestamp
                  ? moment(governanceInfo.endTimestamp * 1000).format('LLL')
                  : ''
              }
              icon={
                <Icon
                  type="check"
                  style={{ fontSize: '10px', color: 'white' }}
                />
              }
              disabled
            />
            <Step
              title={`${
                governanceInfo.state === 'Queued' ? 'Queued' : 'Queue'
              }`}
              description={
                governanceInfo.queuedTimestamp
                  ? moment(governanceInfo.queuedTimestamp * 1000).format('LLL')
                  : ''
              }
              icon={
                <Icon
                  type="check"
                  style={{ fontSize: '10px', color: 'white' }}
                />
              }
              disabled
            />
            <Step
              title={
                governanceInfo.state === 'Expired'
                  ? governanceInfo.state
                  : `${
                      governanceInfo.state === 'Executed'
                        ? 'Executed'
                        : 'Execute'
                    }`
              }
              description={
                governanceInfo.executedTimestamp
                  ? moment(governanceInfo.executedTimestamp * 1000).format(
                      'LLL'
                    )
                  : ''
              }
              icon={
                <Icon
                  type="check"
                  style={{ fontSize: '10px', color: 'white' }}
                />
              }
              disabled
            />
          </Steps>
        </div>
      </ProposalHistoryWrapper>
    </Card>
  );
}

ProposalHistory.propTypes = {
  governanceInfo: PropTypes.object
};
ProposalHistory.defaultProps = {
  governanceInfo: {}
};
export default ProposalHistory;
