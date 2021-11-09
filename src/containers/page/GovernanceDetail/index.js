import React, { useEffect, useState, useCallback } from 'react';
import './styles.scss';
import backicon from 'assets/img/governance-detail/back-icon.svg';
import launchicon from 'assets/img/governance-detail/launch.svg';
import Footer from '../../Layout/Footer/Footer';

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
import Web3 from 'web3';
import logo from 'assets/img/governance-detail/logo-strike.png';
import MenuTabImg from 'assets/img/homepage/menu-tab.svg';
import CloseMenuImg from 'assets/img/homepage/close-menu.svg';
import { NavHashLink as NavLink } from 'react-router-hash-link';

const HomePageLink = [
  {
    to: '/#',
    title: 'Home',
    altTitle: ''
  },
  {
    to: '/#market',
    title: 'Market',
    altTitle: ''
  },
  {
    to: '/#gorvernance',
    title: 'Governance',
    altTitle: ''
  },
  {
    to: '/#developer',
    title: 'Developers',
    altTitle: ''
  }
];

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
        console.log('res data against', res);
        setDataAgainst(res.data);
      })
      .catch(() => {
        setData([]);
      });
  }, [getVoters]);

  useEffect(() => {
    getDataProposalById();
    getDataProPosal();
  }, []);

  return (
    <div style={{ background: '#eceff9' }}>
      <div className="governance-detail">
        <div className="governance-detail-header flex just-between">
          <img src={logo} />
          {isMobile ? (
            <div className="header-mobile">
              {visible ? (
                <div
                  className="menu-icon cursor-pointer"
                  onClick={() => setVisible(false)}
                >
                  <img src={CloseMenuImg} alt="menu-tab" />
                </div>
              ) : (
                <div
                  className="menu-icon cursor-pointer"
                  onClick={() => setVisible(true)}
                >
                  <img src={MenuTabImg} alt="menu-tab" />
                </div>
              )}
              <Drawer
                height="50%"
                title=""
                placement="left"
                closable={false}
                onClose={() => setVisible(false)}
                visible={visible}
                key="left"
                className="drawer-menu-mobile"
              >
                <div>
                  <div className="nav-link-mobile">
                    {HomePageLink.map((link, index) => (
                      <div className="drawer-body-item" key={index}>
                        <NavLink
                          key={index}
                          className="link-item"
                          to={link?.to}
                          exact
                          onClick={() => setVisible(false)}
                        >
                          {link?.title}
                        </NavLink>
                      </div>
                    ))}
                  </div>
                  <div className="nav-btn-mobile">
                    <div
                      onClick={() =>
                        window.open(
                          'https://strike.org/Whitepaper.pdf',
                          '_blank'
                        )
                      }
                      className="whitepaper-btn"
                    >
                      Whitepaper
                    </div>
                    <div
                      onClick={() =>
                        window.open('https://app.strike.org/', '_blank')
                      }
                      className="launch-app-btn"
                    >
                      Launch App
                    </div>
                  </div>
                </div>
              </Drawer>
            </div>
          ) : (
            <button
              className="button-app"
              onClick={() => window.open('https://app.strike.org/', '_blank')}
            >
              Launch App
            </button>
          )}
        </div>
        <div className="back-governance">
          <img
            onClick={handleBack}
            src={backicon}
            style={{ cursor: 'pointer' }}
          />
          <span>Governance</span>
        </div>
        <Divider />
        {/* Main content */}
        <div className="governance-detail-main ">
          <div className="text-info flex just-between">
            <div className="text-info__left">
              <span className="info-content">{description.split('\n')[0]}</span>
              <div className="date-completed">
                {governanceInfo.state === 'Executed' ? (
                  <span className="passed">passed</span>
                ) : governanceInfo.state === 'Defeated' ? (
                  <span className="defeated">failed</span>
                ) : governanceInfo.state === 'Active' ? (
                  <span className="active">active</span>
                ) : null}

                <span className="date">
                  {governanceInfo.id} - {governanceInfo.state}{' '}
                  {moment(governanceInfo.createdAt).format('MMMM Do, YYYY')}
                </span>
              </div>
            </div>
            <div className="text-info__right">
              <div className="hexcode" onClick={() => window.open(`https://etherscan.io/address/${governanceInfo.proposer}`)}>
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
            4 - (isNaN(BigNumber(dataAgainst?.total)) ? 0 : dataAgainst?.total)
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
        <Description governanceInfo={governanceInfo} />
      </div>
      <Footer />
    </div>
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
