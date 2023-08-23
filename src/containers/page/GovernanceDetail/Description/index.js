import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { Divider } from 'antd';
import ReactMarkdown from 'react-markdown';
import ProposalHistory from './ProposalHistory/ProposalHistory.js';

function Description(props) {
  const { governanceInfo, description } = props;

  return (
    <div className="description-content flex just-between">
      <div className="description-content__left">
        <div className="header">
          <span>Operation</span>
          <div className="operationContent">
            {(governanceInfo.signatures || []).map((s, idx) => (
              <div key={idx}>{s}</div>
            ))}
          </div>
        </div>
        <Divider />
        <div className="main-content">
          <span className="title">Description</span>
          <ReactMarkdown>{description}</ReactMarkdown>

          {/* <div className="summary">
            <span className="summary__title">Overview</span>
            <div className="summary__content">
              <span></span>
            </div>
          </div> */}

          {/* {!visibile && isMobile ? (
            <div className="btn-showmore" onClick={handleClickShowMore}>
              Show More
            </div>
          ) : isMobile ? (
            <>
              <div className="purpose">
                <span className="purpose__title">Purpose</span>
                <div className="purpose__content">
                  <span>
                    Decentralized projects are living and breathing communities
                    with a variety of stakeholders. These stakeholders include
                    project team/contributors, token holders, users, partners,
                    and for certain projects, liquidity providers. The goal for
                    the SGP is to nurture Strike’s ecosystem to benefit all of
                    these stakeholders. To be more specific, the grants program
                    aims to: Grow Strike’s ecosystem by funding development
                    happening on top of it. Funding development focused on
                    helping Strike grow is critical to the project’s long-term
                    success. Fund ideas that benefit Strike that would otherwise
                    not receive funding. Many good ideas are left unexplored
                    because they fail to receive funding. We intend to make sure
                    as few good ideas as possible are underfunded or unfunded.
                    Strengthen goodwill by providing funding for community-led
                    ideas. Funding projects, ideas, and events brought forth by
                    community members will encourage more active participation
                    by the community. It will have the added benefit of
                    nourishing goodwill. A well-nourished goodwill keeps
                    community members loyal and happy, which in turn, encourages
                    new members to join what they see is a thriving community.
                  </span>
                </div>
              </div>

              <div className="program-scope">
                <span className="program-scope__title">Program Scope</span>
                <div className="program-scope__content">
                  <span>
                    The SGP was heavily inspired by the Uniswap Grants Program
                    (“UGP”), which received approval from the community to
                    deploy a maximum of $750k per quarter for two quarters. It’s
                    difficult to deploy a meaningful amount of money to
                    ecosystem grants without compromising on quality. While we
                    believe all of these ecosystems will be enormous in the
                    future, it’s important for us to be practical today by
                    matching the grants budget to the size of the ecosystem. To
                    that end, the pilot program will deploy a maximum of $1mm
                    per quarter and run for two quarters. We have no way of
                    knowing whether this amount of money is overshooting or
                    undershooting the needs of the ecosystem — we will only find
                    out after running the experiment. For example, if we find
                    out $2mm is not enough money to fund all of the high quality
                    opportunities, we as a community may decide we need to
                    create a larger allocation for grants. On the flipside, if
                    we find out $2mm is too much, all unspent funds will be
                    returned to the community treasury for use at a later time.
                    As part of the program, our intention is to fund projects,
                    ideas, and events that directly benefit Strike and its
                    stakeholders. While there may be opportunities to fund
                    projects, ideas, and events that indirectly benefit Strike,
                    these opportunities fall outside the scope of this program.
                    Not all opportunities applying for grants will benefit the
                    Strike ecosystem equally. To help us prioritize which ideas
                    to fund, we propose the following buckets:
                  </span>
                </div>
              </div>
              <div className="hight-priority">
                <span className="hight-priority__title">High priority</span>
                <div className="hight-priority__content">
                  <span>
                    Protocol and parameter development. Apart from acts of
                    stewardship and generosity, there is little to no incentive
                    for community members to propose technical updates to the
                    protocol. With no carrot with which to motivate community
                    members to propose changes, the protocol isn’t able to
                    innovate as quickly as it should be innovating in a dynamic
                    and competitive market. We should note that in a minority of
                    cases community members did receive payment for work done
                    (for example, see the work done by Strike in on the Strike
                    Governance Launch proposal), although here too, the
                    incentive to contribute was not well-designed since it
                    required Certik or Peckshield to front audit and development
                    costs before knowing the proposal to pay them would pass. To
                    encourage community members to propose changes, the SGP will
                    fully or partially pre-fund development and audit costs. In
                    doing so, we hope to encourage more proposals, which will
                    lead to more innovation and as a result, a far better Strike
                    for all of us. Code audits. Making technical updates to the
                    protocol is risky business: smart contracts are immutable
                    and control billions of dollars in user funds. An error in a
                    technical update can have serious consequences. Because of
                    this, it is considered best practice to have an auditor
                    review the proposed update for soundness prior to its
                    submission. Unfortunately, these audits are expensive ,
                    particularly for individual contributors who need to pay for
                    them out of pocket. We intend to provide grants that
                    pre-fund audit costs for soon-to-be proposals. We hope this
                    will encourage more individual contributors to propose
                    technical updates to the protocol. Business development /
                    integrations. A greater amount of liquidity makes Strike a
                    better product for all users. To grow liquidity, Strike
                    should be integrated with as many applications as possible.
                    To that end, we aim to fund integrations that grow usage of
                    Strike. In funding integrations, we will effectively be
                    funding the business development function for the protocol.
                    Advertising and sponsorships. It will be important to get
                    the word out there about this program. The more people there
                    are that know about the SGP, the more applications we should
                    expect to receive. To spread the word about the program, we
                    will spend funds to advertise the SGP on podcasts,
                    newsletters, and other mediums that attract the audience we
                    want to attract.
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="purpose">
                <span className="purpose__title">Purpose</span>
                <div className="purpose__content">
                  <span>
                    Decentralized projects are living and breathing communities
                    with a variety of stakeholders. These stakeholders include
                    project team/contributors, token holders, users, partners,
                    and for certain projects, liquidity providers. The goal for
                    the SGP is to nurture Strike’s ecosystem to benefit all of
                    these stakeholders. To be more specific, the grants program
                    aims to: Grow Strike’s ecosystem by funding development
                    happening on top of it. Funding development focused on
                    helping Strike grow is critical to the project’s long-term
                    success. Fund ideas that benefit Strike that would otherwise
                    not receive funding. Many good ideas are left unexplored
                    because they fail to receive funding. We intend to make sure
                    as few good ideas as possible are underfunded or unfunded.
                    Strengthen goodwill by providing funding for community-led
                    ideas. Funding projects, ideas, and events brought forth by
                    community members will encourage more active participation
                    by the community. It will have the added benefit of
                    nourishing goodwill. A well-nourished goodwill keeps
                    community members loyal and happy, which in turn, encourages
                    new members to join what they see is a thriving community.
                  </span>
                </div>
              </div>

              <div className="program-scope">
                <span className="program-scope__title">Program Scope</span>
                <div className="program-scope__content">
                  <span>
                    The SGP was heavily inspired by the Uniswap Grants Program
                    (“UGP”), which received approval from the community to
                    deploy a maximum of $750k per quarter for two quarters. It’s
                    difficult to deploy a meaningful amount of money to
                    ecosystem grants without compromising on quality. While we
                    believe all of these ecosystems will be enormous in the
                    future, it’s important for us to be practical today by
                    matching the grants budget to the size of the ecosystem. To
                    that end, the pilot program will deploy a maximum of $1mm
                    per quarter and run for two quarters. We have no way of
                    knowing whether this amount of money is overshooting or
                    undershooting the needs of the ecosystem — we will only find
                    out after running the experiment. For example, if we find
                    out $2mm is not enough money to fund all of the high quality
                    opportunities, we as a community may decide we need to
                    create a larger allocation for grants. On the flipside, if
                    we find out $2mm is too much, all unspent funds will be
                    returned to the community treasury for use at a later time.
                    As part of the program, our intention is to fund projects,
                    ideas, and events that directly benefit Strike and its
                    stakeholders. While there may be opportunities to fund
                    projects, ideas, and events that indirectly benefit Strike,
                    these opportunities fall outside the scope of this program.
                    Not all opportunities applying for grants will benefit the
                    Strike ecosystem equally. To help us prioritize which ideas
                    to fund, we propose the following buckets:
                  </span>
                </div>
              </div>
              <div className="hight-priority">
                <span className="hight-priority__title">High priority</span>
                <div className="hight-priority__content">
                  <span>
                    Protocol and parameter development. Apart from acts of
                    stewardship and generosity, there is little to no incentive
                    for community members to propose technical updates to the
                    protocol. With no carrot with which to motivate community
                    members to propose changes, the protocol isn’t able to
                    innovate as quickly as it should be innovating in a dynamic
                    and competitive market. We should note that in a minority of
                    cases community members did receive payment for work done
                    (for example, see the work done by Strike in on the Strike
                    Governance Launch proposal), although here too, the
                    incentive to contribute was not well-designed since it
                    required Certik or Peckshield to front audit and development
                    costs before knowing the proposal to pay them would pass. To
                    encourage community members to propose changes, the SGP will
                    fully or partially pre-fund development and audit costs. In
                    doing so, we hope to encourage more proposals, which will
                    lead to more innovation and as a result, a far better Strike
                    for all of us. Code audits. Making technical updates to the
                    protocol is risky business: smart contracts are immutable
                    and control billions of dollars in user funds. An error in a
                    technical update can have serious consequences. Because of
                    this, it is considered best practice to have an auditor
                    review the proposed update for soundness prior to its
                    submission. Unfortunately, these audits are expensive ,
                    particularly for individual contributors who need to pay for
                    them out of pocket. We intend to provide grants that
                    pre-fund audit costs for soon-to-be proposals. We hope this
                    will encourage more individual contributors to propose
                    technical updates to the protocol. Business development /
                    integrations. A greater amount of liquidity makes Strike a
                    better product for all users. To grow liquidity, Strike
                    should be integrated with as many applications as possible.
                    To that end, we aim to fund integrations that grow usage of
                    Strike. In funding integrations, we will effectively be
                    funding the business development function for the protocol.
                    Advertising and sponsorships. It will be important to get
                    the word out there about this program. The more people there
                    are that know about the SGP, the more applications we should
                    expect to receive. To spread the word about the program, we
                    will spend funds to advertise the SGP on podcasts,
                    newsletters, and other mediums that attract the audience we
                    want to attract.
                  </span>
                </div>
              </div>
            </>
          )}
          {visibile && isMobile ? (
            <div className="btn-showmore" onClick={handleClickShowLess}>
              Show Less
            </div>
          ) : null} */}
        </div>
      </div>
      <div className="description-content__right">
        <ProposalHistory governanceInfo={governanceInfo} />
      </div>
    </div>
  );
}

Description.propTypes = {
  governanceInfo: PropTypes.object,
  description: PropTypes.string
};

Description.defaultProps = {
  governanceInfo: null,
  description: ''
};

export default Description;
