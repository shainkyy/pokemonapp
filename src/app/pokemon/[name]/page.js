"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePokemon } from "../../context/PokemonDetailsContext";
import Loading from "@/app/components/Loading";
import Breadcrumb from "@/app/components/Breadcrumb";

export default function PokemonDetail({ params }) {
  const { name } = params;

  const { pokemon, getPokemonDetails } = usePokemon();
  useEffect(() => {
    if (name) {
      getPokemonDetails(name);
    }
  }, [name, getPokemonDetails]);

  if (!pokemon) return <Loading />;

  if (!pokemon || !Array.isArray(pokemon.abilities)) {
    return <span>No abilities available</span>;
  }

  const abilities = pokemon.abilities.map((item, index) => (
    <span key={index}>{item.ability.name}, </span>
  ));

  if (!pokemon || !Array.isArray(pokemon.stats)) {
    return <span>No Stats available</span>;
  }

  const stats = pokemon.stats.map((item, index) => (
    <span key={index}>{item.stat.name}, </span>
  ));

  if (!pokemon || !Array.isArray(pokemon.types)) {
    return <span>No Types available</span>;
  }

  const types = pokemon.types.map((item, index) => (
    <span key={index}>{item.type.name}, </span>
  ));

  if (!pokemon || !Array.isArray(pokemon.moves)) {
    return <span>No Moves available</span>;
  }

  const moves = pokemon.moves.slice(0, 5).map((item, index) => (
    <span key={index}>
      {item.move.name}
      {index < 4 ? ", " : ""}
    </span>
  ));

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-200 antialiased">
        <div className="flex items-start justify-start p-4">
          <h1 className="cursor-pointer flex text-teal-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-arrow-left"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <Link href={`/`}>
              <strong>&nbsp;Back</strong>
            </Link>
          </h1>
        </div>
        <Breadcrumb name={name} />
        <div className="flex items-center justify-center flex-grow">
          <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
            <div className="w-full bg-teal-300 shadow-xl rounded-lg overflow-hidden">
              <div className="flex justify-center">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={60}
                  height={60}
                  priority
                  quality={100}
                  className="img-size"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="flex flex-col p-6 border-t border-[#FDC666] bg-[#FDC666]">
                <div className="flex-1 inline-flex items-center mb-3">
                  <p className="text-xs">
                    <strong>Name:</strong> {name}
                  </p>
                </div>
                <div className="flex-1 inline-flex items-center mb-3">
                  <p className="text-xs">
                    <strong>Type: </strong> {types}
                  </p>
                </div>
                <div className="flex-1 inline-flex items-center mb-3">
                  <p className="text-xs">
                    <strong>Stats: </strong> {stats}
                  </p>
                </div>
                <div className="flex-1 inline-flex items-center mb-3">
                  <p className="text-xs">
                    <strong>Abilities: </strong> {abilities}
                  </p>
                </div>
                <div className="flex-1 inline-flex items-center">
                  <p className="text-xs">
                    <strong>Some Moves: </strong> {moves}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
