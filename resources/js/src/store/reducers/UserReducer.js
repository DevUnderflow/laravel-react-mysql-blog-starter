import * as UserTypes from '../actionTypes/UserTypes';

const initialState = {
    users: {},
    user: {
        id: "",
        name: "",
        email: "",
        password: "",
        image_url: "",
        contact_no: "",
        location: ""
    },
    success_message: "",
    error_message: "",
    validation_errors: {},
    list_spinner: false,
    create_update_spinner: false
};

const userReducer = function (state = initialState, action) {
    switch (action.type) {
        case UserTypes.SET_USER_DEFAULTS:
            return {
                ...state,
                user: {...state.user},
                success_message: "",
                error_message: "",
                validation_errors: {},
                list_spinner: false,
                create_update_spinner: false
            };
        case UserTypes.SHOW_USER:
            return {
                ...state,
                create_update_spinner: true
            };
        case UserTypes.SHOW_USER_SUCCESS:
            return {
                ...state,
                create_update_spinner: false,
                user: {...action.data.data, password: ""}
            };
        case UserTypes.SHOW_USER_FAILURE:
            return {
                ...state,
                create_update_spinner: false,
                error_message: action.error.message
            };
        case UserTypes.RESET_USER_FIELDS:
            return {
                ...state,
                user: {
                    id: "",
                    name: "",
                    email: "",
                    password: "",
                    image_url: "",
                    contact_no: "",
                    location: "",
                }
            };
        case UserTypes.HANDLE_USER_CHANGE:
            return handleChange(state, action);
        default:
            return state;
    }
};

/**
 * handle field change
 */
function handleChange(state, action)
{
        return {
            ...state,
            user: {...state.user}
        };
}

export default userReducer;
