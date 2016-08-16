import React from 'react';

export class RecorderControls extends React.Component {
    static propTypes = {
        recorder: React.PropTypes.object.isRequired,
        steps: React.PropTypes.array.isRequired,
        startRecord: React.PropTypes.func, // opt
        stopRecord: React.PropTypes.func, // opt
        flushRecord: React.PropTypes.func // opt
    };

    render() {
        return (
            <div>
                <div>RecorderControls</div>
                <div>
                    <button onClick={this.props.startRecord} disabled={this.props.recorder.isRecordingInProgress}>
                        start record
                    </button>

                    <button onClick={this.props.stopRecord} disabled={!this.props.recorder.isRecordingInProgress}>
                        stop record
                    </button>

                    <button onClick={this.props.flushRecord} disabled={this.props.steps.length === 0}>
                        flush
                    </button>
                </div>
            </div>
        );
    }
}
