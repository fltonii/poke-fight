import React, { useReducer } from "react";
import Pokemon from "./Pokemon";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import "styled-components/macro";

const reducer = (state = { turn: true }, action) => {
  switch (action.type) {
    case "addFighters": {
      return { ...state, fighters: action.payload };
    }
    case "changeTurn": {
      // turn true == player1, false == player2
      return { ...state, turn: !state.turn };
    }
    case "dealDamage": {
      let receiver;
      if (state.turn) {
        receiver = "player2";
      } else {
        receiver = "player1";
      }
      return {
        ...state,
        fighters: {
          ...state.fighters,
          [receiver]: {
            ...state.fighters[receiver],
            hp: state.fighters[receiver].hp - action.damage
          }
        }
      };
    }
    default:
      throw new Error();
  }
};

const Fightpits = () => {
  // useReducer é um hook que simula um reducer (a la redux)
  // serve pra manipular estado local com maior complexidade
  const [state, dispatch] = useReducer(reducer, { players: [] });

  const randomizePlayer = pokemons => {
    const pokemon = pokemons[Math.floor(Math.random() * 151) - 1];
    const hp =
      Math.floor(Math.random() * (pokemon.maxHP - pokemon.maxHP / 2)) +
      pokemon.maxHP / 2;
    const cp =
      Math.floor(Math.random() * (pokemon.maxCP - pokemon.maxHP / 2)) +
      pokemon.maxHP / 2;

    return { pokemon, hp, cp };
  };

  const attack = damage => {
    dispatch({ type: "dealDamage", damage });
    dispatch({ type: "changeTurn" });
  };

  return (
    <Query
      onCompleted={data => {
        dispatch({
          type: "addFighters",
          payload: {
            player1: randomizePlayer(data.pokemons),
            player2: randomizePlayer(data.pokemons)
          }
        });
      }}
      query={gql`
        {
          pokemons(first: 807) {
            name
            image
            maxCP
            maxHP
            attacks {
              fast {
                name
                type
                damage
              }
              special {
                name
                type
                damage
              }
            }
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error{console.log(error)}</p>;
        return (
          <>
            <aside>
              <h1
                css={`
                  font-weight: 900;
                  font-size: 2.5rem;
                `}
              >
                Score:
              </h1>
            </aside>
            <div
              css={`
                display: flex;
                align-items: center;
                width: 100%;
              `}
            >
              <Pokemon
                stats={state.fighters.player1}
                attack={attack}
                turn={state.turn}
              />
              <Pokemon
                stats={state.fighters.player2}
                attack={attack}
                turn={!state.turn}
              />
            </div>
          </>
        );
      }}
    </Query>
  );
};

export default Fightpits;
