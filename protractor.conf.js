require('babel/register');

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    framework: 'jasmine2',
    jasmineNodeOpts: {
        isVerbose: true,
        showTiming: true,
        includeStackTrace: true,
        showColors: true
    },
    baseUrl: 'http://localhost:3000',
    specs: [
        'tests/protractor/*.js'
    ]
};
