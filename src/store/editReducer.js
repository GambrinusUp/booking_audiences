import {editAPI} from "../api/editAPI";

const GET_PROFESSORS = 'GET_PROFESSORS';
const GET_SUBJECTS = 'GET_SUBJECTS';
const GET_AUDIENCES = 'GET_AUDIENCES';

let initialState = {
    professors: [],
    subjects: [],
    audiences: []
}

const editReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case GET_PROFESSORS:
            newState.professors = action.professors;
            return newState;
        case GET_SUBJECTS:
            newState.subjects = action.subjects;
            return newState;
        case GET_AUDIENCES:
            newState.audiences = action.audiences;
            return newState;
        default:
            return state;
    }
};

export const deleteGroupThunkCreator = (id, token) => (dispatch) => {
    return editAPI.deleteGroup(id, token).then(
        (data) => {
            console.log(data.status);
            if(data.status === 401)
                return Promise.reject();
            if(data.status === 204)
                return Promise.resolve();
        }
    )
}

export const editGroupThunkCreator = (id, name, token) => (dispatch) => {
    return editAPI.editGroup(id, name, token).then(
        (data) => {
            console.log(data.status);
            if(data.status === 401)
                return Promise.reject();
            if(data.status === 200)
                return Promise.resolve();
        }
    )
}

export const addGroupThunkCreator = (name, token) => (dispatch) => {
    return editAPI.addGroup(name, token).then(
        (data) => {
            console.log(data.status);
            if(data.status === 401)
                return Promise.reject();
            if(data.status === 200)
                return Promise.resolve();
        }
    )
}

export const deleteAudienceThunkCreator = (id, token) => (dispatch) => {
    return editAPI.deleteAudience(id, token).then(
        (data) => {
            console.log(data.status);
            if(data.status === 401)
                return Promise.reject();
            if(data.status === 204)
                return Promise.resolve();
        }
    )
}

export const editAudienceThunkCreator = (id, name, token) => (dispatch) => {
    return editAPI.editAudience(id, name, token).then(
        (data) => {
            console.log(data.status);
            if(data.status === 401)
                return Promise.reject();
            if(data.status === 200)
                return Promise.resolve();
        }
    )
}

export const addAudienceThunkCreator = (name, token) => (dispatch) => {
    return editAPI.addAudience(name, token).then(
        (data) => {
            console.log(data.status);
            if(data.status === 401)
                return Promise.reject();
            if(data.status === 200)
                return Promise.resolve();
        }
    )
}

export function getAudiences1ActionCreator(data) {
    if(data.status === 200)
        return {type: GET_AUDIENCES, audiences: data.audiences}
}

export const getAudiences1ThunkCreator = () => (dispatch) => {
    return editAPI.getAudiences1().then(
        (data) => {
            dispatch(getAudiences1ActionCreator(data));
        }
    )
}

export const deleteSubjectThunkCreator = (id, token) => (dispatch) => {
    return editAPI.deleteSubject(id, token).then(
        (data) => {
            console.log(data.status);
            if(data.status === 401)
                return Promise.reject();
            if(data.status === 204)
                return Promise.resolve();
        }
    )
}


export const editSubjectThunkCreator = (id, name, token) => (dispatch) => {
    return editAPI.editSubject(id, name, token).then(
        (data) => {
            console.log(data.status);
            if(data.status === 401)
                return Promise.reject();
            if(data.status === 200)
                return Promise.resolve();
        }
    )
}

export const addSubjectThunkCreator = (name, token) => (dispatch) => {
    return editAPI.addSubject(name, token).then(
        (data) => {
            console.log(data.status);
            if(data.status === 401)
                return Promise.reject();
            if(data.status === 200)
                return Promise.resolve();
        }
    )
}

export function getSubjectsActionCreator(data) {
    console.log(data.professors);
    if(data.status === 200)
        return {type: GET_SUBJECTS, subjects: data.subjects}
}

export const  getSubjectsThunkCreator = () => (dispatch) => {
    return editAPI.getSubjects().then(
        (data) => {
            dispatch(getSubjectsActionCreator(data));
        }
    )
}

export const addProfessorsThunkCreator = (fullName, shortName, token) => (dispatch) => {
    return editAPI.addProfessor(fullName, shortName, token).then(
        (data) => {
            console.log(data.status);
            if(data.status === 401)
                return Promise.reject();
            if(data.status === 200)
                return Promise.resolve();
        }
    )
}

export const deleteProfessorsThunkCreator = (id, token) => (dispatch) => {
    return editAPI.deleteProfessor(id, token).then(
        (data) => {
            console.log(data.status);
            if(data.status === 401)
                return Promise.reject();
            if(data.status === 204)
                return Promise.resolve();
        }
    )
}

export const editProfessorsThunkCreator = (id, fullName, shortName, token) => (dispatch) => {
    return editAPI.editProfessor(id, fullName, shortName, token).then(
        (data) => {
            console.log(data.status);
            if(data.status === 401)
                return Promise.reject();
            if(data.status === 200)
                return Promise.resolve();
        }
    )
}

export function getProfessorsActionCreator(data) {
    console.log(data.professors);
    if(data.status === 200)
        return {type: GET_PROFESSORS, professors: data.professors}
}

export const  getProfessorsThunkCreator = () => (dispatch) => {
    return editAPI.getProfessors().then(
        (data) => {
            dispatch(getProfessorsActionCreator(data));
        }
    )
}

export default editReducer;