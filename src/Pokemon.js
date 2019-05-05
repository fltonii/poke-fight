import React from "react";
// styled-components/macro serve pra codar diretamente em
// css dentro de jsx, sem precisar usar camelCase => { fontSize ==> font-size }
import "styled-components/macro";

export const Pokemon = ({ stats, attack, turn }) => {
  return (
    <>
      <div
        css={`
          width: 100%;
          textalign: center;
          border: solid 2px ${turn ? "#42f4b0" : "transparent"};
        `}
      >
        <p
          css={`
            font-size: 30;
            font-weight: 600;
          `}
        >
          {stats.pokemon.name}
        </p>
        <img
          src={stats.pokemon.image}
          alt={stats.pokemon.name}
          css={`
            margintop: 20;
            height: 40vh;
          `}
        />
        <p>{`CP: ${stats.cp}`}</p>
        <p>{`HP: ${stats.hp}`}</p>
        {turn &&
          stats.pokemon.attacks.special.map(atk => {
            return (
              <button
                onClick={() =>
                  // todo: o damage ta nojentamente baixo, demora uma semana pra
                  // matar alguem... tem q fazer algo pro damage variar dependendo 
                  // do CP do pokemon... tipo, multiplica o baseDamage por uma 
                  // constante que é cp/100 algo assim asudhasudh
                  attack(
                    Math.floor(Math.random() * atk.damage + atk.damage / 2)
                  )
                }
              >
                {atk.name}
              </button>
            );
          })}
      </div>
    </>
  );
};

export default Pokemon;
