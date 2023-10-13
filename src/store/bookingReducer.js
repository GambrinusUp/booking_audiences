import {editAPI} from "../api/editAPI";
import booking from "../pages/booking_page/Booking";
import {bookingAPI} from "../api/bookingAPI";

const GET_REQUEST = 'GET_REQUEST';

let initialState = {
    bookingRequests: []
}

const bookingReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case GET_REQUEST:
            newState.bookingRequests = action.bookingRequests;
            return newState;
        default:
            return state;
    }
};

export const rejectBookThunkCreator = (id, token) => (dispatch) => {
    return bookingAPI.approveBook(id, token).then(
        (data) => {
            console.log(data.status);
            if(data.status === 200)
                return Promise.resolve();
            return Promise.reject(data.status);
        }
    )
}

export const approveBookThunkCreator = (id, token) => (dispatch) => {
    return bookingAPI.approveBook(id, token).then(
        (data) => {
            console.log(data.status);
            if(data.status === 200)
                return Promise.resolve();
            return Promise.reject(data.status);
        }
    )
}

export const addBookThunkCreator = (date, timeslot, audience, groups, description, token) => (dispatch) => {
    return bookingAPI.addBook(date, timeslot, audience, groups, description, token).then(
        (data) => {
            console.log(data.status);
            if(data.status === 201)
                return Promise.resolve();
            return Promise.reject(data.status);
        }
    )
}

export function getBookingRequestsActionCreator(data) {
    if(data.status === 200)
        return {type: GET_REQUEST, bookingRequests: data.requests}
}

export const getBookingRequestsThunkCreator = (token) => (dispatch) => {
    return bookingAPI.getRequests(token).then(
        (data) => {
            dispatch(getBookingRequestsActionCreator(data));
            if(data.status === 401)
                return Promise.reject();
        }
    )
}

export default bookingReducer;