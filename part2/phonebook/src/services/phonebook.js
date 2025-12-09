import axios from "axios";

const URL = 'http://localhost:3001/persons';

const getAll = () => {
    return axios
    .get(URL)
    .then(response => response.data);
};

const create = (newPhone) => {
    return axios
        .post(URL, newPhone)
        .then(response => response.data);
};

export {
    getAll,
    create
}