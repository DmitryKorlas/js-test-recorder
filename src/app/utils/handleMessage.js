import * as StepActions from '../actions/steps';
import * as VisitorEvents from '../constants/VisitorEvents';

export function handleMessage({eventType, eventData, target}, store) {
    switch (eventType) {
        case VisitorEvents.CLICK:
        case VisitorEvents.EDIT:
            if (store.getState().recorder.isRecordingInProgress) {
                store.dispatch(StepActions.addStep({
                    visitorAction: eventType,
                    data: eventData,
                    target: target
                }));
            }
        break;

        default:
        break;
    }
}
