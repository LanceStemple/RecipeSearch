import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import App from './pages/Main/App';
import MyRecipes from './pages/MyRecipes/MyRecipes';
import Popular from './pages/Popular/Popular';
import ResultsPage from './pages/ResultsPage/ResultsPage';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes> {}
        <Route path="/" element={<App />} /> {}
        <Route path="/results" element={<ResultsPage />} /> {}
        <Route path="/MyRecipes" element={<MyRecipes />} /> {}
        <Route path="/Popular" element={<Popular />} /> {}
      </Routes>
    </Router>
  </React.StrictMode>,
);

reportWebVitals();
