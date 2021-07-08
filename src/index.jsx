import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import '@babel/polyfill';
import App from './components/app';
import { StoreProvider } from './state/StoreContext';
import ErrorBoundary from './state/ErrorBoundary';
import "bootstrap/dist/js/bootstrap.min.js"
import '../public/sass/hager.scss';

render(
  <Router>
    <ErrorBoundary>
      <StoreProvider>
        <App />
      </StoreProvider>
    </ErrorBoundary>
  </Router>,
  document.querySelector('#app'),
);
