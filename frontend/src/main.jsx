import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CitasProvider } from './context/CitasContext.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import { PacientesProvider } from './context/PacientesContext.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <AuthProvider>
      <PacientesProvider>
        <CitasProvider>
          <ToastContainer position='bottom-right' stacked />
          <App />
        </CitasProvider>
      </PacientesProvider>
    </AuthProvider>

  </React.StrictMode >,
)
