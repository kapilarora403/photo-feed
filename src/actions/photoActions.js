import { createApi } from "unsplash-js";
import {ActionTypes} from "../constants/actionTypes";

const unsplash = createApi({
    accessKey: process.env.PHOTO_ACCESS_KEY,
});

export const getQueryResults = ({ query = '' , page = 1, success = null}) => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.GET_QUERY_RESULTS_PENDING,
            payload: { query }
        })
        unsplash.search.getPhotos({
            query,
            page,
            perPage: 10
        }).then((responseJson) => {
            if (responseJson.status === 200) {
                dispatch({
                    type: ActionTypes.GET_QUERY_RESULTS_COMPLETED,
                    payload: { photos: responseJson.response.results, page }
                })
                if (success) {
                    success(responseJson.response.results)
                }
            } else {
                dispatch({
                    type: ActionTypes.GET_QUERY_RESULTS_FAILED,
                    payload: { error: 'Some error' },
                })
            }
        })
    }
};