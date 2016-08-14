import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as StepActions from '../actions/steps';
import * as RecorderActions from '../actions/recorder';
import {RecorderControls} from './RecorderControls';
import {StepsList} from './StepsList';
import style from './App.css';

@connect(
    state => ({
        steps: state.steps,
        recorder: state.recorder,
    }),
    dispatch => ({
        stepActions: bindActionCreators(StepActions, dispatch),
        recorderActions: bindActionCreators(RecorderActions, dispatch),
    })
)

export class App extends React.Component {

    static propTypes = {
        steps: React.PropTypes.array.isRequired,
        stepActions: React.PropTypes.object.isRequired,
        recorder: React.PropTypes.object.isRequired,
        recorderActions: React.PropTypes.object.isRequired
    };

    renderTestButton() {
        return (
            <div>
                <button onClick={() => {
                        this.props.stepActions.addStep({text: 'test'+ new Date().getTime()});
                    }
                }>test</button>
            </div>
        );
    }

    render() {
        let {recorder, recorderActions, steps, stepActions} = this.props;

        return (
            <div className={style.app}>
                <RecorderControls
                    recorder={recorder}
                    startRecord={recorderActions.startRecord}
                    stopRecord={recorderActions.stopRecord}
                />
                {this.renderTestButton()}
                <StepsList
                    steps={steps}
                    deleteStep={stepActions.deleteStep}
                />
            </div>
        );
    }
}
