import {ActionTypes} from "../constants/actionTypes";

const initState = {
    query: '',
    photos: [],
    loading: false,
    error: '',
    pageNum: 1,
}

const mainReducer = (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.GET_QUERY_RESULTS_PENDING:
            return {
                ...state,
                query: action.payload.query,
                loading: true,
            };
        case ActionTypes.GET_QUERY_RESULTS_COMPLETED:
            let photos = [];
            if (action.payload.page === 1) {
                photos = [...action.payload.photos]
            } else {
                photos = [...state.photos, ...action.payload.photos]
            }
            return {
                ...state,
                photos,
                loading: false,
                pageNum: state.pageNum + 1,
            }
        case ActionTypes.GET_QUERY_RESULTS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        default:
            return state;
    }
};

export default mainReducer;