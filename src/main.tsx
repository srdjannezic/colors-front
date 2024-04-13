import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import axios from "axios";
import { apiUrl } from "./config.ts";

const token = localStorage.getItem("token");
axios.defaults.baseURL = apiUrl;
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
