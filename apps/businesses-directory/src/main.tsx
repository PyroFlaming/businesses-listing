import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/app';


import { CssBaseline } from '@mui/material';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from './app/store/store';


ReactDOM.render(
  <ReduxProvider store={store}>
    <React.StrictMode>
      <CssBaseline />
      <App />
    </React.StrictMode>
  </ReduxProvider>,
  document.getElementById('root')
);
