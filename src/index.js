import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './containers/App';
// import * as serviceWorker from 'serviceWorker';

import 'antd/dist/antd.css';
import 'assets/styles/index.scss';

console.warn = () => {};

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// serviceWorker.register();
