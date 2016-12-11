import {applyMiddleware, createStore, compose} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import reduxMulti from 'redux-multi';
import storage from '../utils/storage';

const enhancer = compose(
    applyMiddleware(thunk),
    applyMiddleware(reduxMulti),
    storage()
);

export default function (initialState) {
    return createStore(rootReducer, initialState, enhancer);
}
