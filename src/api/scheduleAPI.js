import axios, {get} from "axios";

const API_URL = 'https://test.intime.kreosoft.space/api/web/v2/schedule/';

const APIURL = 'http://26.254.104.23:8081/';

function getGroups() {
    return axios.get(APIURL + 'api/groups')
        .then((response) => {
            console.log(response);
            return {status: response.status, groups: response.data};
        })
        .catch((error) => {
            console.log(error);
            return {status: error.status};
        })
}

function getWeekSchedule(groupId, dateFrom) {
    return axios.get(APIURL + 'lessons/search/Group?day=' + dateFrom + '&filterItemId='
        + groupId + '&getWeek=true&withBreaks=false')
        .then((response) => {
            console.log(response);
            return {status: response.status, schedule: response.data};
        })
        .catch((error) => {
            return {status: error.status};
        })
}

function getGroupSchedule(groupId, dateFrom, dateTo) {
    return axios.get(API_URL + 'week?groupIds=' + groupId +
    '&dateFrom=' + dateFrom + '&dateTo=' + dateTo)
        .then((response) => {
            return {status: response.status, schedule: response.data};
        })
        .catch((error) => {
            return {status: error.status};
        })
}

function getAudiences() {
    return axios.get('https://test.intime.kreosoft.space/api/web/v1/buildings/' +
        '4761a634-bffd-11ea-8117-005056bc52bb/audiences')
        .then((response) => {
            console.log(response);
            return {status: response.status, audiences: response.data};
        })
        .catch((error) => {
            console.log(error);
            return {status: error.status};
        })
}

function addLesson(dayOfWeek, startDate, endDate, timeslot,audienceId, lessonType, subjectId, professorId, groupIds, token) {
    return axios.post(APIURL + "lessons", {
        "dayOfWeek": dayOfWeek,
        "startDate": startDate + "T19:43:52.500Z",
        "endDate": endDate + "T19:43:52.500Z",
        "timeslot": parseInt(timeslot),
        "audienceId": audienceId,
        "lessonType": lessonType,
        "subjectId": subjectId,
        "professorId": professorId,
        "groupIds": groupIds
    },{
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
            return {status: error.response.status, errors: [error.response.data.message]};
        })
}

function deleteLesson(id, token) {
    return axios.delete(APIURL + "lessons/" + id, {
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
            return {status: error.response.status, errors: [error.response.data.message]};
        })
}

export const scheduleAPI = {
    deleteLesson : deleteLesson,
    addLesson : addLesson,
    getWeekSchedule : getWeekSchedule,
    getGroups : getGroups,
    getGroupSchedule : getGroupSchedule,
    //getAudiences : getAudiences
}