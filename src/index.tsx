import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import DefaultLayout from './app/layouts/Default/Default.layout';
import { store } from './core/store';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DefaultLayout>
        <App />
      </DefaultLayout>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
