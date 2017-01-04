import * as StepActions from '../actions/steps';
import * as VisitorEvents from '../constants/VisitorEvents';

function convertPathChain2IdChain(pathChain, attrNameForCapture) {
    return pathChain
        .filter((nodeStruct) => {
            return !!nodeStruct.attributes[attrNameForCapture]; // filter nodes who has specified attribute
        })
        .map(nodeStruct => nodeStruct.attributes[attrNameForCapture])
        .reverse();
}

function isAllowedPath(convertedPath) {
    return convertedPath.length > 0;
}

export function handleMessage({eventType, eventData, target}, store) {
    switch (eventType) {
        case VisitorEvents.CLICK:
        case VisitorEvents.MUTATE_TEXT_FIELD:
        case VisitorEvents.MUTATE_DROPDOWN:
            if (!store.getState().recorder.isRecordingInProgress) {
                break;
            }
            let {nodePath, url} = target;
            let attributeNameForCapture = store.getState().settings.attrNameForCapture;
            let convertedChain = convertPathChain2IdChain(nodePath, attributeNameForCapture);
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
