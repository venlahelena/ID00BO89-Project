import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

/* Import Reducers Here */
import authReducer from './authReducer';
import blogsReducer from './blogsReducer';
import commentsReducer from './commentsReducer';
import usersReducer from './usersReducer';

/* Combine Reducers Here */
const reducer = combineReducers({
    auth: authReducer,
    blogs: blogsReducer,
    comments: commentsReducer,
    users: usersReducer,
});

/* Create Redux Store */
const store = createStore(reducer, composeWithDevTools());

export default store;
