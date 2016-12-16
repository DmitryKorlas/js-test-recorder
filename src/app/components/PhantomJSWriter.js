import React from 'react';
import * as visitorEvents from '../constants/VisitorEvents';
import {TestScriptWriter} from './TestScriptWriter';
export class PhantomJSWriter extends TestScriptWriter {

    renderStepText(step, index) {
        let stepOutput = `//step ${(index+1)}\n`;
        switch (step.visitorAction) {
            case visitorEvents.CLICK:
                stepOutput += `phantomJS.then(function() {;
                                    this.click('${(step.target.nodePath.join('::'))}');
                               });\n`;
                break;

            // TODO step.data.value is unsafe. escape it
            case visitorEvents.EDIT:
                stepOutput += `phantomJS.then(function() {;
                                    this.setValue('${(step.target.nodePath.join('::'))}', '${(step.data.value)}');
                               });\n`;
                break;
        }
        return stepOutput;
    }

}
