import * as types from '../constants/ActionTypes';

export function addStep(text) {
    return {type: types.ADD_STEP, text};
}

export function deleteStep(id) {
    return {type: types.DELETE_STEP, id};
}
