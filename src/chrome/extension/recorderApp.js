import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from '../../app/components/AppContainer';
import './recorderApp.css';

chrome.storage.local.get('state', obj => {
    const {state} = obj;
    const initialState = JSON.parse(state || '{}');

    const createStore = require('../../app/stores/configureStore');
    ReactDOM.render(
        <AppContainer store={createStore(initialState)}/>,
        document.querySelector('#root')
    );
});

var globalCounter = 0;
export function foo(something) {
    var node = document.querySelector('#something');
    node.innerHTML = node.innerHTML + (++globalCounter + JSON.stringify(something || null));
}

chrome.runtime.onMessage.addListener(function (message) {
    foo(message);
});
