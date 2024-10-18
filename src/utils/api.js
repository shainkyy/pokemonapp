export const fetchPokemonTypes = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/type");
  const data = await res.json();
  return data.results;
};

export const fetchPokemonsByType = async (type) => {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const data = await res.json();
  return data.pokemon;
};

export const fetchPokemonDetails = async (name) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await res.json();
  return data;
};

//calling only for normal type
// async function fetchNormalTypePokemon() {
//   try {
//     const typeUrl = "https://pokeapi.co/api/v2/type/normal";
//     const pokemonResponse = await fetch(typeUrl);
//     const pokemonData = await pokemonResponse.json();
//     const results = {
//       type: "normal",
//       pokemons: [],
//     };
//     for (const pokemonEntry of pokemonData.pokemon) {
//       const pokemonName = pokemonEntry.pokemon.name;

//       try {
//         const detailResponse = await fetch(
//           `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
//         );

//         if (!detailResponse.ok) {
//           console.warn(`Skipping ${pokemonName}: Not found (404)`);
//           continue;
//         }
//         const detailData = await detailResponse.json();
//         results.pokemons.push({
//           name: pokemonName,
//           image: detailData.sprites.front_default,
//         });
//       } catch (error) {
//         console.error(`Error fetching data for ${pokemonName}:`, error);
//       }
//     }
//     console.log(JSON.stringify(results, null, 2));
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }
// fetchNormalTypePokemon();

//dynamic type
// async function fetchAllPokemonData() {
//   try {

//     const typesResponse = await fetch("https://pokeapi.co/api/v2/type");
//     const typesData = await typesResponse.json();
//     const results = [];
//     for (const type of typesData.results) {
//       const typeName = type.name;
//       const typeUrl = type.url;
//       console.log("typeee", typeName);
//       console.log("typeeeullll", typeUrl);
//       const pokemonResponse = await fetch(typeUrl);
//       const pokemonData = await pokemonResponse.json();
//       const pokemons = [];
//       for (const pokemonEntry of pokemonData.pokemon) {
//         const pokemonName = pokemonEntry.pokemon.name;
//         console.log("pokemonNameeeeeeeeeeeee", pokemonName);
//         try {
//           const detailResponse = await fetch(
//             `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
//           );
//           if (!detailResponse.ok) {
//             console.warn(`Skipping ${pokemonName}: Not found (404)`);
//             continue;
//           }
//           const detailData = await detailResponse.json();
//           pokemons.push({
//             name: pokemonEntry.pokemon.name,
//             image: detailData.sprites.front_default,
//           });
//         } catch (error) {
//           console.error(`Error fetching data for ${pokemonName}:`, error);
//         }
//       }//       results.push({
//         type: typeName,
//         pokemons: pokemons,
//       });
//     }
//     console.log(JSON.stringify(results, null, 2));
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

// fetchAllPokemonData();
