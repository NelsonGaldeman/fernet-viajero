import React from "react";
import ReactDOM from "react-dom/client";
import "./css/main.css";
import App from "./App";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const endpoint =
  "https://api.thegraph.com/subgraphs/name/nelsongaldeman/fernet-viajero";

const client = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
