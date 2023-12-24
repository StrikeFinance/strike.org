import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Provider } from 'react-redux';
import { RefreshContextProvider } from 'contexts/RefreshContext';
import { Web3ReactProvider } from '@web3-react/core';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import HomePage from 'containers/page/homepage/HomePage';
import TermsPage from 'containers/page/term/TermsPage';

import { store } from 'core';
import Theme from 'containers/Theme';
import 'assets/styles/App.scss';
// import GovernanceDetail from 'containers/page/GovernanceDetail';
// import MarketDetail from 'containers/page/homepage/elements/marketDetail/MarketDetail';
// import GovernanceAddressDetail from 'containers/page/GovernanceDetail/GovernanceAddressDetail/GovernanceAddressDetail';
import BlogsPage from 'containers/page/blogs/BlogsPage';
import BlogsDetailPage from 'containers/page/blogDetails/BlogDetails';
import TxHistory from 'containers/page/txHistory/TxHistory';
import enMessages from 'lang/en.json';
import { libraries } from '../connectors';

addLocaleData([...en]);
const initialLang = 'en';

const messages = {
  en: enMessages
};

// eslint-disable-next-line global-require
window.Buffer = window.Buffer || require('buffer').Buffer;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: initialLang
    };
  }

  render() {
    const { lang } = this.state;
    const message = messages[lang];
    return (
      <Theme>
        <IntlProvider locale={lang} messages={message}>
          <Web3ReactProvider connectors={libraries}>
            <RefreshContextProvider>
              <Provider store={store}>
                <BrowserRouter>
                  <Switch
                    atEnter={{ opacity: 0 }}
                    atLeave={{ opacity: 0.5 }}
                    atActive={{ opacity: 1 }}
                    className="switch-wrapper"
                  >
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/terms" component={TermsPage} />
                    {/* <Route exact path="/market/:asset" component={MarketDetail} /> */}
                    {/* <Route
                  exact
                  path="/vote/address/:address"
                  component={GovernanceAddressDetail}
                />
                <Route
                  exact
                  path="/governance-detail/:id"
                  component={GovernanceDetail}
                /> */}
                    <Route exact path="/blog" component={BlogsPage} />
                    <Route exact path="/blog/:id" component={BlogsDetailPage} />
                    <Route exact path="/history" component={TxHistory} />
                    <Redirect from="/" to="/" />
                  </Switch>
                </BrowserRouter>
              </Provider>
            </RefreshContextProvider>
          </Web3ReactProvider>
        </IntlProvider>
      </Theme>
    );
  }
}

export default hot(App);
