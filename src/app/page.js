"use client";
import { useState, useEffect, useRef } from "react";
import SearchForm from "../app/components/SearchForm";
import SelectBox from "./components/SelectBox";
import PokemonCard from "../app/components/PokemonCard";
import { usePokemonType } from "../app/context/PokemonsByTypeContext";
import Loading from "../app/components/Loading";
import MoreData from "./components/MoreData";
import Breadcrumb from "./components/Breadcrumb";
import useDebounce from "../app/hooks/useDebounce";

export default function Home() {
  const { pokemonData, loading, error } = usePokemonType();
  const [visibleCount, setVisibleCount] = useState(20);
  const loaderRef = useRef(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredPokemons = pokemonData.pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  const loadMore = () => {
    if (!isLoadingMore && visibleCount < filteredPokemons.length) {
      console.log("Loading more Pokémon...");
      setIsLoadingMore(true);
      setTimeout(() => {
        setVisibleCount((prevCount) => {
          const newCount = prevCount + 20;
          console.log("New visible count:", newCount);
          return newCount;
        });
        setIsLoadingMore(false);
      }, 1000);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log("Entry:", entry);
        if (entry.isIntersecting && !isLoadingMore) {
          console.log("Loader is intersecting");
          loadMore();
        }
      });
    });

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
      console.log("Observer is set up");
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
        console.log("Observer is cleaned up");
      }
    };
  }, [isLoadingMore, filteredPokemons.length]);

  useEffect(() => {
    setVisibleCount(20);
  }, [searchTerm]);

  if (!pokemonData || !Array.isArray(pokemonData.pokemons)) {
    return <span>No Pokemon available</span>;
  }

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  console.log("Total Pokémon:", filteredPokemons.length);
  console.log("Visible Count:", visibleCount);
  console.log("Is Loading More:", isLoadingMore);

  return (
    <div>
      <SelectBox />
      <SearchForm setSearchTerm={setSearchTerm} />
      <Breadcrumb />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredPokemons.slice(0, visibleCount).map((item, index) => (
          <PokemonCard key={index} name={item.name} image={item.image} />
        ))}

        {visibleCount < filteredPokemons.length && (
          <div
            ref={loaderRef}
            className="loader"
            style={{ height: "20px", textAlign: "center", marginTop: "20px" }}
          >
            {isLoadingMore ? <MoreData /> : <span>Loading more...</span>}
          </div>
        )}
      </div>
    </div>
  );
}
