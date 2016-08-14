import * as StepActions from '../actions/steps';
import * as VisitorEvents from '../constants/VisitorEvents';

export function handleMessage({eventType, eventData, target}, store) {
    switch (eventType) {
        case VisitorEvents.CLICK:
            if (store.getState().recorder.isRecordingInProgress) {
                store.dispatch(StepActions.addStep({
                    visitorAction: VisitorEvents.CLICK,
                    actionData: eventData,
                    target: target
                }));
            }
        break;
        default:
        break;
    }

}
