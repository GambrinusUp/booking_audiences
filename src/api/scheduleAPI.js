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

export const scheduleAPI = {
    getGroupSchedule : getGroupSchedule
}