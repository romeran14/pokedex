import React from "react";

var ArrayPokemonResult = [];

export const fetchAllPokemons = async () => {
  const ArrayPokemon = [];

  function PokemonClass(id, nombre, urlimg) {
    this.id = id;
    this.nombre = nombre;
    this.urlimg = urlimg;
  }

  const initList = `https://pokeapi.co/api/v2/pokemon?limit=1300`;
  const result = await fetch(`${initList}`);
  const allPokemonList = await result.json();
  const allPokemonListArray = allPokemonList.results;

  allPokemonListArray.map((item) => {
    const pokeArr = item.url.split("/");
    const id = pokeArr[6];
    const animal = new PokemonClass(
      id,
      item.name,
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    );
    ArrayPokemon.push(animal);
  });
  ArrayPokemonResult = ArrayPokemon;

  return ArrayPokemon;
};
