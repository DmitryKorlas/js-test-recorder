import {applyMiddleware, createStore, compose} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import reduxMulti from 'redux-multi';
import storage from '../utils/storage';

const enhancer = compose(
    applyMiddleware(thunk),
    applyMiddleware(reduxMulti),
    storage(),
    window.devToolsExtension ? window.devToolsExtension() : nope => nope
);

export default function (initialState) {
    const store = createStore(rootReducer, initialState, enhancer);

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}
