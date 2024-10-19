"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

const PokemonTypeContext = createContext();

export const PokemonTypeProvider = ({ children }) => {
  const [pokemonData, setPokemonData] = useState({
    type: "normal",
    pokemons: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState("normal");
  const [cache, setCache] = useState({});

  const fetchPokemonsByType = useCallback(
    async (type) => {
      if (cache[type]) {
        setPokemonData(cache[type]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const typeUrl = `https://pokeapi.co/api/v2/type/${type}`;
        const response = await fetch(typeUrl);

        if (!response.ok) {
          throw new Error(`Failed to fetch type: ${type}`);
        }

        const data = await response.json();
        const pokemonNames = data.pokemon.map(
          (pokemonEntry) => pokemonEntry.pokemon.name
        );

        const pokemonDetails = await Promise.all(
          pokemonNames.map(async (name) => {
            try {
              const detailResponse = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${name}`
              );

              if (!detailResponse.ok) {
                throw new Error(`Failed to fetch details for ${name}`);
              }

              const detailData = await detailResponse.json();
              return {
                name,
                image: detailData.sprites.front_default,
              };
            } catch (err) {
              console.error(`Error fetching ${name}:`, err);
              return null;
            }
          })
        );

        const validPokemonDetails = pokemonDetails.filter(Boolean);

        const newPokemonData = {
          type,
          pokemons: validPokemonDetails,
        };

        setPokemonData(newPokemonData);
        setCache((prevCache) => ({ ...prevCache, [type]: newPokemonData }));
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    },
    [cache]
  );

  useEffect(() => {
    fetchPokemonsByType(selectedType);
  }, [selectedType, fetchPokemonsByType]);

  const changeType = (type) => setSelectedType(type);

  const contextValue = useMemo(
    () => ({
      pokemonData,
      loading,
      error,
      changeType,
      selectedType,
    }),
    [pokemonData, loading, error, selectedType]
  );

  return (
    <PokemonTypeContext.Provider value={contextValue}>
      {children}
    </PokemonTypeContext.Provider>
  );
};

export const usePokemonType = () => useContext(PokemonTypeContext);
