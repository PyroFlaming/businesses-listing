import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/app';

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider as ReduxProvider } from 'react-redux';

import {
  BUSINESSES_FEATURE_KEY,
  businessesReducer,
} from './app/store/businesses.slice';

const store = configureStore({
  reducer: { [BUSINESSES_FEATURE_KEY]: businessesReducer },
  // Additional middleware can be passed to this array
  middleware: [...getDefaultMiddleware()],
  devTools: process.env.NODE_ENV !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});

ReactDOM.render(
  <ReduxProvider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ReduxProvider>,
  document.getElementById('root')
);
