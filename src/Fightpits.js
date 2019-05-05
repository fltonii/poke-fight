import React, { useReducer } from "react";
import Pokemon from "./Pokemon";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import "styled-components/macro";

// Tentei centralizar toda a logica de luta toda nesse componente

const reducer = (state = { turn: true }, action) => {
  switch (action.type) {
    case "addFighters": {
      return { ...state, fighters: action.payload };
    }
    case "changeTurn": {
      // quando state.turn for true quem ataca é o player1 e vice-versa
      return { ...state, turn: !state.turn };
    }
    case "dealDamage": {
      // quando a função attack é chamada ela vem para cá e manipula
      // o hp do player inativo. (se turn for true, quem é atacado
      // é o player 2 e vice-versa)
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

  // useEffect(() => {}, [state.fighters]);
  // ↑  todo: implementar um effect que quando um dos players morre
  // (hp == 0) o jogo, randomiza os players (ou mantem o player que
  // ganhou aumenta cp/vida ?) e muda o score

  const randomizePlayer = pokemons => {
    // cria um pokemon aleatorio
    const pokemon = pokemons[Math.floor(Math.random() * 151) - 1];
    // randomiza o hp tendo no minimo metade do maxHP e no max maxHP
    const hp =
      Math.floor(Math.random() * (pokemon.maxHP - pokemon.maxHP / 2)) +
      pokemon.maxHP / 2;
    // faz o msm com o CP
    const cp =
      Math.floor(Math.random() * (pokemon.maxCP - pokemon.maxHP / 2)) +
      pokemon.maxHP / 2;

    return { pokemon, hp, cp };
  };

  const attack = damage => {
    dispatch({ type: "dealDamage", damage });
    dispatch({ type: "changeTurn" });
    // troca o turn toda vez que ataca...
    // esse metodo é meio frágil porque como o state é setado de forma asincrona
    // o changeTurn pode finalizar antes do dealDamage, e pode acontecer do pokemon
    // causar dano nele mesmo (n consegui reproduzir isso, mas em teoria
    // pode acontecer asudhasudh)
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
      // levar a query para /src/api.js
      // aqui só tem que dizer:
      // query={getPokemons} ou algo assim
      query={gql`
        {
          pokemons(first: 151) {
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
                {/* todo: implementar Score (1 x 0 wins...) */}
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
