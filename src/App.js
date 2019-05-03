import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";

const random = Math.floor(Math.random() * 151);

const client = new ApolloClient({
  uri: "https://graphql-pokemon.now.sh/?"
});

const PokeQuery = () => (
  <Query
    query={gql`
      {
        pokemons(first: ${random}) {
          name
          image
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Erro{console.log(error)}</p>;

      const poke = data.pokemons[random - 1];

      return (
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 30, fontFamily: "arial" }}>{poke.name}</p>
          <img src={poke.image} alt={poke.name} style={{ marginTop: 20 }} />
          <br />
          <form>
            <button style={{ marginTop: 50 }}>Outro</button>
          </form>
        </div>
      );
    }}
  </Query>
);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <PokeQuery />
    </ApolloProvider>
  );
};

export default App;
