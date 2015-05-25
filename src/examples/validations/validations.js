
import "bootstrap/css/bootstrap.css!";
import angular from 'angular';

class ExampleCtrl {

    constructor() {
        this.userName = "Joe";
        this.emailAddr = "test@mail.com";
    }

    submitForm() {
        // submitted ...
    }

}

function AsyncUserNameValidator($q, $timeout) {

    return {
        require: 'ngModel',
        link: function($scope, element, attrs, ngModel) {
            ngModel.$asyncValidators.available = function(userName) {
                // Simulate a call to a back-end service
                return $timeout(() =>
                    (userName.toLowerCase() !== "user") ?
                        $q.when(true) :
                        $q.reject(),
                2000);
            };
        }
    }
}

angular
    .module('exampleApp', [])
    .directive('userNameExists', [
        '$q',
        '$timeout',
        AsyncUserNameValidator
    ])
    .controller('exampleCtrl', [
        ExampleCtrl
    ]);

angular.bootstrap(document, ['exampleApp']);
