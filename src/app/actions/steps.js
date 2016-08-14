import * as types from '../constants/ActionTypes';

export function addStep({visitorAction, actionData, target}) {
    return {type: types.ADD_STEP, details: {visitorAction, actionData, target}};
}

export function deleteStep(id) {
    return {type: types.DELETE_STEP, id};
}
