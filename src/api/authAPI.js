import axios from "axios";

const API_URL = 'http://26.254.104.23:8081/api/auth/';

function registration(email, password, username) {
    return axios.post(API_URL + 'register', {
        "email": email,
        "password": password,
        "username": username
    })
        .then((response) => {
            console.log(response);
            return {status: response.status, tokens: response.data};
        })
        .catch((error) => {
            return {status: error.status};
        })
}

function login(email, password) {
    return axios.post(API_URL + 'login', {
        "email": email,
        "password": password
    })
        .then((response) => {
            console.log(response);
            return {status: response.status, tokens: response.data};
        })
        .catch((error) => {
            console.log(error);
            return {status: error.status};
        })
}

export const authAPI = {
    registration : registration,
    login : login
}