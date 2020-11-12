import * as PostTypes from '../actionTypes/PostTypes';

const initialState = {
    posts: {},
    post: {
        id: "",
        title: "",
        content: "",
        image: "",
        likes_counter: 0
    },
    success_message: "",
    error_message: "",
    validation_errors: {},
    list_spinner: false,
    create_update_spinner: false
};

const postReducer = function (state = initialState, action) {
    let tags = [];

    switch (action.type) {
        case PostTypes.LIST_POSTS:
            return {
                ...state,
                list_spinner: true
            };
        case PostTypes.LIST_POSTS_SUCCESS:
            return {
                ...state,
                list_spinner: false,
                posts: action.data
            };
        case PostTypes.LIST_POSTS_FAILURE:
            return {
                ...state,
                list_spinner: false,
                error_message: action.error
            };
        case PostTypes.HANDLE_FIELD_CHANGE:
            return handleFieldChange(state, action);
        case PostTypes.CREATE_POSTS:
            return {
                ...state,
                create_update_spinner: true
            };
        case PostTypes.CREATE_POSTS_SUCCESS:
            return {
                ...state,
                create_update_spinner: false,
                post: action.data.data,
                success_message: action.data.message,
                error_message: "",
                validation_errors: {}
            };
        case PostTypes.CREATE_POSTS_FAILURE:
            return {
                ...state,
                create_update_spinner: false,
                error_message: action.error.message,
                validation_errors: action.error.errors,
                success_message: ""
            };
        case PostTypes.SHOW_POST:
            return {
                ...state,
                create_update_spinner: true
            };
        case PostTypes.SHOW_POST_SUCCESS:
            action.data.image = "";

            return {
                ...state,
                create_update_spinner: false,
                post: action.data
            };
        case PostTypes.SHOW_POST_FAILURE:
            return {
                ...state,
                create_update_spinner: false,
                error_message: action.error.message
            };
        case PostTypes.EDIT_POSTS:
            return {
                ...state,
                create_update_spinner: true
            };
        case PostTypes.EDIT_POSTS_SUCCESS:
            return {
                ...state,
                post: action.data.data,
                create_update_spinner: false,
                success_message: action.data.message,
                error_message: "",
                validation_errors: {}
            };
        case PostTypes.EDIT_POSTS_FAILURE:
            return {
                ...state,
                create_update_spinner: false,
                error_message: action.error.message,
                validation_errors: action.error.errors,
                success_message: ""
            };
        case PostTypes.DELETE_POSTS:
            return {
                ...state,
                list_spinner: true
            };
        case PostTypes.DELETE_POSTS_SUCCESS:
            let posts = state.posts;
            posts.data = state.posts.data.filter(item => item.id != action.id);

            return {
                ...state,
                list_spinner: false,
                posts: posts,
                success_message: action.message,
                error_message: ''
            };
        case PostTypes.DELETE_POSTS_FAILURE:
            return {
                ...state,
                list_spinner: false,
                error_message: action.error.message,
                success_message: ''
            };
        case PostTypes.SET_POST_DEFAULTS:
            return {
                ...state,
                success_message: "",
                error_message: "",
                validation_errors: {},
                list_spinner: false,
                create_update_spinner: false
            };
        case PostTypes.RESET_FIELDS:
            return {
                ...state,
                post: {
                    id: "",
                    title: "",
                    content: "",
                    image: "",
                    likes_counter: 0
                }
            };
        default:
            return state;
    }
};

function handleFieldChange(state, action)
{
    return {
            ...state,
            post: {...state.post, [action.field]: action.data}
        };
}

export default postReducer;
