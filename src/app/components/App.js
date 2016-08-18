import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as StepActions from '../actions/steps';
import * as RecorderActions from '../actions/recorder';
import {ApplicationBar} from './ApplicationBar';
import {RecorderControls} from './RecorderControls';
import {StepsList} from './StepsList';
import {TestScriptWriter} from './TestScriptWriter';
import style from './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';

injectTapEventPlugin(); // required for material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
                        this.props.stepActions.addStep(
                            {
                                visitorAction: 'CLICK',
                                data: null,
                                target: {
                                    url: 'https://www.google.com/?sourceid=chrome-instant#newwindow=1&ts='
                                        + new Date().getTime(),
                                    nodePath: ['attr1', 'attr2', 'attr3']
                                }
                            });
                    }
                }>test add</button>
            </div>
        );
    }

    render() {
        let {recorder, recorderActions, steps, stepActions} = this.props;

        return (
            <MuiThemeProvider>
                <div className={style.app}>
                    <ApplicationBar/>
                    <RecorderControls
                        recorder={recorder}
                        steps={steps}
                        startRecord={recorderActions.startRecord}
                        stopRecord={recorderActions.stopRecord}
                        flushRecord={stepActions.deleteAllSteps}
                    />
                    {this.renderTestButton()}
                    <Grid>
                        <Row>
                            <Col xs={4}>
                                <StepsList
                                    steps={steps}
                                    deleteStep={stepActions.deleteStep}
                                />
                            </Col>
                            <Col xs={8}>
                                <TestScriptWriter steps={steps}/>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </MuiThemeProvider>
        );
    }
}
