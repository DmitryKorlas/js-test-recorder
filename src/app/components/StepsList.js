import React from 'react';
import {StepsListItem} from './StepsListItem';
import classnames from 'classnames';
import styles from './StepsList.pcss';

export class StepsList extends React.Component {

    static propTypes = {
        steps: React.PropTypes.array.isRequired,
        useChainedAttrs: React.PropTypes.bool,
        deleteStep: React.PropTypes.func // opt
    };

    static defaultProps = {
        useChainedAttrs: true
    };

    renderSteps(listSteps) {
        return (
            <div>
                <h4 className="header">Steps</h4>
                <div className={classnames(styles['steps-list'], 'z-depth-1')}>
                    {listSteps.map(::this.renderStep)}
                </div>
            </div>
        );
    }

    getStepNumber(index) {
        return index + 1;
    }

    renderStep(step, index) {
        let stepNumber = this.getStepNumber(index);
        return (
            <StepsListItem
                key={stepNumber}
                record={step}
                stepNumber={stepNumber}
                useChainedAttrs={this.props.useChainedAttrs}
                deleteStep={this.props.deleteStep} />
        );
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
