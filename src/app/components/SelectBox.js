import React, { useEffect, useState } from "react";
import { fetchPokemonTypes } from "../../utils/api";
import { usePokemonType } from "../context/PokemonsByTypeContext";

function SelectBox() {
  const { changeType, selectedType } = usePokemonType();
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const getTypes = async () => {
      const data = await fetchPokemonTypes();
      setTypes(data.filter((item) => item.name.toLowerCase() !== "normal"));
    };
    getTypes();
  }, []);

  const handleChange = (e) => {
    const newType = e.target.value;
    if (newType) {
      changeType(newType);
    }
  };

  return (
    <form className="max-w-sm mx-auto md:ml-6 mt-6 mb-[-10px] p-4">
      <select
        id="types"
        value={selectedType}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">Select Pokémon Type</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
    </form>
  );
}

export default SelectBox;
