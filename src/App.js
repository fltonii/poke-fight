import React from "react";
import { ApolloProvider } from "react-apollo";
import { client } from "./api";
import Fightpits from "./Fightpits";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Fightpits />
    </ApolloProvider>
  );
};

export default App;
