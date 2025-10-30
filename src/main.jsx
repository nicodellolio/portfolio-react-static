import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ReactGA from 'react-ga4';
import './style.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import App from './App.jsx'

const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (gaMeasurementId) {
  ReactGA.initialize(gaMeasurementId);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
