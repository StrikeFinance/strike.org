import React, { useEffect, useState, useCallback } from 'react';
import './styles.scss';
import backicon from 'assets/img/governance-detail/back-icon.svg';
import launchicon from 'assets/img/governance-detail/launch.svg';
import { useWindowResizeMobile } from 'utilities/hook';
import { Divider, Drawer } from 'antd';
import TableDetail from './Table';
import Description from './Description';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { accountActionCreators, connectAccount } from 'core';
import { promisify } from 'utilities';
import moment from 'moment';
import BigNumber from 'bignumber.js';
import commaNumber from 'comma-number';
import WrapLayout from 'containers/Layout/WrapLayout/WrapLayout';
import BackButton from 'containers/page/homepage/elements/backButton/BackButton';

function Governance(props) {
  const { history, match, getProposalById, getVoters } = props;
  const [governanceInfo, setGovernanceInfo] = useState({});
  const [id, setId] = useState(match.params.id);
  const [data, setData] = useState([]);
  const [description, setDescription] = useState('');
  const [dataAgainst, setDataAgainst] = useState([]);
  const [isMobile] = useWindowResizeMobile(813);
  const [visible, setVisible] = useState(false);
  const format = commaNumber.bindWith(',', '.');

  const getStatus = p => {
    if (p.state === 'Executed') {
      return 'passed';
    }
    if (p.state === 'Active') {
      return 'active';
    }
    if (p.state === 'Defeated') {
      return 'failed';
    }
    return p.state;
  };

  useEffect(() => {
    window.scrollTo({
      top: 0
    });
  }, []);

  const handleBack = () => {
    history.go(-1);
  };

  useEffect(() => {
    if (match.params && match.params.id) {
      setId(match.params.id);
    }
  }, [match]);

  const getDataProposalById = useCallback(async () => {
    if (id) {
      await promisify(getProposalById, { id: id })
        .then(res => {
          setGovernanceInfo(res.data || {});
          setDescription(res.data.description);
        })
        .catch(e => console.log(e));
    }
  }, [id, getProposalById]);

  const getDataProPosal = useCallback(async () => {
    let bodyFor = {
      id: id,
      limit: 5,
      filter: 'for'
    };
    let bodyAgainst = {
      id: id,
      limit: 5,
      filter: 'against'
    };
    await promisify(getVoters, bodyFor)
      .then(res => {
        setData(res.data);
      })
      .catch(() => {
        setData([]);
      });

    await promisify(getVoters, bodyAgainst)
      .then(res => {
        setDataAgainst(res.data);
      })
      .catch(() => {
        setData([]);
      });
  }, [getVoters]);

  const loadMore = type => {
    if (type === 'for' && data?.total) {
      promisify(getVoters, {
        id: governanceInfo.id,
        limit: data?.total,
        filter: 'for'
      })
        .then(res => {
          setData(res.data || {});
        })
        .catch(e => console.log(e));
    } else if (dataAgainst?.total) {
      promisify(getVoters, {
        id: governanceInfo.id,
        limit: dataAgainst?.total,
        filter: 'against'
      })
        .then(res => {
          setDataAgainst(res.data);
        })
        .catch(e => console.log(e));
    }
  };

  useEffect(() => {
    getDataProposalById();
    getDataProPosal();
  }, []);

  return (
    <WrapLayout showMenu={false}>
      <BackButton title="Governance" />
      <div style={{ background: '#eceff9' }}>
        <div className="governance-detail">
          {/* Main content */}
          <div className="governance-detail-main ">
            <div className="text-info flex just-between">
              <div className="text-info__left">
                <span className="info-content">
                  {description.replace('# ', '').split('\n')[0]}
                </span>
                <div className="date-completed">
                  <span className={`${getStatus(governanceInfo)}`}>
                    {getStatus(governanceInfo)}
                  </span>

                  <span className="date">
                    {governanceInfo.id} - {governanceInfo.state}{' '}
                    {moment(governanceInfo.createdAt).format('MMMM Do, YYYY')}
                  </span>
                </div>
              </div>
              <div className="text-info__right">
                <div
                  className="hexcode"
                  onClick={() =>
                    window.open(
                      `https://etherscan.io/address/${governanceInfo.proposer}`
                    )
                  }
                >
                  <span>
                    {governanceInfo.proposer
                      ? `${governanceInfo.proposer.substr(
                          0,
                          5
                        )}...${governanceInfo.proposer.substr(-4, 4)}`
                      : ''}
                  </span>
                  <img src={launchicon} />
                </div>
              </div>
            </div>
          </div>
          {/* End main content */}
          <TableDetail
            onViewAllFor={() => loadMore('for')}
            onViewAllAgainst={() => loadMore('against')}
            forVotes={
              isNaN(BigNumber(parseInt(data.sumVotes))) ? '0' : data.sumVotes
            }
            againstVote={
              isNaN(BigNumber(parseInt(dataAgainst.sumVotes)))
                ? '0'
                : dataAgainst.sumVotes
            }
            addressNumber={isNaN(BigNumber(data?.total)) ? 0 : data?.total}
            emptyNumber={4 - (isNaN(BigNumber(data?.total)) ? 0 : data?.total)}
            emptyAgainstNumber={
              4 -
              (isNaN(BigNumber(dataAgainst?.total)) ? 0 : dataAgainst?.total)
            }
            againstAddressNumber={
              isNaN(BigNumber(dataAgainst?.total)) ? 0 : dataAgainst?.total
            }
            listDataAgainst={
              dataAgainst?.mapStateToProps &&
              data?.result.map(v => ({
                labael: v.address,
                valuev: v.votes
              }))
            }
            list={
              data?.result &&
              data?.result.map(v => ({
                label: v.address,
                value: v.votes
              }))
            }
          />
          {}
          <Description
            governanceInfo={governanceInfo}
            description={description}
          />
        </div>
      </div>
    </WrapLayout>
  );
}

const mapStateToProps = ({ account }) => ({
  settings: account.setting
});

const mapDispatchToProps = dispatch => {
  const { getProposalById, getVoters } = accountActionCreators;

  return bindActionCreators(
    {
      getProposalById,
      getVoters
    },
    dispatch
  );
};

export default compose(
  withRouter,
  connectAccount(mapStateToProps, mapDispatchToProps)
)(Governance);
