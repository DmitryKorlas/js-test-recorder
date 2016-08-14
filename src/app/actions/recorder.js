import * as types from '../constants/ActionTypes';

export function startRecord() {
    return {type: types.START_RECORD};
}

export function stopRecord() {
    return {type: types.STOP_RECORD};
}

