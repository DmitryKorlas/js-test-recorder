chrome.storage.local.get('state', (obj) => {
    let steps = obj.steps;
    let text = '';
    if (steps) {
        steps = JSON.parse(steps);
        const len = steps.length;
        if (len > 0) {
            text = len.toString();
        }
    }

    chrome.browserAction.setBadgeText({text});
});
