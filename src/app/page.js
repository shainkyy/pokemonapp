"use client";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { usePokemonType } from "../app/context/PokemonsByTypeContext";
import useDebounce from "../app/hooks/useDebounce";
const SearchForm = dynamic(() => import("../app/components/SearchForm"), {
  ssr: false,
});
const SelectBox = dynamic(() => import("./components/SelectBox"));
const PokemonCard = dynamic(() => import("../app/components/PokemonCard"));
const Breadcrumb = dynamic(() => import("./components/Breadcrumb"));
const MoreData = dynamic(() => import("./components/MoreData"));
const Loading = dynamic(() => import("../app/components/Loading"));

export default function Home() {
  const { pokemonData, loading, error } = usePokemonType();
  const [visibleCount, setVisibleCount] = useState(20);
  const loaderRef = useRef(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredPokemons = useMemo(() => {
    if (!pokemonData?.pokemons) return [];
    return pokemonData.pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [pokemonData?.pokemons, debouncedSearchTerm]);

  const loadMore = useCallback(() => {
    if (!isLoadingMore && visibleCount < filteredPokemons.length) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setVisibleCount((prevCount) =>
          Math.min(prevCount + 20, filteredPokemons.length)
        );
        setIsLoadingMore(false);
      }, 1000);
    }
  }, [isLoadingMore, visibleCount, filteredPokemons.length]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isLoadingMore) {
          loadMore();
        }
      });
    });

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [isLoadingMore, loadMore]);

  useEffect(() => {
    setVisibleCount(20);
  }, [searchTerm]);

  if (!pokemonData || !Array.isArray(pokemonData.pokemons)) {
    return <span>No Pokémon available</span>;
  }

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

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
            {isLoadingMore ? <MoreData /> : null}
          </div>
        )}
      </div>
    </div>
  );
}
