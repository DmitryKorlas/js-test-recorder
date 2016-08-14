import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    isRecordingInProgress: false
};

const actionsMap = {
    [ActionTypes.START_RECORD](state, _action) {
        return {
            ...state,
            isRecordingInProgress: true
        };
    },
    [ActionTypes.STOP_RECORD](state, _action) {
        return {
            ...state,
            isRecordingInProgress: false
        };
    }
};

export function recorder(state = initialState, action) {
    const reduceFn = actionsMap[action.type];
    if (!reduceFn) {
        return state;
    }

    return reduceFn(state, action);
}
