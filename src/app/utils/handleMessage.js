import * as StepActions from '../actions/steps';
import * as VisitorEvents from '../constants/VisitorEvents';

function convertPathChain2IdChain(pathChain) {
    return pathChain
        .filter((nodeStruct) => {
            return !!nodeStruct.attributes.id; // filter nodes who has "id" attribute
        })
        .map(nodeStruct => nodeStruct.attributes.id)
        .reverse();
}

function isAllowedPath(convertedPath) {
    return convertedPath.length > 0;
}

export function handleMessage({eventType, eventData, target}, store) {
    switch (eventType) {
        case VisitorEvents.CLICK:
        case VisitorEvents.EDIT:
            if (!store.getState().recorder.isRecordingInProgress) {
                break;
            }
            let {nodePath, url} = target;
            let convertedChain = convertPathChain2IdChain(nodePath);
            if (!isAllowedPath(convertedChain)) {
                break;
            }
            store.dispatch(StepActions.addStep({
                visitorAction: eventType,
                data: eventData,
                target: {
                    nodePath: convertedChain,
                    url: url
                }
            }));
        break;

        default:
        break;
    }
}
