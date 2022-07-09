import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import styles from './app.module.scss';

import { ReactComponent as Logo } from './logo.svg';

import BusinessView from './pages/business-view/business-view';
import BusinessesListing from './pages/businesses-listing/businesses-listing';


export function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className="flex">
          <Link to="/">
            <Logo width="75" height="75" />
          </Link>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<BusinessesListing />} />
            <Route path="business/:businessId" element={<BusinessView />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
