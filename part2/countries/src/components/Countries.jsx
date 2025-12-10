import { useEffect } from "react";
import { useState } from "react"
import { getAll } from "../services/countries";
import Country from "./Country";

const Countries = ({search}) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        getAll()
        .then(data => setCountries(data));
    }, []);

    const filteredCountries = countries.filter(country => country.name.common.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

    return (
        <div>
            {
                filteredCountries.length > 10 ? <p>Too many matches specify another filter</p> :
                filteredCountries.length > 1 ? <ul>{filteredCountries.map(country => <li key={country.cca3}>{country.name.common}</li>)}</ul> :
                <Country country={filteredCountries[0]} />
            }
        </div>
    )
}

export default Countries;