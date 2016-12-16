import {combineReducers} from 'redux';
import {steps} from './steps';
import {recorder} from './recorder';
import {stickToBottom} from './stickToBottom';
import {settings} from './settings';

export default combineReducers({
    steps,
    recorder,
    stickToBottom,
    settings
});
