import * as StepActions from '../actions/steps';

export function handleMessage(message, store) {
    console.log('handleMessage', message);
    if (store.getState().recorder.isRecordingInProgress) {
        store.dispatch(StepActions.addStep('yep!'));
    }
}
