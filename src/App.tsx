import defaults from "graphql/defaults";
import resolvers from "graphql/resolvers";
import typeDefs from "graphql/typeDefs";
import React from "react";
import Example from "components/Example";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const URI = "unused";
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
    <Example />
  </ApolloProvider>
);

export default App;
