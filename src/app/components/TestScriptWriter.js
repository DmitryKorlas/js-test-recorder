import React from 'react';
import * as visitorEvents from '../constants/VisitorEvents';

const bracketOpen = '&#123;';
const bracketClose = '&#125;';

export class TestScriptWriter extends React.Component {
    static propTypes = {
        steps: React.PropTypes.array.isRequired
    };

    renderEmptyState() {
        return (
            <p>nothing there</p>
        );
    }

    renderSteps(listSteps) {
        return listSteps.map(::this.renderStep);

    }

    renderStep(step, index) {
        let stepUI;
        switch (step.visitorAction) {
            case visitorEvents.CLICK:
               stepUI = (
                   <div key={index}>
                       <span>{index+1} <strong>click</strong></span>
                       <pre>
                           <code>
                               casper.then(function() &#123;
                                    this.click('{step.target.nodePath.join('::')}');
                               &#125;
                           </code>
                       </pre>
                   </div>
               );
            break;
            case visitorEvents.EDIT:
                stepUI = (
                    <div key={index}>
                        <span>{index+1} <strong>set text {step.data.value}</strong> </span>
                        {step.target.nodePath.join('::')}
                    </div>
                );
                break;
            default:
                stepUI = null;
            break;
        }
        return stepUI;
    }

    render() {
        let {steps} = this.props;
        return (
            <div>
                <div>Output:</div>
                {steps.length > 0 ? this.renderSteps(steps) : this.renderEmptyState()}
            </div>
        );
    }
}
