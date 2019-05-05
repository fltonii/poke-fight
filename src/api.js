import ApolloClient from "apollo-boost";

// todo: trazer as queries para cá e exportar para não precisar
// manipular a api dentro dos componentes
export const client = new ApolloClient({
  uri: "https://graphql-pokemon.now.sh/?"
});
