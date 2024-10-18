import React from "react";

function SearchForm({ setSearchTerm }) {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form className="max-w-xl mx-auto md:ml-6 p-4 mt-3 md:mt-0 mb-[-10px]">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          placeholder="Search Pokemon by name..."
          onChange={handleSearchChange}
          required
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-black border border-gray-200 rounded-lg bg-white"
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-[#004368] hover:bg-[#004368] focus:ring-4 focus:outline-none focus:ring-[#004368] font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
