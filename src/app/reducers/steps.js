import * as ActionTypes from '../constants/ActionTypes';

const initialState = [{
    id: 1,
    visitorAction: 'CLICK',
    data: null,
    target: {
        url: 'https://www.google.com/?sourceid=chrome-instant#newwindow=1',
        nodePath: 'body div div div a'
    }
}];

const actionsMap = {
    [ActionTypes.ADD_STEP](state, action) {
        let maxId = state.reduce((maxId, step) => Math.max(step.id, maxId), -1);
        let {details} = action;
        return [{
            id: maxId + 1,
            visitorAction: details.visitorAction,
            data: details.data,
            target: details.target
        }, ...state];
    },
    [ActionTypes.DELETE_STEP](state, action) {
        return state.filter(step => step.id !== action.id);
    },
    [ActionTypes.DELETE_ALL_STEPS](_state, _action) {
        return [];
    }
};

export function steps(state = initialState, action) {
    const reduceFn = actionsMap[action.type];
    if (!reduceFn) {
        return state;
    }

    return reduceFn(state, action);
}
