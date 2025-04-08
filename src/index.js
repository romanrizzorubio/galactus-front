import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css';
import App from './components/app/App.js';
import Mesa from './components/mesa/Mesa.js';
import Init from "./components/init/Init.js";

const router = createBrowserRouter([{
  path: '/',
  element:(<App/>)
},{
  path: '/mesa',
  element:(<Mesa/>)
},{
  path: '/init',
  element:(<Init/>)
}]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>
);
