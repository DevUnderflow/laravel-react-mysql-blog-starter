import * as UserTypes from '../actionTypes/UserTypes';

import User from '../../apis/User';


/**
 * set user defaults
 */
function setUserDefaults() {

    return function (dispatch, getState) {

        dispatch({
            type: UserTypes.SET_USER_DEFAULTS
        });
    }
}


/**
 * show user action
 */
function showUser(id)
{
    return function (dispatch, getState) {

        dispatch({
            type: UserTypes.SHOW_USER
        });

        User.showOne(id).then(response => {
            dispatch({
                type: UserTypes.SHOW_USER_SUCCESS,
                data: response.data
            });

        }).catch(error => {
            dispatch({
                type: UserTypes.SHOW_USER_FAILURE,
                error: error.response.data
            });
        });
    }
}
/**
 * handle user change
 *
 * fires on any field change of the user object
 */
function handleUserChange(field, value, checked) {

    return function (dispatch, getState) {

        dispatch({
            type: UserTypes.HANDLE_USER_CHANGE,
            data: value,
            field,
            checked
        });
    }
}

/**
 * reset user fields action
 */
function resetUserFields() {

    return function (dispatch, getState) {

        dispatch({
            type: UserTypes.RESET_USER_FIELDS
        });
    }
}

export {
    setUserDefaults,
    showUser,
    handleUserChange,
    resetUserFields
};
