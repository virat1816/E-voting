import React from "react";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Provider } from "react-redux";
import { store } from "./Redux-Toolkit/Store/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ProSidebarProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ProSidebarProvider>
  </BrowserRouter>
);
