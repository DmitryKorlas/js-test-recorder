import * as types from '../constants/ActionTypes';

export function saveSettings(data) {
    return {type: types.SAVE_SETTINGS, data};
}
