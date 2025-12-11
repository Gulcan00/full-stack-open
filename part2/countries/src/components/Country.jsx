import axios from 'axios';
import { useEffect, useState } from 'react';

const Country = ({country, showWeather}) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        if (showWeather) {
            axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&APPID=${import.meta.env.VITE_API_KEY}&units=metric`)
            .then(response => setWeather(response.data));
        }
    }, []);

    return (
        <>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital[0]}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>
            {Object.entries(country.languages).map(([key, value]) => <li key={key}>{value}</li>)}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
        {showWeather && weather && (
            <>
                <h2>Weather in {country.capital[0]}</h2>
                <p>Temperature {weather.main.temp} Celsius</p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                <p>Wind {weather.wind.speed} m/s</p>
            </>
        )}
        </>
    )
}

export default Country;