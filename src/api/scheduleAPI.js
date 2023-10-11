import axios from "axios";

const API_URL = 'https://test.intime.kreosoft.space/api/web/v2/schedule/';

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

export const scheduleAPI = {
    getGroupSchedule : getGroupSchedule,
    getAudiences : getAudiences
}