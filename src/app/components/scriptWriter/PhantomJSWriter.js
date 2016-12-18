import React from 'react';
import * as visitorEvents from '../../constants/VisitorEvents';
import {TestScriptWriter} from './TestScriptWriter';
import {extractFunctionCode, substituteImports} from '../../utils/functions';

// TODO make it clearer
const SCRIPT_HEAD = `
    var Promise = require("bluebird");

    // thanks to http://stackoverflow.com/a/19070446
    function waitFor(config) {
        config._start = config._start || new Date();

        if (config.timeout && new Date - config._start > config.timeout) {
            if (config.error) config.error();
            if (config.debug) console.log('timedout ' + (new Date - config._start) + 'ms');
            return;
        }

        if (config.check()) {
            if (config.debug) console.log('success ' + (new Date - config._start) + 'ms');
            return config.success();
        }

        setTimeout(waitFor, config.interval || 0, config);
    }

    function waitForSelector(selector) {
        return new Promise(function(resolve, reject) {
            waitFor({
                debug: true,  // optional
                interval: 100,  // optional
                timeout: 1000,  // optional
                check: function () {
                    return page.evaluate(function(nodeSelector) { // selector should be passed trough args
                        return !!document.querySelector(nodeSelector);
                    }, selector);
                },
                success: resolve,
                error: function() {
                    reject('can not find "'+ selector+ '"');
                }
            })
        })
    }

    var page = require("webpage").create();
    page.settings.userAgent = 'SpecialAgent';
    page.clipRect = { top: 0, left: 0, width: 1024, height: 768 };
    page.onConsoleMessage = function(msg) {
        console.log(msg);
    }
`;

export class PhantomJSWriter extends TestScriptWriter {

    decorateScriptBody(code, steps) {
        let startURL = steps[0].target.url;

        let scriptHead = `
        // phantomJS begin
        ${SCRIPT_HEAD}

        page.open('${startURL}', function (status) {
            // Check for page load success
            if (status !== 'success') {
                console.log('Unable to access network');
                phantom.exit();
            } else {
                page.includeJs('https://cdnjs.cloudflare.com/ajax/libs/jquery/1.6.1/jquery.min.js', function() {
                    Promise.resolve()
        `;

        let scriptTail = `
        .then(function () {
                    console.log('test done');
                    phantom.exit();
                })
                .catch(function(reason) {
                    console.log('test fault', reason);
                    phantom.exit();
                });
                });
            }
        });
        
        // phantomJS end
        `;

        return `
            ${scriptHead}
            ${code}
            ${scriptTail}
        `;
    }

    formatWaitForSelectorClause(selector) {
        return `.then(function() {
                    return waitForSelector('${selector}');
                })\n`;
    }

    renderStepText(step, index) {
        let stepOutput = `// step ${(index+1)}\n`;
        let selector = this.getDOMNodeSelector(step);
        switch (step.visitorAction) {
            case visitorEvents.CLICK:
                stepOutput += this.formatWaitForSelectorClause(selector);
                stepOutput += `.then(function() {
                        page.evaluate(function() {
                            document.querySelector('${selector}').click();
                       });
                    })\n`;
                break;

            // TODO step.data.value is unsafe. escape it
            case visitorEvents.MUTATE_TEXT_FIELD:
                stepOutput += this.formatWaitForSelectorClause(selector);
                stepOutput += `.then(function() {
                        page.evaluate(function() {
                            document.querySelector('${selector}').value = '${step.data.value}';
                        });
                    })\n`;
                break;
            case visitorEvents.MUTATE_DROPDOWN:
                stepOutput += this.formatWaitForSelectorClause(selector);
                stepOutput += `.then(function() {
                        page.evaluate(function() {
                            document.querySelector('${selector}').selectedIndex = '${step.data.selectedIndex}';
                        });
                    })\n`;
                break;
            default:
                stepOutput += `// unknown step action ${step.visitorAction}\n`;
                break;
        }
        return stepOutput;
    }

}
