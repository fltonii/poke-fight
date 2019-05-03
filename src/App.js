import React from "react";
import { ApolloProvider } from "react-apollo";
import { client, PokeQuery } from './api';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <PokeQuery />
    </ApolloProvider>
  );
};

export default App;
