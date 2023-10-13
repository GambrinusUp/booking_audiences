import { createStore, combineReducers, applyMiddleware } from "redux";
import ThunkMiddleware from "redux-thunk";
import scheduleReducer from "./scheduleReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import editReducer from "./editReducer";
import bookingReducer from "./bookingReducer";

let reducers = combineReducers({
    schedulePage : scheduleReducer,
    editPage : editReducer,
    bookingPage : bookingReducer
});

let store = createStore(reducers, composeWithDevTools(
    applyMiddleware(ThunkMiddleware)
    // Дополнительные параметры, если необходимо
));

export default store;
