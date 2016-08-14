import React from 'react';

export class StepsListItem extends React.Component {
    static propTypes = {
        stepNumber: React.PropTypes.number.isRequired,
        record: React.PropTypes.object.isRequired,
        deleteStep: React.PropTypes.func.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.handleDeleteStepClick = ::this.handleDeleteStepClick; // bind to context
    }

    handleDeleteStepClick() {
        this.props.deleteStep(this.props.record.id);
    }

    formatStepData(step) {
        return JSON.stringify(step.data);
    }

    formatStepTarget(step) {
        return JSON.stringify(step.target);
    }

    render() {
        let {record, stepNumber} = this.props;
        return (
            <tr>
                <td>{stepNumber + 1}</td>
                <td>{record.actionName}</td>
                <td>{this.formatStepData(record)}</td>
                <td>{this.formatStepTarget(record)}</td>
                <td><button onClick={this.handleDeleteStepClick}>skip</button></td>
            </tr>
        )
    }
}
