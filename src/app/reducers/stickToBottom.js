import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    stickToBottom: false
};

const actionsMap = {
    [ActionTypes.STICK_TO_BOTTOM_IF_NEEDED](state, action) {
        if (state.stickToBottom) {
            scrollDown();
        }
        return state;
    },
    [ActionTypes.STICK_TO_BOTTOM](state) {
        scrollDown();
        return {...state, stickToBottom: true};
    },
    [ActionTypes.RESET_STICK_TO_BOTTOM](state, action) {
        return {...state, stickToBottom: false};
    }
};

function scrollDown() {
    window.scrollTo(0, 10000);
}

export function stickToBottom(state = initialState, action) {
    const reduceFn = actionsMap[action.type];
    if (!reduceFn) {
        return state;
    }

    return reduceFn(state, action);
}
