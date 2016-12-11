import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as StepActions from '../actions/steps';
import * as RecorderActions from '../actions/recorder';
import * as uiActions from '../actions/ui';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';
import { StickyContainer, Sticky } from 'react-sticky';

import normalizeStyle from 'normalize.css';
import materialIcons from 'mdi/scss/materialdesignicons.scss';
import materialCSS from 'materialize-css/sass/materialize.scss';


import {ApplicationBar} from './ApplicationBar';
import {RecorderControls} from './RecorderControls';
import {ManageScrollbarToggler} from './ManageScrollbarToggler';
import {StepsList} from './StepsList';
import {TestScriptWriter} from './TestScriptWriter';

import style from './App.pcss';

@connect(
    state => ({
        steps: state.steps,
        recorder: state.recorder,
        ui: state.stickToBottom
    }),
    dispatch => ({
        stepActions: bindActionCreators(StepActions, dispatch),
        recorderActions: bindActionCreators(RecorderActions, dispatch),
        uiActions: bindActionCreators(uiActions, dispatch),
    })
)

export class App extends React.Component {

    static propTypes = {
        steps: React.PropTypes.array.isRequired,
        stepActions: React.PropTypes.object.isRequired,
        recorder: React.PropTypes.object.isRequired,
        recorderActions: React.PropTypes.object.isRequired,
        uiActions: React.PropTypes.object.isRequired
    };

    componentDidMount() {
        window.addEventListener('scroll', ::this.handleScroll);
    }

    handleScroll() {
        let isScrolledToBottom = window.scrollY + window.innerHeight == document.body.offsetHeight;
        if (!isScrolledToBottom) {
            this.props.uiActions.resetStickToBottom();
        }
    }

    render() {
        let {recorder, recorderActions, steps, stepActions, uiActions} = this.props;

        return (
            <div className={style.app}>
                <StickyContainer>
                    <ApplicationBar/>

                    <Sticky stickyStyle={{zIndex: 2}}>
                        <Grid>
                            <Row>
                                <Col xs={12}>
                                    <Row center="xs">
                                        <Col xs={6}>
                                            <RecorderControls
                                                recorder={recorder}
                                                steps={steps}
                                                startRecord={recorderActions.startRecord}
                                                stopRecord={recorderActions.stopRecord}
                                                flushRecord={stepActions.deleteAllSteps}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Grid>
                    </Sticky>

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
                </StickyContainer>
                <ManageScrollbarToggler stickToBottom={uiActions.stickToBottom}/>
            </div>
        );
    }
}
