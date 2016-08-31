import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';
import {Button} from './Button';
import {Icon} from './Icon';
import classnames from 'classnames';
import style from './RecorderControls.pcss';

export class RecorderControls extends React.Component {
    static propTypes = {
        recorder: React.PropTypes.object.isRequired,
        steps: React.PropTypes.array.isRequired,
        startRecord: React.PropTypes.func, // opt
        stopRecord: React.PropTypes.func, // opt
        flushRecord: React.PropTypes.func // opt
    };

    renderStartStopButton() {
        let {recorder, startRecord, stopRecord} = this.props;
        let isRecordingInProgress = recorder.isRecordingInProgress;
        let action = isRecordingInProgress
            ? stopRecord
            : startRecord;

        let tooltipText = isRecordingInProgress ? 'Press to stop record' : 'Press to start record';
        let icon = isRecordingInProgress ? 'stop' : 'record';

        return (
            <Button
                className={style['start-stop-button']}
                iconOnly
                title={tooltipText}
                onClick={action}>
                <Icon name={icon}></Icon>
            </Button>
        );
    }

    renderFlushButton() {
        return (
            <Button
                flat
                onClick={this.props.flushRecord}
                disabled={this.props.steps.length === 0}>
                Flush
            </Button>
        );
    }

    render() {
        let text = this.props.recorder.isRecordingInProgress ? 'Recording in progress' : '';
        return (
            <div className={classnames([style['recorder-controls']], 'z-depth-1')}>
                <Row middle="xs" start="xs">
                    <Col xs>
                        {this.renderStartStopButton()}
                        {this.renderFlushButton()}
                    </Col>
                    <Col xs>
                        <Row end="xs" >
                            <Col xs={12}>
                                <span className={style['status-message']}>{text}</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}
