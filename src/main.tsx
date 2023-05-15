import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from 'store/store';
import './index.css';

const App = lazy(() => import('./App'));

const container = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename=''>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
)
