"use client";
import { useState, useEffect, useRef } from "react";
import SearchForm from "../app/components/SearchForm";
import SelectBox from "./components/SelectBox";
import PokemonCard from "../app/components/PokemonCard";
import { usePokemonType } from "../app/context/PokemonsByTypeContext";
import Loading from "../app/components/Loading";
import MoreData from "./components/MoreData";
import Breadcrumb from "./components/Breadcrumb";

export default function Home() {
  const { pokemonData, loading, error } = usePokemonType();
  const [visibleCount, setVisibleCount] = useState(20);
  const loaderRef = useRef(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const loadMore = () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setVisibleCount((prevCount) => prevCount + 20);
        setIsLoadingMore(false);
      }, 1000);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoadingMore) {
        loadMore();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [isLoadingMore]);

  useEffect(() => {
    setVisibleCount(20);
  }, [searchTerm]);

  if (!pokemonData || !Array.isArray(pokemonData.pokemons)) {
    return <span>No Pokemon available</span>;
  }

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  const filteredPokemons = pokemonData.pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div ref={loaderRef} className="loader">
            {isLoadingMore && <MoreData />}
          </div>
        )}
      </div>
    </div>
  );
}
