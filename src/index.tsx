import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import defaults from "./graphql/defaults";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
import App from "./App";
import "./index.css";

const URI = "https://fakerql.com/graphql";
const client = new ApolloClient({
  clientState: {
    defaults,
    resolvers,
    typeDefs,
  },
  uri: URI,
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement,
);
