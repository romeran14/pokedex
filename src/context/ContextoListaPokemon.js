import React, { useState, createContext } from "react";


export const ContextoListaPokemon = createContext();

const PokemonContextProvider = (props) => {
  const [ListaPokemon, setListaPokemon] = useState([]);

  return (
    <ContextoListaPokemon.Provider value={[ListaPokemon, setListaPokemon]}>
  
      {props.children}
    </ContextoListaPokemon.Provider>
  );
};

export default PokemonContextProvider;
