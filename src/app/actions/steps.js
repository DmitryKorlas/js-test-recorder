import * as types from '../constants/ActionTypes';

export function addStep({visitorAction, data, target}) {
    return {type: types.ADD_STEP, details: {visitorAction, data, target, time: new Date().getTime()}};
}

export function deleteStep(id) {
    return {type: types.DELETE_STEP, id};
}

export function deleteAllSteps() {
    return {type: types.DELETE_ALL_STEPS};
}
