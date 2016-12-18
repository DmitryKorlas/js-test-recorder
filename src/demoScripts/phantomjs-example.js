'use strict';
// run it via $ ./node_modules/.bin/phantomjs phantomejs-example.js

var Promise = require('bluebird');

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
                console.log('check');
                return page.evaluate(function(nodeSelector) { // selector should be passed trough args
                    return !!document.querySelector(nodeSelector);
                }, selector);
            },
            success: resolve,
            error: function() {
                reject('can\'t find "'+ selector+ '"');
            }
        })
    })
}

var page = require('webpage').create();
page.settings.userAgent = 'SpecialAgent';
page.clipRect = { top: 0, left: 0, width: 1024, height: 768 };
page.onConsoleMessage = function(msg) {
    console.log(msg);
};

page.open('https://developer.mozilla.org/en-US/docs/Web/JavaScript', function(status) {
    // Check for page load success
    if (status !== 'success') {
        console.log('Unable to access network');
        phantom.exit();
    } else {
        page.includeJs('https://cdnjs.cloudflare.com/ajax/libs/jquery/1.6.1/jquery.min.js', function() {

            waitForSelector('#main-q')
                .then(function () {
                    page.evaluate(function() {
                        document.querySelector('#main-q').click();
                    });
                    console.log('#main-q exists');
                })
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
