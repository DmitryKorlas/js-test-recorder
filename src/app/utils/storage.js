function saveState(state) {
    chrome.storage.local.set({state: JSON.stringify(state)});
}

function setBadge(steps) {
    if (chrome.browserAction) {
        const count = steps.length;
        chrome.browserAction.setBadgeText({text: count > 0 ? count.toString() : ''});
    }
}

export default function () {
    return next => (reducer, initialState) => {
        const store = next(reducer, initialState);
        store.subscribe(() => {
            const state = store.getState();
            saveState(state);
            setBadge(state.steps);
        });
        return store;
    };
}
