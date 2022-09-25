import React from "react";
import { Fragment, useState, useEffect, useContext } from "react";
import { ContextoPokemonDetalles } from "../context/ContextoPokemonDetalles";
import { fetchAllPokemons } from "../anotherFunctions/fetchAllpokemons";
import { QuestionIcon } from "@chakra-ui/icons";
import { Spinner } from "@chakra-ui/react";
import GraficarRadar from "./GraficaRadar";
import { Tooltip } from "@chakra-ui/react";
import normal from "../backgrounds/normal.jpg";
import electric from "../backgrounds/electric.jpg";
import fire from "../backgrounds/fire.jpg";
import ground from "../backgrounds/ground.jpg";
import bug from "../backgrounds/bug.jpg";
import dark from "../backgrounds/dark.jpg";
import dragon from "../backgrounds/dragon.jpg";
import fairy from "../backgrounds/fairy.jpg";
import fighting from "../backgrounds/fighting.jpg";
import ghost from "../backgrounds/ghost.jpg";
import grass from "../backgrounds/grass.jpg";
import ice from "../backgrounds/ice.jpg";
import poison from "../backgrounds/poison.jpg";
import psychic from "../backgrounds/psychic.jpg";
import rock from "../backgrounds/rock.jpg";
import steel from "../backgrounds/steel.jpg";
import water from "../backgrounds/water.jpg";
import fly from "../backgrounds/fly.jpg";
import pokeballimg from "../images/pokeball.png";

const ArrayPokemonaFilstrar = fetchAllPokemons();

const PokemonDetalles = () => {

  const [pokemon, setPokemon] = useState("");
  const [pokemonDetalles, setPokemonDetalles] = useContext(ContextoPokemonDetalles);
  const [evolveArray, setEvolveArray] = useState([]);
  const [pokemonType, setPokemonType] = useState([]);
  const [shortDescription, setShortDescription] = useState();
  const [longDescription, setLongDescription] = useState();
  const [imageFancy, setImageFancy] = useState(null);
  const [habilityDescription, setHabilityDescription] = useState();
  const [loading, setLoading] = useState(false);

  var chainItems = [];
  var chainEvolve = [];
  var pokemonTypeArray = [];

  const procesarPromesa = async (PokemonDetalles) => {
    //solicitud pokemon
    const llegada = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${PokemonDetalles}`
    );
    const resp = await llegada.json();
    setPokemon(resp);

    //extrayendo tipos de Pokemon
    resp.types.map((item) => {
      pokemonTypeArray.push(item.type.name);
    });
    setPokemonType(pokemonTypeArray);
    //solicitud pokemon-species
    const urlSpecies = await resp.species.url;
    const pokemonSpecies = await fetch(urlSpecies);
    const pokemonSpeciesParse = await pokemonSpecies.json();

    //solicitud pokemon hability
    const urlHabilitie = await resp.abilities[0].ability.url;
    const habilityRequest = await fetch(urlHabilitie);
    const habilityResponse = await habilityRequest.json();

    //obteniendo descripcion de habilidad en ingles
    const flavorhabilities = habilityResponse.flavor_text_entries;
    const flavorHabilityEnglish = flavorhabilities.find(
      (text) => text.language.name === "en"
    );
    const flavorHabilitySolve = flavorHabilityEnglish.flavor_text;
    setHabilityDescription(flavorHabilitySolve);

    //obteniendo descripciones
    
    setShortDescription(pokemonSpeciesParse.genera[7].genus);
    const flavorText = pokemonSpeciesParse.flavor_text_entries;
    const flavorTextEnglish = flavorText.find(
      (text) => text.language.name === "en"
    );
    const flavorTextSolve = flavorTextEnglish.flavor_text;
    setLongDescription(flavorTextSolve);

    //solicitud cadena pokemon
    const url_Chain = pokemonSpeciesParse.evolution_chain.url;
    const chainfetch = await fetch(url_Chain);
    const evolution_Chain = await chainfetch.json();

    chainItems.push(evolution_Chain.chain.species.name);

    const ifEvolve = evolution_Chain.chain.evolves_to;
    //creando cadena pokemon verificando si el pokemon tiene evolucion
    if (ifEvolve.length > 0) {
      ifEvolve.map((evolucion) => {
        chainItems.push(evolucion.species.name);
        const ifEvolveAgain = evolucion.evolves_to;
        if (ifEvolveAgain.length > 0) {
          ifEvolveAgain.map((evolucionSuperior) => {
            chainItems.push(evolucionSuperior.species.name);
          });
        }
      });
//recorriendo el el array, encontrando coincidencia e pusheandolo en la cadena evolutiva
      chainItems.map((item) => {
        ArrayPokemonaFilstrar.then((lista) => {
          const ListaTodosPokemon = lista;
          const filtrados = ListaTodosPokemon.filter((poke) =>
            poke.nombre.includes(item.toLowerCase())
          );
          chainEvolve.push(filtrados[0]);
        });
      });

      setEvolveArray(chainEvolve);
    } else {

      //recorriendo el el array, encontrando coincidencia e pusheandolo en la cadena evolutiva
      chainItems.map((item) => {
        ArrayPokemonaFilstrar.then((lista) => {
          const ListaTodosPokemon = lista;
          const filtrados = ListaTodosPokemon.filter((poke) =>
            poke.nombre.includes(item.toLowerCase())
          );
          chainEvolve.push(filtrados[0]);
        });
      });
      setEvolveArray(chainEvolve);
    }
    setLoading(false);
  };

  const cambiarPokemonDetalle = (id) => {
    setPokemonDetalles(id);
  };
  //recibe id para verificar si la url da respuesta
  const checkImagen = async (id) => {
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`;

    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
    request.onload = function () {
      //  status = request.status;
      if (request.status === 200) {
        //if(statusText == OK)
        setImageFancy(true);
      } else {
        setImageFancy(false);
      }
    };
  };
  //chekeadno la existencia del id proporcionado por el contexto
  checkImagen(pokemonDetalles);
  const cambiarBackground = () => {
    switch (pokemonType[0]) {
      case "electric":
        return electric;
        break;
      case "normal":
        return normal;

        break;
      case "bug":
        return bug;

        break;
      case "dark":
        return dark;

        break;
      case "dragon":
        return dragon;

        break;
      case "fairy":
        return fairy;

        break;
      case "fighting":
        return fighting;

        break;
      case "flying":
        return fly;

        break;
      case "ghost":
        return ghost;

        break;
      case "grass":
        return grass;

        break;
      case "ground":
        return ground;

        break;
      case "ice":
        return ice;

        break;
      case "poison":
        return poison;

        break;
      case "psychic":
        return psychic;

        break;
      case "rock":
        return rock;

        break;
      case "steel":
        return steel;

        break;
      case "water":
        return water;

        break;
      case "fire":
        return fire;

        break;

      default:
        return normal;
        console.log("no se consiguen coincidencias");
    }
  };

  useEffect(() => {
    setLoading(true);
    procesarPromesa(pokemonDetalles);
  }, [pokemonDetalles]);
  
  return (
    <Fragment>
      <div className="margin-top">
        {pokemon?.length !== 0 ? (
          <div className="pokedex-body" key={pokemon.id}>
            <div className="pokeballimg">
              <img src={pokeballimg} alt="pokeball" />
            </div>

            <div
              className="pokemon-container"
              style={{ backgroundImage: `url(${cambiarBackground()})` }}
            >
              {loading ? (
                <Spinner
                  thickness="20px"
                  speed="0.65s"
                  emptyColor="white"
                  color="red.600"
                  size="xl"
                />
              ) : (
                <img
                  src={
                    imageFancy === true
                      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`
                      : pokemon.sprites.front_default
                  }
                  alt={pokemon.name}
                ></img>
              )}
            </div>
            <div className="right-box">
              <div className="data-box">
                <div className="text-box">
                  <h2>
                    ID- {pokemon.id} {pokemon.name}
                  </h2>
                  <p>Height: {pokemon.height}in</p>
                  <p>Weight: {pokemon.weight}lbs</p>
                  {habilityDescription?.length !== 0 ? (
                    <p>
                      Hability: {pokemon.abilities[0].ability.name}
                      <Tooltip
                        label={habilityDescription}
                        aria-label="A toolti"
                        tabIndex={0}
                      >
                        <QuestionIcon></QuestionIcon>
                      </Tooltip>
                    </p>
                  ) : (
                    <p className="error">hability not found</p>
                  )}
                  <div className="type-box">
                    <h4>Types:</h4>
                    {pokemonType?.length !== 0 ? (
                      pokemonType.map((type) => (
                        <div
                          key={type.toString()}
                          className={`type-box-style ${type}`}
                        >
                          {type}
                        </div>
                      ))
                    ) : (
                      <p className="error">types not found</p>
                    )}
                  </div>
                </div>
                <div className="grafica-Radar">
                  <GraficarRadar stats={pokemon}></GraficarRadar>
                </div>
              </div>
              <div className="evolve-box">
                <div className="cadena">
                  {evolveArray?.length !== 0 ? (
                    evolveArray.map((itemchain) => (
                      <div
                        onClick={() => cambiarPokemonDetalle(itemchain.id)}
                        className="evolve-item"
                        meta-key={itemchain.id}
                        key={itemchain.id}
                      >
                        <img src={itemchain.urlimg} alt={itemchain.name}></img>
                      </div>
                    ))
                  ) : (
                    <p className="error">Evolve chain not found</p>
                  )}
                </div>
                {(longDescription && shortDescription)?.length !== 0 ? (
                  <div className="description">
                    <h2 className="shortDescription">{shortDescription}</h2>
                    <div className="scroll-box">
                      <p className="longDescription">{longDescription}</p>
                    </div>
                  </div>
                ) : (
                  <p className="error">pokemon not found</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="error">pokemon not found</p>
        )}
      </div>
    </Fragment>
  );
};

export default PokemonDetalles;
