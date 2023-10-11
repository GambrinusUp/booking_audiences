import { createStore, combineReducers, applyMiddleware } from "redux";
import ThunkMiddleware from "redux-thunk";
import scheduleReducer from "./scheduleReducer";
import { composeWithDevTools } from 'redux-devtools-extension';

let reducers = combineReducers({
    schedulePage : scheduleReducer
});

let store = createStore(reducers, composeWithDevTools(
    applyMiddleware(ThunkMiddleware)
    // Дополнительные параметры, если необходимо
));

export default store;
