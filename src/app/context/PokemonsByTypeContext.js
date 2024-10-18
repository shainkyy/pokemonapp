"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const PokemonTypeContext = createContext();

export const PokemonTypeProvider = ({ children }) => {
  const [pokemonData, setPokemonData] = useState({
    type: "normal",
    pokemons: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState("normal");

  useEffect(() => {
    const fetchPokemonsByType = async (type) => {
      setLoading(true);
      try {
        const typeUrl = `https://pokeapi.co/api/v2/type/${type}`;
        const response = await fetch(typeUrl);
        const data = await response.json();

        const results = { type, pokemons: [] };

        for (const pokemonEntry of data.pokemon) {
          const pokemonName = pokemonEntry.pokemon.name;

          const detailResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
          );

          if (!detailResponse.ok) {
            continue;
          }

          const detailData = await detailResponse.json();
          results.pokemons.push({
            name: pokemonName,
            image: detailData.sprites.front_default,
          });
        }

        setPokemonData(results);
      } catch (err) {
        setError(err);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonsByType(selectedType);
  }, [selectedType]);

  const changeType = (type) => {
    setSelectedType(type);
  };

  return (
    <PokemonTypeContext.Provider
      value={{ pokemonData, loading, error, changeType, selectedType }}
    >
      {children}
    </PokemonTypeContext.Provider>
  );
};

export const usePokemonType = () => {
  return useContext(PokemonTypeContext);
};
