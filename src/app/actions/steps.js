import * as types from '../constants/ActionTypes';

export function addStep({visitorAction, data, target}) {
    return {type: types.ADD_STEP, details: {visitorAction, data, target}};
}

export function deleteStep(id) {
    return {type: types.DELETE_STEP, id};
}
