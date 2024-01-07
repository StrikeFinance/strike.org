/* eslint-disable no-useless-escape */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connectAccount, accountActionCreators } from 'core';
import { promisify } from 'utilities';
import MainLayout from 'containers/Layout/MainLayout';

const TermsWrapper = styled.div`
  padding: 150px 150px 50px;
  color: var(--color-text-main);
  font-size: 16px;

  @media (max-width: 768px) {
    padding: 100px 35px 35px;
  }

  .terms-title {
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: bold;
  }

  .terms-section {
    margin: 20px 0;

    .terms-header {
      font-weight: bold;
    }

    span {
      font-weight: bold;
    }
  }
`;

function Terms({ history, getGovernanceStrike }) {
  useEffect(() => {
    window.scrollTo({
      top: 0
    });
  }, []);

  return (
    <MainLayout>
      <TermsWrapper>
        <div className="terms-title">Terms of Service</div>
        <p>
          Welcome to{' '}
          <a href="https://app.strike.org" target="_blank" rel="noreferrer">
            https://app.strike.org
          </a>
          , a website-hosted user interface (the “Interface” or “App”) provided
          by the Strike Community, a non incorporated decentralized group (“we”,
          “our”, or “us”), to access non-custodial smart contracts on the
          Ethereum blockchain. The Interface provides access to a decentralized
          protocol on the Ethereum blockchain that allows suppliers and
          borrowers of certain digital assets to participate in autonomous
          interest rate markets (the “Protocol”).
        </p>
        <p>
          This Terms of Service Agreement (the “Agreement”) explains the terms
          and conditions by which you may access and use the Interface. You must
          read this Agreement carefully. By accessing or using the Interface,
          you signify that you have read, understand, and agree to be bound by
          this Agreement in its entirety. If you do not agree, you are not
          authorized to access or use the Interface.
        </p>
        <div className="terms-section">
          <div className="terms-header">1. Modification of this Agreement</div>
          <div className="terms-body">
            We reserve the right, in our sole discretion, to modify this
            Agreement from time to time. If we make any modifications, we will
            notify you by updating the date at the top of the Agreement and by
            maintaining a current version of the Agreement at
            https://app.strike.org/terms. All modifications will be effective
            when they are posted, and your continued use of the Interface will
            serve as confirmation of your acceptance of those modifications. If
            you do not agree with any modifications to this Agreement, you must
            immediately stop accessing and using the Interface.
          </div>
        </div>
        <div className="terms-section">
          <div className="terms-header">2. Eligibility</div>
          <div className="terms-body">
            To access or use the Interface, you must be able to form a legally
            binding contract with us. Accordingly, you represent that you are at
            least eighteen years old and have the full right, power, and
            authority to enter into and comply with the terms and conditions of
            this Agreement on behalf of yourself and any company or legal entity
            for which you may access or use the Interface. You further represent
            that you are not a citizen, resident, or member of any jurisdiction
            or group that is subject to economic sanctions (“OFAC”) by the
            United States, or where your use of the Interface would be illegal
            or otherwise violate any applicable law. You further represent that
            your access and use of the Interface will fully comply with all
            applicable laws and regulations, and that you will not access or use
            the Interface to conduct, promote, or otherwise facilitate any
            illegal activity. Furthermore, users that are citizens or residents
            of the United States are prohibited from accessing{' '}
            <a href="https://app.strike.org" target="_blank" rel="noreferrer">
              app.strike.org
            </a>{' '}
            and Strike services.
          </div>
        </div>
        <div className="terms-section">
          <div className="terms-header">4. Privacy</div>
          <div className="terms-body">
            We do not collect any user data information as the entire protocol
            is open-source. Any publicly available data on the Ethereum
            blockchain is available for all to see and collect at their own
            recognizance.
          </div>
        </div>
        <div className="terms-section">
          <div className="terms-header">5. Prohibited Activity</div>
          <div className="terms-body">
            You agree not to engage in, or attempt to engage in, any of the
            following categories of prohibited activity in relation to your
            access and use of the Interface:
            <ul>
              <li>
                Cyberattack. Activity that seeks to interfere with or compromise
                the integrity, security, or proper functioning of any computer,
                server, network, personal device, or other information
                technology system, including (but not limited to) the deployment
                of viruses and denial of service attacks.
              </li>
              <li>
                Fraud and Misrepresentation. Activity that seeks to defraud us
                or any other person or entity, including (but not limited to)
                providing any false, inaccurate, or misleading information in
                order to unlawfully obtain the property of another.
              </li>
              <li>
                Market Manipulation. Activity that violates any applicable law,
                rule, or regulation concerning the integrity of trading markets,
                including (but not limited to) the manipulative tactics commonly
                known as spoofing and wash trading.
              </li>
              <li>
                Any Other Unlawful Conduct. Activity that violates any
                applicable law, rule, or regulation of the United States,
                Singapore, or another relevant jurisdiction, including (but not
                limited to) the restrictions and regulatory requirements imposed
                by U.S. or S.G. law.
              </li>
            </ul>
          </div>
        </div>
        <div className="terms-section">
          <div className="terms-header">6. No Professional Advice</div>
          <div className="terms-body">
            All information provided by the Interface is for informational
            purposes only and should not be construed as professional advice.
            You should not take, or refrain from taking, any action based on any
            information contained in the Interface. Before you make any
            financial, legal, or other decisions involving the Interface, you
            should seek independent professional advice from an individual who
            is licensed and qualified in the area for which such advice would be
            appropriate.
          </div>
        </div>
        <div className="terms-section">
          <div className="terms-header">7. No Warranties</div>
          <div className="terms-body">
            The Interface is provided on an “AS IS” and “AS AVAILABLE” basis. To
            the fullest extent permitted by law, we disclaim any representations
            and warranties of any kind, whether express, implied, or statutory,
            including (but not limited to) the warranties of merchantability and
            fitness for a particular purpose.{' '}
            <span>
              You acknowledge and agree that your use of the Interface is at
              your own risk
            </span>
            . We do not represent or warrant that access to the Interface will
            be continuous, uninterrupted, timely, or secure; that the
            information contained in the Interface will be accurate, reliable,
            complete, or current; or that the Interface will be free from
            errors, defects, viruses, or other harmful elements. No advice,
            information, or statement that we make should be treated as creating
            any warranty concerning the Interface. We do not endorse, guarantee,
            or assume responsibility for any advertisements, offers, or
            statements made by third parties concerning the Interface.
          </div>
        </div>
        <div className="terms-section">
          <div className="terms-header">8. No Fiduciary Duties</div>
          <div className="terms-body">
            This Agreement is not intended to, and does not, create or impose
            any fiduciary duties on us. To the fullest extent permitted by law,
            you acknowledge and agree that we owe no fiduciary duties or
            liabilities to you or any other party, and that to the extent any
            such duties or liabilities may exist at law or in equity, those
            duties and liabilities are hereby irrevocably disclaimed, waived,
            and eliminated. You further agree that the only duties and
            obligations that we owe you are those set out expressly in this
            Agreement.
          </div>
        </div>
        <div className="terms-section">
          <div className="terms-header">9. Compliance Obligations</div>
          <div className="terms-body">
            The Interface is operated from facilities within the European Union.
            The Interface may not be available or appropriate for use in other
            jurisdictions. The Interface is blocked by US IP addresses. By
            accessing or using the Interface, you agree that you are solely and
            entirely responsible for compliance with all laws and regulations
            that may apply to you. You may not use the Interface if you are a
            citizen, resident, or member of any jurisdiction or group that is
            subject to economic sanctions by the United States, if your use of
            the Interface would be illegal or otherwise violate any applicable
            law, or if you are are resident and/or citizen of the United States.
          </div>
        </div>
        <div className="terms-section">
          <div className="terms-header">10. Assumption of Risk</div>
          <div className="terms-body">
            By accessing and using the Interface, you represent that you
            understand the inherent risks associated with using cryptographic
            and blockchain-based systems, and that you have a working knowledge
            of the usage and intricacies of digital assets such as bitcoin
            (BTC), ether (ETH), and other digital tokens such as those following
            the Ethereum Token Standard (ERC-20). You further understand that
            the markets for these digital assets are highly volatile due to
            factors including (but not limited to) adoption, speculation,
            technology, security, and regulation. You acknowledge that the cost
            and speed of transacting with cryptographic and blockchain-based
            systems such as Ethereum are variable and may increase dramatically
            at any time. You further acknowledge the risk that your digital
            assets may lose some or all of their value while they are supplied
            to the Protocol. If you borrow digital assets from the Protocol, you
            will have to supply digital assets of your own as collateral. If
            your collateral declines in value such that it is no longer
            sufficient to secure the amount that you borrowed, others may
            interact with the Protocol to seize your collateral in a liquidation
            event. You further acknowledge that we are not responsible for any
            of these variables or risks, do not own or control the Protocol, and
            cannot be held liable for any resulting losses that you experience
            while accessing or using the Interface.{' '}
            <span>
              Accordingly, you understand and agree to assume full
              responsibility for all of the risks of accessing and using the
              Interface and interacting with the Protocol.
            </span>
          </div>
        </div>
        <div className="terms-section">
          <div className="terms-header">
            11. Third-Party Resources and Promotions
          </div>
          <div className="terms-body">
            The Interface may contain references or links to third-party
            resources, including (but not limited to) information, materials,
            products, or services, that we do not own or control. In addition,
            third parties may offer promotions related to your access and use of
            the Interface. We do not endorse or assume any responsibility for
            any such resources or promotions. If you access any such resources
            or participate in any such promotions, you do so at your own risk,
            and you understand that this Agreement does not apply to your
            dealings or relationships with any third parties. You expressly
            relieve us of any and all liability arising from your use of any
            such resources or participation in any such promotions.
          </div>
        </div>
        <div className="terms-section">
          <div className="terms-header">12. Release of Claims</div>
          <div className="terms-body">
            You expressly agree that you assume all risks in connection with
            your access and use of the Interface and your interaction with the
            Protocol. You further expressly waive and release us from any and
            all liability, claims, causes of action, or damages arising from or
            in any way relating to your use of the Interface and your
            interaction with the Protocol.
          </div>
        </div>
        <div className="terms-section">
          <div className="terms-header">13. Indemnity</div>
          <div className="terms-body">
            You agree to hold harmless, release, defend, and indemnify us and
            our contractors, agents, affiliates, and subsidiaries from and
            against all claims, damages, obligations, losses, liabilities,
            costs, and expenses arising from: (a) your access and use of the
            Interface; (b) your violation of any term or condition of this
            Agreement, the right of any third party, or any other applicable
            law, rule, or regulation; and (c) any other party’s access and use
            of the Interface with your assistance or using any device or account
            that you own or control.
          </div>
        </div>
        <div className="terms-section">
          <div className="terms-header">14. Limitation of Liability</div>
          <div className="terms-body">
            Under no circumstances shall we or any of our contractors, agents,
            affiliates, or subsidiaries be liable to you for any indirect,
            punitive, incidental, special, consequential, or exemplary damages,
            including (but not limited to) damages for loss of profits,
            goodwill, use, data, or other intangible property, arising out of or
            relating to any access or use of the Interface, nor will we be
            responsible for any damage, loss, or injury resulting from hacking,
            tampering, or other unauthorized access or use of the Interface or
            the information contained within it. We assume no liability or
            responsibility for any: (a) errors, mistakes, or inaccuracies of
            content; (b) personal injury or property damage, of any nature
            whatsoever, resulting from any access or use of the Interface; (c)
            unauthorized access or use of any secure server or database in our
            control, or the use of any information or data stored therein; (d)
            interruption or cessation of function related to the Interface; (e)
            bugs, viruses, trojan horses, or the like that may be transmitted to
            or through the Interface; (f) errors or omissions in, or loss or
            damage incurred as a result of the use of, any content made
            available through the Interface; and (g) the defamatory, offensive,
            or illegal conduct of any third party. Under no circumstances shall
            we or any of our contractors, agents, affiliates, or subsidiaries be
            liable to you for any claims, proceedings, liabilities, obligations,
            damages, losses, or costs in an amount exceeding the amount you paid
            to us in exchange for access to and use of the Interface, or
            $100.00, whichever is greater. This limitation of liability applies
            regardless of whether the alleged liability is based on contract,
            tort, negligence, strict liability, or any other basis, and even if
            we have been advised of the possibility of such liability. Some
            jurisdictions do not allow the exclusion of certain warranties or
            the limitation or exclusion of certain liabilities and damages.
            Accordingly, some of the disclaimers and limitations set forth in
            this Agreement may not apply to you. This limitation of liability
            shall apply to the fullest extent permitted by law.
          </div>
        </div>
        <div className="terms-section">
          <div className="terms-header">15. Dispute Resolution</div>
          <div className="terms-body">
            Under no circumstances shall we or any of our contractors, agents,
            affiliates, or subsidiaries be liable to you for any indirect,
            punitive, incidental, special, consequential, or exemplary damages,
            including (but not limited to) damages for loss of profits,
            goodwill, use, data, or other intangible property, arising out of or
            relating to any access or use of the Interface, nor will we be
            responsible for any damage, loss, or injury resulting from hacking,
            tampering, or other unauthorized access or use of the Interface or
            the information contained within it. We assume no liability or
            responsibility for any: (a) errors, mistakes, or inaccuracies of
            content; (b) personal injury or property damage, of any nature
            whatsoever, resulting from any access or use of the Interface; (c)
            unauthorized access or use of any secure server or database in our
            control, or the use of any information or data stored therein; (d)
            interruption or cessation of function related to the Interface; (e)
            bugs, viruses, trojan horses, or the like that may be transmitted to
            or through the Interface; (f) errors or omissions in, or loss or
            damage incurred as a result of the use of, any content made
            available through the Interface; and (g) the defamatory, offensive,
            or illegal conduct of any third party. Under no circumstances shall
            we or any of our contractors, agents, affiliates, or subsidiaries be
            liable to you for any claims, proceedings, liabilities, obligations,
            damages, losses, or costs in an amount exceeding the amount you paid
            to us in exchange for access to and use of the Interface, or
            $100.00, whichever is greater. This limitation of liability applies
            regardless of whether the alleged liability is based on contract,
            tort, negligence, strict liability, or any other basis, and even if
            we have been advised of the possibility of such liability. Some
            jurisdictions do not allow the exclusion of certain warranties or
            the limitation or exclusion of certain liabilities and damages.
            Accordingly, some of the disclaimers and limitations set forth in
            this Agreement may not apply to you. This limitation of liability
            shall apply to the fullest extent permitted by law. The arbitration
            will be held in Bulgaria, unless you and we both agree to hold it
            elsewhere. Unless we agree otherwise, the arbitrator may not
            consolidate your claims with those of any other party. Any judgment
            on the award rendered by the arbitrator may be entered in any court
            of competent jurisdiction.
          </div>
        </div>
        <div className="terms-section">
          <div className="terms-header">
            16. Class Action and Jury Trial Waiver
          </div>
          <div className="terms-body">
            You must bring any and all Disputes against us in your individual
            capacity and not as a plaintiff in or member of any purported class
            action, collective action, private attorney general action, or other
            representative proceeding. This provision applies to class
            arbitration. You and we both agree to waive the right to demand a
            trial by jury.
          </div>
        </div>
        <div className="terms-section">
          <div className="terms-header">17. Governing Law</div>
          <div className="terms-body">
            You agree that the laws of Singapore, without regard to principles
            of conflict of laws, govern this Agreement and any Dispute between
            you and us. You further agree that the Interface shall be deemed to
            be based solely in Singapore and that although the Interface may be
            available in other jurisdictions, its availability does not give
            rise to general or specific personal jurisdiction in any forum
            outside Singapore. Any arbitration conducted pursuant to this
            Agreement shall be governed by the Federal Arbitration Act.
          </div>
        </div>
        <div className="terms-section">
          <div className="terms-header">18. Marketing</div>
          <div className="terms-body">
            We have given various community members access to social media
            accounts to communicate on behalf of the Strike Community. These
            accounts are not controlled by any individual in the United States
            nor any citizen of the United States. These social media accounts
            may be, but not limited to; Twitter, Medium, and Telegram.
          </div>
        </div>{' '}
      </TermsWrapper>
    </MainLayout>
  );
}

Terms.propTypes = {
  history: PropTypes.object,
  getGovernanceStrike: PropTypes.func.isRequired
};

Terms.defaultProps = {
  history: {}
};

export default Terms;
