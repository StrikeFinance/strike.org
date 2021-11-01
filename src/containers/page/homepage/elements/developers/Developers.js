import React from 'react';
import DeveloperDocs from './developer-docs/DeveloperDocs';
import StrikeProtocol from './strike-protocol/StrikeProtocol';
import UserInterface from './user-interface/UserInterface';

const Developers = () => {
  return (
    <div>
      <DeveloperDocs />
      <UserInterface />
      <StrikeProtocol />
    </div>
  );
};

export default Developers;
