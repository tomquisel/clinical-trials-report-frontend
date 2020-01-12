import defaults from "graphql/defaults";
import resolvers from "graphql/resolvers";
import typeDefs from "graphql/typeDefs";
import React from "react";
import Site from "components/Site";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "App.css";

const URI = "https://tomquisel.com/graphql";
const client = new ApolloClient({
  clientState: {
    defaults,
    resolvers,
    typeDefs,
  },
  uri: URI,
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <Site />
    </div>
  </ApolloProvider>
);

export default App;
