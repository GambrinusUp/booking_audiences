import axios, {get} from "axios";

const API_URL = 'http://26.254.104.23:8081/api/';

function getRequests(token) {
    return axios.get(API_URL + 'booking/moderation-list', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
        console.log(response);
        return {status: response.status, requests: response.data};
        })
        .catch((error) => {
            console.log(error);
            return {status: error.response.status};
        })
}

function addBook(date, timeslot, audience, groups, description, token) {
    return axios.post(API_URL + 'booking', {
        "date": date + "T05:16:04.514Z",
        "timeslot": timeslot,
        "audienceId": audience,
        "groupIds": groups,
        "description": description
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return {status: response.status};
        })
        .catch((error) => {
            console.log(error);
            return {status: error.response.status};
        })
}

function approveBook(id, token) {
    return axios.patch(API_URL + 'booking/' + id + '/moderation/approve', null, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return {status: response.status};
        })
        .catch((error) => {
            console.log(error);
            return {status: error.response.status};
        })
}

function rejectBook(id, token) {
    return axios.patch(API_URL + 'booking/' + id + '/moderation/reject', null, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return {status: response.status};
        })
        .catch((error) => {
            console.log(error);
            return {status: error.response.status};
        })
}

export const bookingAPI = {
    approveBook : approveBook,
    rejectBook : rejectBook,
    addBook : addBook,
    getRequests : getRequests
}