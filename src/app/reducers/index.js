import {combineReducers} from 'redux';
import {steps} from './steps';
import {recorder} from './recorder';

export default combineReducers({
    steps,
    recorder
});
