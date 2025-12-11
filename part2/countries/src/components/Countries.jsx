import { useEffect } from "react";
import { useState } from "react"
import { getAll } from "../services/countries";
import Country from "./Country";

const Countries = ({search}) => {
    const [countries, setCountries] = useState([]);
    const [displayedCountries, setDisplayedCountries] = useState(new Set());

    const handleShowCountry = (countryId) => {
        const displayedCountriesSet = new Set(displayedCountries);
        if (displayedCountriesSet.has(countryId)) {
            displayedCountriesSet.delete(countryId);
        } else {
            displayedCountriesSet.add(countryId);
        }
        setDisplayedCountries(displayedCountriesSet);
    }

    useEffect(() => {
        getAll()
        .then(data => setCountries(data));
    }, []);

    const filteredCountries = countries.filter(country => country.name.common.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

    return (
        <div>
            {
                filteredCountries.length > 0 && (
                filteredCountries.length > 10 ? <p>Too many matches specify another filter</p> :
                  filteredCountries.length > 1 ? 
                  <ul>
                    {
                        filteredCountries.map(country => {
                        return (
                        <li key={country.cca3}>
                            {country.name.common} 
                            <button onClick={() => handleShowCountry(country.cca3)}>{displayedCountries.has(country.cca3) ? 'Hide': 'Show'}</button>
                            { (displayedCountries.has(country.cca3)) ? <Country country={country}/> : ''}
                        </li>
                        )
                        })
                    }
                </ul> :
                <Country country={filteredCountries[0]} showWeather={true}/>
                )
            }
        </div>
    )
}

export default Countries;