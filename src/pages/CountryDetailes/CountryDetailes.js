import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./CountryDetailes.css";

 

const CountryDetails = () => {
  const { CountryID } = useParams(); // Get CountryID from URL parameters
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await fetch('https://wafaamohamed474.github.io/host_api/db.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Log the fetched data

        // Attempt to find the country by alpha2Code
        const foundCountry = data.countries.find(country => country.alpha2Code === CountryID);
        console.log('Found country:', foundCountry); // Log the found country

        setCountry(foundCountry);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (CountryID) {
      fetchCountryDetails();
    }
  }, [CountryID]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!country) return <div>Country not found.</div>;

  return (
    <div>
      <div className="CountryDetailes">
        <div className="container">
          <div className="row">
            <div className=" backBtn">
              <Link to={"/"}>
                <FontAwesomeIcon icon={faArrowLeft} />
                <span>Back</span>
              </Link>
            </div>
          </div>
          <div className="row row1">
            <div className="col-lg-5" key={country.id}>
              <div className="countryImage">
                <img src={country.flag} alt={country.name} />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="countryDetailes">
                <h1>{country.name}</h1>
                <div className="row">
                  <div className="col-lg-6 col-md-12 right">
                    <h5>
                      Native Name : <span>{country.nativeName}</span>
                    </h5>
                    <h5>
                      Population : <span>{country.population}</span>
                    </h5>
                    <h5>
                      Region : <span>{country.region}</span>
                    </h5>
                    <h5>
                      Sub Region : <span>{country.subregion}</span>
                    </h5>
                    <h5>
                      Capital : <span>{country.capital}</span>
                    </h5>
                  </div>
                  <div className="col-lg-6 col-md-12 left">
                    <h5>
                      Top Level Domain : <span>{country.topLevelDomain}</span>
                    </h5>
                    <h5>
                      Currencies :{" "}
                      <span>
                        {country.currencies && country.currencies[0].code}
                      </span>
                    </h5>
                    <h5>
                      Languages :{" "}
                      <span>
                        {country.languages &&
                          country.languages.map((e) => e.name)}
                      </span>
                    </h5>
                  </div>
                </div>

                <h5 className="BorderCountries">
                  Border Countries :{" "}
                  <span>
                    {country.borders && country.borders.map((e) => `${e} `)}
                  </span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
