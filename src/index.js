import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/Main/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResultsPage from './pages/ResultsPage/ResultsPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes> {}
        <Route path="/" element={<App />} /> {}
        <Route path="/results" element={<ResultsPage />} /> {}
      </Routes>
    </Router>
  </React.StrictMode>,
);

reportWebVitals();
