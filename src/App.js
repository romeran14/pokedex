import "./App.css";
import { Fragment } from "react";
import ListadoPokemon from "./components/ListadoPokemon";
import BuscadorPokemon from "./components/BuscadorPokemon";
import { fetchAllPokemons } from "./anotherFunctions/fetchAllpokemons";
import PokemonContextProvider from "./context/ContextoListaPokemon";
import PokemonDetallesProvider from "./context/ContextoPokemonDetalles";

function App() {
  fetchAllPokemons();

  return (
    <div className="App">
      <PokemonContextProvider>
        <PokemonDetallesProvider>
          <BuscadorPokemon></BuscadorPokemon>
        </PokemonDetallesProvider>
      </PokemonContextProvider>
    </div>
  );
}

export default App;
