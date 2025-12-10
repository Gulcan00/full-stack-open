import axios from 'axios';

const URL = 'https://studies.cs.helsinki.fi/restcountries/api';


const getAll = () => {
    return axios
            .get(`${URL}/all`)
            .then(response => response.data);
}

const getByName = (name) => {
    return axios
            .get(`${URL}/name/${name}`)
            .then(response => response.data);
}

export {
    getAll,
    getByName
}