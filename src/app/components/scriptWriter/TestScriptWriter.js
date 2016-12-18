import React from 'react';
import * as visitorEvents from '../../constants/VisitorEvents';

import * as highlightJS from 'highlight.js';
import * as jsBeautify from 'js-beautify';
import highlightJSStyles from 'highlight.js/styles/github.css';

export class TestScriptWriter extends React.Component {
    static propTypes = {
        steps: React.PropTypes.array.isRequired,
        showHeaderFooter: React.PropTypes.bool,
        syntaxHighlight: React.PropTypes.bool
    };

    static defaultProps = {
        showHeaderFooter: true,
        syntaxHighlight: true
    };

    renderEmptyState() {
        return null;
    }

    renderTestScript(listSteps) {
        let code = listSteps.map(::this.renderStepText).join('');
        // TODO format delegate it to WebWorker

        if (this.props.showHeaderFooter) {
            code = this.decorateScriptBody(code, listSteps);
        }

        let formattedCode = code;
        if (this.props.syntaxHighlight) {
            formattedCode = jsBeautify.js_beautify(code);
            formattedCode = highlightJS.highlight('javascript', formattedCode, true).value;
        }

        return (
            <div>
                <h4 className="header">Output:</h4>
                <pre><code dangerouslySetInnerHTML={{__html: formattedCode}}></code></pre>
            </div>
        );
    }

    getDOMNodeSelector(step) {
        const attrName = 'data-test-automation-id';
        return step.target.nodePath.map(item => {return `//[${attrName}="item"]`})
            .join(' ');
    }

    decorateScriptBody(code) {
        throw new Error('decorateScriptBody should be defined in subclass!');
    }

    renderStepText(step, index) {
        throw new Error('renderStepText should be defined in subclass!');
    }

    render() {
        let {steps} = this.props;
        return (
            <div>
                {steps.length > 0 ? this.renderTestScript(steps) : this.renderEmptyState()}
            </div>
        );
    }
}
