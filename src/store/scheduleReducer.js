import {scheduleAPI} from "../api/scheduleAPI";

const GET_SCHEDULE = 'GET_SCHEDULE';
const GET_AUDIENCES = 'GET_AUDIENCES';

let initialState = {
    schedule: [],
    audiences: []
};

const scheduleReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case GET_SCHEDULE:
            newState.schedule = action.schedule;
            return newState;
        case GET_AUDIENCES:
            newState.audiences = action.audiences;
            return newState;
        default:
            return state;
    }
};

export function getScheduleActionCreator(data) {
    console.log(data.schedule);
    if(data.status === 200)
        return {type: GET_SCHEDULE, schedule: data.schedule}
}

export function getAudiencesActionCreator(data) {
    if(data.status === 200)
        return {type: GET_AUDIENCES, audiences: data.audiences}
}

export const getAudiencesThunkCreator = () => (dispatch) => {
    return scheduleAPI.getAudiences().then(
        (data) => {
            dispatch(getAudiencesActionCreator(data));
        }
    )
}

export const getScheduleThunkCreator = (groupId, dateFrom, dateTo) => (dispatch) => {
    return scheduleAPI.getGroupSchedule(groupId, dateFrom, dateTo).then(
        (data) => {
            dispatch(getScheduleActionCreator(data));
        }
    )
}

export default scheduleReducer;
