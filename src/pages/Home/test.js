import React, { useEffect, useState } from 'react';

const CountrySearch = () => {
  const [searchItem, setSearchItem] = useState(""); // State for search input
  const [region, setRegion] = useState(""); // State for selected region
  const [results, setResults] = useState([]); // State for search results

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://wafaamohamed474.github.io/host_api/db.json");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data.countries); // Log countries for debugging

        // Start with all countries
        let filteredResults = data.countries;

        // Filter by searchItem
        if (searchItem) {
          filteredResults = filteredResults.filter((country) =>
            country.name.toLowerCase().startsWith(searchItem.toLowerCase())
          );
        }

        // Filter by region
        if (region) {
          filteredResults = filteredResults.filter(
            (country) => country.region === region
          );
        }

        setResults(filteredResults); // Update state with filtered results
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, [searchItem, region]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)} // Update searchItem on input change
      />
      <select value={region} onChange={(e) => setRegion(e.target.value)}>
        <option value="">Select Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
      <ul>
        {results.map((country) => (
          <li key={country.alpha2Code}>
            {country.name} - {country.region}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountrySearch;
