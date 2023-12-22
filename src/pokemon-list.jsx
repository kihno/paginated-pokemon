// You can retrieve the pokemons by calling the following API
// Make sure to replace limit and offset with the appropriate values
// https://pokeapi.co/api/v2/pokemon?limit=5&offset=0

import axios from "axios";
import { useState, useEffect } from "react";

const PokemonList = () => {
  const [pokemons, setPokemon] = useState([]);
  const [count, setCount] = useState(null);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=5&offset=0')
      .then((response) => {
        setPokemon(response.data.results);
        setCount(response.data.count);
      });
  }, []);

  const handleLoadMore = (e) => {
    e.preventDefault();
    const offset = pokemons.length;

    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=${offset}`)
      .then((response) => {
        setPokemon(prevList => [...prevList, ...response.data.results]);
      });
  }

  return (
    <div>
      <ul>
        {pokemons.map(pokemon => (
          <li key={pokemon.name}>
            {pokemon.name}
          </li>
        ))}
      </ul>
      <div>Displaying {pokemons.length} of {count} results </div>
      {pokemons.length !== count && <button onClick={handleLoadMore}>Load more</button>}
    </div>
  )
};

export default PokemonList;
