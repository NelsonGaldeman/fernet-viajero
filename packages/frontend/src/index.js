import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ApolloProvider } from "@apollo/client";

import { splitClient } from "./Apollo"; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={splitClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
