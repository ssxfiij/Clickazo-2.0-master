// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Bootstrap principal
import "bootstrap/dist/css/bootstrap.min.css";

// Crea la raíz de la aplicación y renderiza el componente principal App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
