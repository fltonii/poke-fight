import React from "react";
import ApolloClient from "apollo-boost";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const random1 = Math.floor(Math.random() * 151);
const random2 = Math.floor(Math.random() * 151);
const search = random1 > random2 ? random1 : random2;

export const client = new ApolloClient({
  uri: "https://graphql-pokemon.now.sh/?"
});

export const PokeQuery = () => (
  <Query
    query={gql`
      {
        pokemons(first: ${search}) {
          name
          image
          maxCP
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error{console.log(error)}</p>;

      const poke1 = data.pokemons[random1 - 1];
      const poke2 = data.pokemons[random2 - 1];

      return (
        <div style={{ width: "100%", textAlign: "center" }}>
          <div style={{ width: "50%", float: "left" }}>
            <p style={{ fontSize: 30, fontFamily: "arial" }}>{poke1.name}</p>
            <img src={poke1.image} alt={poke1.name} style={{ marginTop: 20 }} />
            <p>{`CP: ${poke1.maxCP}`}</p>
          </div>
          <div style={{ width: "50%", float: "left" }}>
            <p style={{ fontSize: 30, fontFamily: "arial" }}>{poke2.name}</p>
            <img src={poke2.image} alt={poke2.name} style={{ marginTop: 20 }} />
            <p>{`CP: ${poke2.maxCP}`}</p>
          </div>
          <div style={{ width: "100%", float: "left" }}>
            <form>
              <button>Another</button>
            </form>
            <p style={{ fontSize: 20, fontFamily: "arial" }}>
              {poke1.maxCP > poke2.maxCP
                ? `Winner: ${poke1.name}`
                : `Winner: ${poke2.name}`}
            </p>
          </div>
        </div>
      );
    }}
  </Query>
);
