import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css';
import App from './components/app/App.js';
import Mesa from './components/mesa/Mesa.js';
import Init from "./components/init/Init.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/mesa" element={<Mesa />}></Route>
        <Route path="/init" element={<Init />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
