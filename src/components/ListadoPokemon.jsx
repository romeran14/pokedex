import React from "react";
import { Fragment, useState , useEffect, useContext} from "react";
import { fetchAllPokemons } from "../anotherFunctions/fetchAllpokemons";
import { ContextoListaPokemon } from "../context/ContextoListaPokemon";
import { ContextoPokemonDetalles } from "../context/ContextoPokemonDetalles";
import { Fade } from "react-reveal";

const cantidadInicial = 42

const ArrayPokemon = fetchAllPokemons()

const ListadoPokemon = (modoBusqueda) => {

  const searchListaPokemon = () => {
    if (modoBusqueda.modoBusqueda === false) {
      ArrayPokemon.then((lista) => {
        const ListaTodosPokemon = lista;
        const list = ListaTodosPokemon;

        setListaPokemon(list);
      });
    } else {
      console.log("modo busqueda en true");
    }
  };


const [contadorLista, setContadorLista] = useState(cantidadInicial);
const [ListaPokemon, setListaPokemon] = useContext(ContextoListaPokemon);
const [pokemonDetalles, setPokemonDetalles] = useContext(ContextoPokemonDetalles);

  
 window.onscroll = function () {
   //sumar contador si el tamano del recorrido es mayor o igual al tamano del documento
   if (
     window.innerHeight + document.documentElement.scrollTop >
       document.documentElement.scrollHeight ||
     window.innerHeight + document.documentElement.scrollTop ===
       document.documentElement.scrollHeight
   ) {
     setContadorLista(contadorLista + 35);
   }
 };

 const cambiarPokemonDetalle = (id) => {
   setPokemonDetalles(id);
 };

 useEffect(() => {
   searchListaPokemon();
 }, [contadorLista, modoBusqueda]);

return (
  <Fragment>
    {ListaPokemon?.length !== 0 ? (
      <ul className="container-listado">
        {ListaPokemon.slice(0, contadorLista).map((pokemonItem) => (
          <Fade  key={pokemonItem.id.toString()}  top cascade>
            <li
              className="item-listado"
              onClick={() => cambiarPokemonDetalle(pokemonItem.id)} >
              <img src={pokemonItem.urlimg} alt={pokemonItem.nombre}></img>
              <h3>
                <span>ID{pokemonItem.id} </span>
                {pokemonItem.nombre}
              </h3>
            </li>
          </Fade>
        ))}
      </ul>
    ) : (
      <div className="empty">
        <h2 className="error errorlist">No Pokemons found</h2>
      </div>
    )}
  </Fragment>
);
}


export default ListadoPokemon;