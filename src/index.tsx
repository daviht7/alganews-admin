import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import DefaultLayout from './app/layouts/Default/Default.layout';
import Routes from './app/routes';
import { store } from './core/store';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <DefaultLayout>
          <Routes />
        </DefaultLayout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
