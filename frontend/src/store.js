import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk';
import { userLoginReducer } from './reducer/userReducer'
import { composeWithDevTools } from 'redux-devtools-extension';

// const userInfoFromStorage = localStorage.getItem('userInfo')
//     ? JSON.parse(localStorage.getItem('userInfo')) : null;

const reducers = combineReducers({
    userLogin: userLoginReducer
    // productList: productListReducer,
});
const initialState = {
    //userLogin: userInfoFromStorage
}

const middleware = [thunk];
const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))

    // reducer, initialState, applyMiddleware[thunk]
);

export default store;