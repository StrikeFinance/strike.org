import React from 'react';
import DeveloperDocs from './developer-docs/DeveloperDocs';
import StrikeProtocol from './strike-protocol/StrikeProtocol';
import UserInterface from './user-interface/UserInterface';
import './Developers.scss';

const Developers = () => {
  return (
    <div className="developers" id="developer">
      <DeveloperDocs />
      <UserInterface />
      <StrikeProtocol />
    </div>
  );
};

export default Developers;
