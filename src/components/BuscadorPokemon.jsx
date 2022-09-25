import React from "react";
import { Fragment, useState ,useContext} from "react";
import { fetchAllPokemons } from "../anotherFunctions/fetchAllpokemons";
import ListadoPokemon from "./ListadoPokemon";
import { ContextoListaPokemon } from "../context/ContextoListaPokemon";
import { ContextoPokemonDetalles } from "../context/ContextoPokemonDetalles";
import PokemonDetalles from "./PokemonDetalles";
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { SearchIcon  } from '@chakra-ui/icons'

const ArrayPokemonaFilstrar = fetchAllPokemons()


const BuscadorPokemon = () =>{
    
  const [search, setSearch] = useState("");
  const [ListaPokemon, setListaPokemon] = useContext(ContextoListaPokemon);
  const [modoBusqueda, setModoBusqueda] = useState(false);


  const onSearchChange = (e) => {
    setModoBusqueda(true);

    setSearch(e.target.value);

    filtrarPokemons(e.target.value);
  };



const filtrarPokemons = (search) => {
  if (!search.length) {
    setModoBusqueda(false);
  } else {
    ArrayPokemonaFilstrar.then((lista) => {
      const ListaTodosPokemon = lista;
      const filtrados = ListaTodosPokemon.filter((poke) =>
        poke.nombre.includes(search.toLowerCase())
      );

      setListaPokemon(filtrados);
    });
  }
};

  return (
    <Fragment>
      <PokemonDetalles></PokemonDetalles>

      <div className="col">
        <form className="form-group">
          <InputGroup>
            <Input
              variant="flushed"
              _placeholder={{ opacity: 0.8, color: "white" }}
              onChange={onSearchChange}
              value={search}
              className="form-control mb-3"
              placeholder="Search Pokemon..."
            />
            <InputRightElement
              pointerEvents="none"
              children={<SearchIcon color="#ff2121" />}
            />
          </InputGroup>
        </form>
      </div>
      <ListadoPokemon modoBusqueda={modoBusqueda}></ListadoPokemon>
    </Fragment>
  );
}

export default BuscadorPokemon