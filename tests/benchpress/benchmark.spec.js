
var benchpress = require('benchpress');

var runner = new benchpress.Runner([
    benchpress.SeleniumWebDriverAdapter.PROTRACTOR_BINDINGS,
    benchpress.Validator.bindTo(benchpress.RegressionSlopeValidator),
    benchpress.bind(benchpress.RegressionSlopeValidator.SAMPLE_SIZE).toValue(20),
    benchpress.bind(benchpress.RegressionSlopeValidator.METRIC).toValue('scriptTime'),
    benchpress.bind(benchpress.Options.FORCE_GC).toValue(true)
]);

describe('complex html', function() {

    it('should be fast.', function(done) {

        browser.ignoreSynchronization = true;
        browser.get('http://localhost:3000/tests/benchpress/test-file.html');

        runner.sample({
            id: 'test-file',
            prepare: function () {
                $('#reset').click();
            },
            execute: function() {
                $('#fill').click();
            }
        }).then(done, done.fail);
    });
});
