import * as types from '../constants/ActionTypes';

export function stickToBottom() {
    return {type: types.STICK_TO_BOTTOM};
}

export function resetStickToBottom() {
    return {type: types.RESET_STICK_TO_BOTTOM};
}
