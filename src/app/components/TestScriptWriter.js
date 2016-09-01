import React from 'react';
import * as visitorEvents from '../constants/VisitorEvents';

import * as highlightJS from 'highlight.js';
import * as jsBbeautify from 'js-beautify';
import highlightJSStyles from 'highlight.js/styles/github.css';

export class TestScriptWriter extends React.Component {
    static propTypes = {
        steps: React.PropTypes.array.isRequired
    };

    renderEmptyState() {
        return null;
    }

    renderSteps(listSteps) {
        let code = listSteps.map(::this.renderStepText).join('');
        // TODO format delegate it to WebWorker
        let formattedCode = code;

        formattedCode = jsBbeautify.js_beautify(code);
        formattedCode = highlightJS.highlight('javascript', formattedCode, true).value;
        return (
            <div>
                <h4 className="header">Output:</h4>
                <pre><code dangerouslySetInnerHTML={{__html: formattedCode}}></code></pre>
            </div>
        );
    }

    renderStepText(step, index) {
        let stepOutput = `//step ${(index+1)}\n`;
        switch (step.visitorAction) {
            case visitorEvents.CLICK:
                stepOutput += `casper.then(function() {;
                                    this.click('${(step.target.nodePath.join('::'))}');
                               });\n`;
                break;

            // TODO step.data.value is unsafe. escape it
            case visitorEvents.EDIT:
                stepOutput += `casper.then(function() {;
                                    this.setValue('${(step.target.nodePath.join('::'))}', '${(step.data.value)}');
                               });\n`;
                break;
        }
        return stepOutput;
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
