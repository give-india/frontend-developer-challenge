import React, { useState } from 'react';

function Searchbar(props) {
  const [term, setTerm] = useState('');

  const handleInputChange = e => {
    setTerm(e.target.value);
    props.onSearchTermChange(term);
  };

  return (
    <div className="search-bar">
      <input
        style={{ width: '55%' }}
        onChange={handleInputChange}
        value={term}
        placeholder="Search"
      />
    </div>
  );
}

export default Searchbar;
