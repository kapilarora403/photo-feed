import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import mainReducer from "reducers/mainReducer";

function configureStore() {
    return createStore(mainReducer, applyMiddleware(thunk));
}

export default configureStore;
