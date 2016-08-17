import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import * as Icons from 'material-ui/svg-icons/index';

import {red500} from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton';

const styles = { // TODO move to css
    smallIcon: {
        width: 36,
        height: 36,
    },
    small: {
        width: 72,
        height: 72,
        padding: 16,
        marginTop: -8
    }
};

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

        let icon = isRecordingInProgress
            ? <Icons.AvStop color={red500}/>
            : <Icons.AvFiberManualRecord color={red500}/>;

        return (
            <IconButton onClick={action}
                        iconStyle={styles.smallIcon}
                        style={styles.small}
                        tooltipPosition="bottom-right"
                        tooltip={tooltipText}>
                {icon}
            </IconButton>
        );
    }

    renderFlushButton() {
        return (
            <FlatButton label="Flush"
                onClick={this.props.flushRecord}
                disabled={this.props.steps.length === 0}/>
        );
    }

    render() {
        let text = this.props.recorder.isRecordingInProgress ? 'Recording in progress' : '';
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    {this.renderStartStopButton()}
                    <ToolbarSeparator />
                    {this.renderFlushButton()}
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarTitle text={text} style={{color: red500}}/>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}
