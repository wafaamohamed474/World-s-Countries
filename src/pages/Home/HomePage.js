import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../Home/HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [searchItem, setSerchItem] = useState("");
  const [region, setRegion] = useState("");
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  useEffect(() => {
    const fetchCountries = () => {
      fetch("https://wafaamohamed474.github.io/host_api/db.json")
        .then((res) => res.json())
        .then((data) => {
          let filteredResults = data.countries;
          if (searchItem) {
            filteredResults = filteredResults.filter((country) =>
              country.name.toLowerCase().startsWith(searchItem.toLowerCase())
            );
          }

          if (region) {
            filteredResults = filteredResults.filter(
              (country) => country.region === region
            );
          }
          setResults(filteredResults);
          setCurrentPage(1);
        });
    };
    fetchCountries();
  }, [searchItem, region]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(results.length / itemsPerPage);

  return (
    <div className="products">
      <div className="container">
        <row className="row1">
          <div className="search">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon" />
            <input
              type="text"
              placeholder="Search for button country..."
              value={searchItem}
              onChange={(e) => setSerchItem(e.target.value)}
            />
          </div>
          <div className="filter">
            <select value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="">Filter By Region</option>
              <option value="Africa">Africa</option>
              <option value="Americas">America</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
        </row>
        <div className="row2 row">
          {currentItems.map((e) => (
            <div key={e.alpha2Code} className="col-lg-3 col-md-4 mb-5">
              <div className="card w-100 h-100" id="card">
                <div className="image-card h-50">
                  <img
                    src={e.flags.png}
                    alt={e.name + " Image"}
                    className="h-100"
                  />
                </div>
                <div className="card-body h-50">
                  <h6 className="text-sm py-1">{e.name}</h6>
                  <p>
                    <span>Population : </span>
                    {e.population}
                  </p>
                  <p>
                    <span>Region : </span>
                    {e.region}
                  </p>
                  <p>
                    <span>Capital : </span>
                    {e.capital}
                  </p>

                  <Link to={`/country/${e.alpha2Code}`}>Quick look</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row3 d-flex justify-content-center">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <button
                  class="page-link"
                  aria-label="Previous"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  <span aria-hidden="true">&laquo;</span>
                  <span class="sr-only">Previous</span>
                </button>
              </li>
              <li class="page-item">
                <button
                  class="page-link"
                  value={currentPage}
                  onClick={(e) => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  {currentPage - 1}
                </button>
              </li>
              <li class="page-item active">
                <button class="page-link" value={currentPage}>
                  {currentPage}
                </button>
              </li>
              <li class="page-item">
                <button
                  class="page-link"
                  value={currentPage}
                  onClick={(e) => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  {currentPage + 1}
                </button>
              </li>
              <li class="page-item">
                <button
                  class="page-link"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                  <span class="sr-only">Next</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
