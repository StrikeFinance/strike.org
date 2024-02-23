import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { RefreshContextProvider } from 'contexts/RefreshContext';
import { Web3ReactProvider } from '@web3-react/core';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import zh from 'react-intl/locale-data/zh';
import tr from 'react-intl/locale-data/tr';
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
import SalePage from 'containers/page/sale';
import TxHistory from 'containers/page/txHistory/TxHistory';
import enMessages from 'lang/en';
import zhMessages from 'lang/zh';
import esMessages from 'lang/es';
import trMessages from 'lang/tr';
import moment from 'moment';
import { libraries } from '../connectors';

import 'moment/locale/es';
import 'moment/locale/tr';
import 'moment/locale/zh-cn';

addLocaleData([...en, ...zh, ...es, ...tr]);

const messages = {
  en: enMessages,
  zh: zhMessages,
  es: esMessages,
  tr: trMessages
};

// eslint-disable-next-line global-require
window.Buffer = window.Buffer || require('buffer').Buffer;

function App() {
  const lang = localStorage.getItem('language') || 'en';
  const message = messages[localStorage.getItem('language') || 'en'];

  useEffect(() => {
    if (lang === 'zh') {
      moment.locale('zh-cn');
    } else {
      moment.locale(lang);
    }
  }, [lang]);

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
                  <Route exact path="/sale" component={SalePage} />
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

export default hot(App);
