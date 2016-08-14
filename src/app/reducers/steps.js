import * as ActionTypes from '../constants/ActionTypes';

const initialState = [{
    text: 'Use Redux',
    completed: false,
    id: 0
}];

const actionsMap = {
    [ActionTypes.ADD_STEP](state, action) {
        let maxId = state.reduce((maxId, step) => Math.max(step.id, maxId), -1);
        return [{
            id: maxId + 1,
            completed: false,
            text: action.text
        }, ...state];
    }
};

export function steps(state = initialState, action) {
    const reduceFn = actionsMap[action.type];
    if (!reduceFn) {
        return state;
    }

    return reduceFn(state, action);
}
