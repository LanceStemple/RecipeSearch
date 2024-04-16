import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import { UserProvider } from "./contexts/UserContext";
import App from "./pages/Main/App";
import LoginPage from "./pages/Login/LoginPage";
import MyRecipes from "./pages/MyRecipes/MyRecipes";
import Popular from "./pages/Popular/Popular";
import ResultsPage from "./pages/ResultsPage/ResultsPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <Routes>
          {" "}
          {}
          <Route path="/" element={<App />} /> {}
          <Route path="/login" element={<LoginPage />} /> {}
          <Route path="/results" element={<ResultsPage />} /> {}
          <Route path="/MyRecipes" element={<MyRecipes />} /> {}
          <Route path="/Popular" element={<Popular />} /> {}
        </Routes>
      </UserProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
