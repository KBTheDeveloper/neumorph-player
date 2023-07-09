import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';
import "../src/styles/styles.scss";

const container = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>, container);
