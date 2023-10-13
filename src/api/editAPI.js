import axios from "axios";

const API_URL = 'http://26.254.104.23:8081/api/';

function getProfessors() {
    return axios.get(API_URL + 'professors')
        .then((response) => {
            console.log(response);
            return {status: response.status, professors: response.data};
        })
        .catch((error) => {
            console.log(error);
            return {status: error.status};
        })
}

function addProfessor(fullName, shortName, token) {
    return axios.post(API_URL + 'professors', {
        "fullName": fullName,
        "shortName": shortName
    },{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return {status: response.status, professors: response.data};
        })
        .catch((error) => {
            console.log(error);
            return {status: error.response.status};
        })
}

function editProfessor(id, fullName, shortName, token) {
    return axios.put(API_URL + 'professors/' + id, {
        "fullName": fullName,
        "shortName": shortName
    },{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return {status: response.status, professors: response.data};
        })
        .catch((error) => {
            console.log(error);
            return {status: error.response.status};
        })
}

function deleteProfessor(id, token) {
    return axios.delete(API_URL + 'professors/' + id, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return {status: response.status, professors: response.data};
        })
        .catch((error) => {
            console.log(error);
            return {status: error.response.status};
        })
}

function getSubjects() {
    return axios.get(API_URL + 'subjects')
        .then((response) => {
            console.log(response);
            return {status: response.status, subjects: response.data};
        })
        .catch((error) => {
            console.log(error);
            return {status: error.status};
        })
}

function addSubject(name, token) {
    return axios.post(API_URL + 'subjects', {
        "name": name
    },{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return {status: response.status, subjects: response.data};
        })
        .catch((error) => {
            console.log(error);
            return {status: error.response.status};
        })
}

function editSubject(id, name, token) {
    return axios.put(API_URL + 'subjects/' + id, {
        "name": name
    },{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return {status: response.status, subjects: response.data};
        })
        .catch((error) => {
            console.log(error);
            return {status: error.response.status};
        })
}

function deleteSubject(id, token) {
    return axios.delete(API_URL + 'subjects/' + id, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return {status: response.status, subjects: response.data};
        })
        .catch((error) => {
            console.log(error);
            return {status: error.response.status};
        })
}

function getAudiences1() {
    return axios.get(API_URL + 'audiences')
        .then((response) => {
            console.log(response);
            return {status: response.status, audiences: response.data};
        })
        .catch((error) => {
            console.log(error);
            return {status: error.status};
        })
}

function addAudience(name, token) {
    return axios.post(API_URL + 'audiences', {
        "name": name
    },{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return {status: response.status, audiences: response.data};
        })
        .catch((error) => {
            console.log(error);
            return {status: error.response.status};
        })
}

function editAudience(id, name, token) {
    return axios.put(API_URL + 'audiences/' + id, {
        "name": name
    },{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return {status: response.status, audiences: response.data};
        })
        .catch((error) => {
            console.log(error);
            return {status: error.response.status};
        })
}

function deleteAudience(id, token) {
    return axios.delete(API_URL + 'audiences/' + id, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return {status: response.status, audiences: response.data};
        })
        .catch((error) => {
            console.log(error);
            return {status: error.response.status};
        })
}

function addGroup(name, token) {
    return axios.post(API_URL + 'groups', {
        "name": name
    },{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return {status: response.status, groups: response.data};
        })
        .catch((error) => {
            console.log(error);
            return {status: error.response.status};
        })
}

function editGroup(id, name, token) {
    return axios.put(API_URL + 'groups/' + id, {
        "name": name
    },{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return {status: response.status, groups: response.data};
        })
        .catch((error) => {
            console.log(error);
            return {status: error.response.status};
        })
}

function deleteGroup(id, token) {
    return axios.delete(API_URL + 'groups/' + id, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return {status: response.status, groups: response.data};
        })
        .catch((error) => {
            console.log(error);
            return {status: error.response.status};
        })
}

export const editAPI = {
    deleteGroup : deleteGroup,
    editGroup : editGroup,
    addGroup : addGroup,
    deleteAudience : deleteAudience,
    editAudience : editAudience,
    addAudience : addAudience,
    getAudiences1 : getAudiences1,
    deleteSubject : deleteSubject,
    editSubject : editSubject,
    addSubject : addSubject,
    getSubjects : getSubjects,
    getProfessors : getProfessors,
    addProfessor : addProfessor,
    editProfessor : editProfessor,
    deleteProfessor : deleteProfessor
}