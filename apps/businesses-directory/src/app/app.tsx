import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import styles from './app.module.scss';

import logo from './../assets/images/logo-social.png'

import BusinessView from './pages/business-view/business-view';
import BusinessesListing from './pages/businesses-listing/businesses-listing';
import { Container } from '@mui/material';


export function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className="flex">
          <Link to="/">
            <img id="site-logo" src={logo} alt="business directory logo" />
          </Link>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<BusinessesListing />} />
              <Route path="business/:businessId" element={<BusinessView />} />
            </Routes>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
