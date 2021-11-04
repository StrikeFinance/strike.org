import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import enMessages from '../lang/en.json';
// import Home from 'containers/Main/Home';
// import Terms from 'containers/Main/Terms';
import HomePage from './page/homepage/HomePage';
import TermsPage from './page/term/TermsPage';
import { store } from '../core';
import Theme from './Theme';
import 'assets/styles/App.scss';
import GovernanceDetail from 'containers/page/GovernanceDetail'
import MarketDetail from './page/homepage/elements/marketDetail/MarketDetail';

addLocaleData([...en]);
const initialLang = 'en';

const messages = {
  en: enMessages
};

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
                <Route exact path="/market/:asset" component={MarketDetail} />

                <Route
                    exact
                    path="/governance-detail/:id"
                    component={GovernanceDetail}
                  />

                <Redirect from="/" to="/" />
              </Switch>
            </BrowserRouter>
          </Provider>
        </IntlProvider>
      </Theme>
    );
  }
}

export default hot(App);
