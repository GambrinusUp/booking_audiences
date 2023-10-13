import {scheduleAPI} from "../api/scheduleAPI";
import {editAPI} from "../api/editAPI";

const GET_SCHEDULE = 'GET_SCHEDULE';
//const GET_AUDIENCES = 'GET_AUDIENCES';
const GET_GROUPS = 'GET_GROUPS';

let initialState = {
    schedule: [],
    /*audiences: [],*/
    groups: []
};

const scheduleReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case GET_SCHEDULE:
            newState.schedule = action.schedule;
            return newState;
        /*case GET_AUDIENCES:
            newState.audiences = action.audiences;
            return newState;*/
        case GET_GROUPS:
            newState.groups = action.groups;
            return newState;
        default:
            return state;
    }
};

export const deleteLessonThunkCreator = (id, token) => (dispatch) => {
    return scheduleAPI.deleteLesson(id, token).then(
        (data) => {
            if(data.status === 204)
                return Promise.resolve();
            return Promise.reject(data.status);
        }
    )
}

export const addLessonThunkCreator = (dayOfWeek, startDate, endDate, timeslot,audienceId, lessonType,
                                      subjectId, professorId, groupIds, token) => (dispatch) => {
    return scheduleAPI.addLesson(dayOfWeek, startDate, endDate, timeslot,audienceId, lessonType,
        subjectId, professorId, groupIds, token).then(
        (data) => {
            if(data.status === 201)
                return Promise.resolve();
            return Promise.reject(data.status);
        }
    )
}

export function getGroupsActionCreator(data) {
    if(data.status === 200)
        return {type: GET_GROUPS, groups: data.groups}
}

export const getGroupsThunkCreator = () => (dispatch) => {
    return scheduleAPI.getGroups().then(
        (data) => {
            dispatch(getGroupsActionCreator(data));
        }
    )
}

export function getScheduleActionCreator(data) {
    console.log(data.schedule);
    if(data.status === 200)
        return {type: GET_SCHEDULE, schedule: data.schedule}
}

/*export function getAudiencesActionCreator(data) {
    if(data.status === 200)
        return {type: GET_AUDIENCES, audiences: data.audiences}
}

export const getAudiencesThunkCreator = () => (dispatch) => {
    return scheduleAPI.getAudiences().then(
        (data) => {
            dispatch(getAudiencesActionCreator(data));
        }
    )
}*/

export const getScheduleThunkCreator = (groupId, dateFrom) => (dispatch) => {
    return scheduleAPI.getWeekSchedule(groupId, dateFrom).then(
        (data) => {
            dispatch(getScheduleActionCreator(data));
        }
    )
}

export default scheduleReducer;
