import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from '../../app/components/AppContainer';
import {handleMessage} from '../../app/utils/handleMessage';
import './recorderApp.css';

chrome.storage.local.get('state', obj => {
    const {state} = obj;
    const initialState = JSON.parse(state || '{}');

    const createStore = require('../../app/stores/configureStore');
    let store = createStore(initialState);

    ReactDOM.render(
        <AppContainer store={store}/>,
        document.querySelector('#root')
    );

    chrome.runtime.onMessage.addListener(function(message) {
        handleMessage(message, store);
    });
});
