import axios from "axios";

const URL = '/api/persons';

const getAll = () => {
    return axios
    .get(URL)
    .then(response => response.data);
};

const create = (newPhone) => {
    return axios
        .post(URL, newPhone)
        .then(response => response.data)
        .catch(err => {
            const msg = err.response.data.error;
            console.log(msg);
            throw new Error(msg);
        });
};

const update = (id, data) => {
    return axios
        .put(`${URL}/${id}`, data)
        .then(response => response.data);
};

const deletePhone = (id) => {
    return axios
    .delete(`${URL}/${id}`);
}

export {
    getAll,
    create,
    deletePhone,
    update
}