import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Context
import { AuthContextProvider } from "./context/AuthContext";
const root = createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
