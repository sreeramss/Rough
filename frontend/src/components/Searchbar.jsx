import React from 'react';
import { IoSearch } from "react-icons/io5";

const Searchbar = ({ onInputChange }) => {
  return (
    <div className="relative z-20 top-14 lg:top-5 sm:mt-4 flex p-4 lg:ml-24">
      <IoSearch className="h-6 w-6" />
      <div className="outline-none border-none">
        <input
          type="text"
          placeholder="Search for Movies or TV series"
          className="bg-transparent ml-4 outline-none text-sm w-full border-none"
          onChange={onInputChange}
        />
      </div>
    </div>
  );
};

export default Searchbar;

