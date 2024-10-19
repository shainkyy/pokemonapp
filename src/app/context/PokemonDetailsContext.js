"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { fetchPokemonDetails } from "../../utils/api";

const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const [pokemon, setPokemon] = useState(null);
  const [cache, setCache] = useState({});

  const getPokemonDetails = useCallback(
    async (name) => {
      if (cache[name]) {
        setPokemon(cache[name]);
        return;
      }

      try {
        const data = await fetchPokemonDetails(name);

        if (data) {
          setCache((prevCache) => ({
            ...prevCache,
            [name]: data,
          }));
          setPokemon(data);
        }
      } catch (error) {
        console.error(`Error fetching details for ${name}:`, error);
      }
    },
    [cache]
  );
  const contextValue = useMemo(
    () => ({
      pokemon,
      getPokemonDetails,
    }),
    [pokemon, getPokemonDetails]
  );

  return (
    <PokemonContext.Provider value={contextValue}>
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemon() {
  return useContext(PokemonContext);
}
