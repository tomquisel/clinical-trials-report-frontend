import React from "react";
import Site from "components/Site";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "style/App.css";

const URI = "https://tomquisel.com/graphql";
const client = new ApolloClient({
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
