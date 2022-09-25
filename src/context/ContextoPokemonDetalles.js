import React, { useState, createContext } from "react";

export const ContextoPokemonDetalles = createContext();

const PokemonDetallesProvider = (props) => {
  const [pokemonDetalles, setPokemonDetalles] = useState(25);

  return (
    <ContextoPokemonDetalles.Provider
      value={[pokemonDetalles, setPokemonDetalles]}
    >
      {props.children}{" "}
    </ContextoPokemonDetalles.Provider>
  );
};

export default PokemonDetallesProvider;
