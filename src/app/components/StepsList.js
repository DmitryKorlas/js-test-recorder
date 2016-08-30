import React from 'react';
import {StepsListItem} from './StepsListItem';

export class StepsList extends React.Component {
    static propTypes = {
        steps: React.PropTypes.array.isRequired,
        deleteStep: React.PropTypes.func // opt
    };

    renderSteps(listSteps) {
        return listSteps.map(::this.renderStep);
    }

    renderStep(step, index) {
        return <StepsListItem key={index} record={step} stepNumber={index} deleteStep={this.props.deleteStep} />;
    }

    renderEmptyState() {
        return (
            <p>There is no steps yet</p>
        );
    }

    render() {
        let {steps} = this.props;
        return (
            <div>
                {steps.length > 0 ? this.renderSteps(steps) : this.renderEmptyState()}
            </div>
        );
    }
}
