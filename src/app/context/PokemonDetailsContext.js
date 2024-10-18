"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { fetchPokemonDetails } from "../../utils/api";

const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const [pokemon, setPokemon] = useState(null);

  const getPokemonDetails = useCallback(async (name) => {
    const data = await fetchPokemonDetails(name);
    setPokemon(data);
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemon, getPokemonDetails }}>
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemon() {
  return useContext(PokemonContext);
}
