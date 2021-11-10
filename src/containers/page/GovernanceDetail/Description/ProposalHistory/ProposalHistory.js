import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import { Steps, Icon, Divider } from 'antd';
import { Card } from 'components/Basic/Card';
import './styles.scss';
import completeIcon from 'assets/img/governance-detail/complete-icon.png';

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
      <div className="proposal-history-content">
        <p className="title">Proposal history</p>
        <Divider />
        <div className="history-steps-wrapper">
          <Steps direction="vertical" current={getStepNumber()}>
            <Step
              title="Created"
              current={1}
              description={
                governanceInfo.createdTimestamp
                  ? moment(governanceInfo.createdTimestamp * 1000).format('LLL')
                  : ''
              }
              icon={completeIcon}
              disabled
            />
            <Step
              title="Active"
              description={
                governanceInfo.startTimestamp
                  ? moment(governanceInfo.startTimestamp * 1000).format('LLL')
                  : ''
              }
              icon={completeIcon}
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
              icon={completeIcon}
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
              icon={completeIcon}
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
              icon={completeIcon}
              disabled
            />
          </Steps>
        </div>
      </div>
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
