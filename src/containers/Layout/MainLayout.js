import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import Header from 'containers/Layout/Header';
import Footer from 'containers/Layout/Footer';
import { Row, Column } from 'components/Basic/Style';
import SubHeader from './SubHeader';

const MainLayoutWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: var(--color-bg-main);
  position: relative;

  @media only screern and (max-width: 769px) {
    width: 1120px;
  }
  .main {
    background-color: var(--color-bg-main);
    overflow-x: hidden;
    .main-content {
      display: flex;
      flex-direction: column;
      min-height: calc(100vh - 150px);
    }

    @media only screen and (max-width: 768px) {
      padding: 0px;
      width: 100%;
    }
  }

  /* width */
  &::-webkit-scrollbar {
    width: 0px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    -webkit-border-radius: 3px;
    background-color: var(--color-blue);
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #539ef9;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;

function MainLayout({ title, children, moveToEarn, moveToDevelopers, isHeader }) {
  return (
    <MainLayoutWrapper>
      <Row>
        <Column xs="12" sm="12">
          <Header />
        </Column>
        <Column xs="12" sm="12" className="main">
          <Row>
            {isHeader && (
              <Column xs="12">
                <SubHeader title={title} />
              </Column>
            )}
            <Column xs="12">
              <div className="main-content">{children}</div>
            </Column>
          </Row>
        </Column>
        <Column xs="12" sm="12">
          <Footer />
        </Column>
      </Row>
    </MainLayoutWrapper>
  );
}

MainLayout.propTypes = {
  title: PropTypes.string,
  isHeader: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

MainLayout.defaultProps = {
  title: '',
  children: null,
  isHeader: true
};

export default withTheme(MainLayout);
