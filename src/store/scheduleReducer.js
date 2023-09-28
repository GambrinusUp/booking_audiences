import {scheduleAPI} from "../api/scheduleAPI";

const GET_SCHEDULE = 'GET_SCHEDULE';

let initialState = {
    schedule: []
};

const scheduleReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case GET_SCHEDULE:
            newState.schedule = action.schedule;
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

export const getScheduleThunkCreator = (groupId, dateFrom, dateTo) => (dispatch) => {
    return scheduleAPI.getGroupSchedule(groupId, dateFrom, dateTo).then(
        (data) => {
            dispatch(getScheduleActionCreator(data));
        }
    )
}

export default scheduleReducer;
