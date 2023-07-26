import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon.js";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(initialURL);
      loadPolemon(res.results);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPolemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecode = getPokemon(pokemon.url);
        return pokemonRecode;
      })
    );
    setPokemonData(_pokemonData);
  };

  console.log(pokemonData);

  return (
    <div className="App">
      {loading ? (
        <h1>ロードしています・・・</h1>
      ) : (
        <h1>データを取得しました</h1>
      )}
    </div>
  );
}

export default App;
