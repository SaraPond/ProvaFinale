import React, { useState } from 'react';

type SearchBarProps = {
  onSearch: (searchTerm: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.length >= 3) {
      onSearch(value);
    } else if (value.length === 0) {
      onSearch('');
    }
  };

  return <input type="text" placeholder="Cerca per nome" value={searchTerm} onChange={handleChange} />;
};

export default SearchBar;
