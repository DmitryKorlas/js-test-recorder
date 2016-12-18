import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    isPopupShown: false,
    showSourceOutputHeaderFooter: true,
    availableFrameworks: [
        {
            id: 'casperJS',
            title: 'Casper JS'
        },
        {
            id: 'phantomJS',
            title: 'Phantom JS'
        }
    ],
    currentFrameworkId: 'phantomJS'
};

const actionsMap = {
    [ActionTypes.SHOW_SETTINGS_POPUP](state, action) {
        return {...state, isPopupShown: true};
    },
    [ActionTypes.HIDE_SETTINGS_POPUP](state, action) {
        return {...state, isPopupShown: false};
    },
    [ActionTypes.SAVE_SETTINGS](state, action) {
        let {currentFrameworkId, showSourceOutputHeaderFooter} = action.data;
        let nextState = {...state, showSourceOutputHeaderFooter};

        let framework = state.availableFrameworks.find(item => item.id === currentFrameworkId);
        if (framework) {
            nextState.currentFrameworkId = currentFrameworkId;
        }

        return nextState;
    }
};

export function settings(state = initialState, action) {
    const reduceFn = actionsMap[action.type];
    if (!reduceFn) {
        return state;
    }

    return reduceFn(state, action);
}
