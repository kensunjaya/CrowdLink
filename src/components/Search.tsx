import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    // Handle search action here
    console.log('Searching for:', query);
  };

  return (
    <div className="flex items-center border rounded-full p-2 bg-gray-200 max-w-md w-full">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        className="flex-1 px-3 py-1 outline-none bg-transparent text-sm"
      />
      <CiSearch
        onClick={handleSearch}
        className="text-gray-500 cursor-pointer ml-2 text-lg"
      />
    </div>
  );
};

export default Search;
