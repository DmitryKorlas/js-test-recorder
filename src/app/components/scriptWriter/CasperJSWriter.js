import React from 'react';
import * as visitorEvents from '../../constants/VisitorEvents';
import {TestScriptWriter} from './TestScriptWriter';
export class CasperJSWriter extends TestScriptWriter {

    decorateScriptBody(code, steps) {
        let startURL = steps[0].target.url;

        return `
        // CasperJSWriter begin
        var casper = require('casper').create();
        casper.start('${startURL}');
         
        ${code}
        
        casper.run();
        // CasperJSWriter end
        `;
    }

    formatWaitForSelectorClause(selector) {
        return `
            casper.then(function() {
                this.waitForSelector('${selector}')
            });
        `;
    }

    renderStepText(step, index) {
        let stepOutput = `//step ${(index+1)}`;
        let selector = this.getDOMNodeSelector(step);

        switch (step.visitorAction) {
            case visitorEvents.CLICK:
                stepOutput += this.formatWaitForSelectorClause(selector);
                stepOutput += `casper.then(function() {
                                    this.click('${selector}');
                               });\n`;
                break;

            // TODO step.data.value is unsafe. escape it
            case visitorEvents.EDIT:
                stepOutput += this.formatWaitForSelectorClause(selector);
                stepOutput += `casper.then(function() {
                                    this.evaluate(function() {
                                        document.querySelector('${selector}').value = '${step.data.value}';
                                    });
                               });\n`;
                break;
        }
        return stepOutput;
    }

}
