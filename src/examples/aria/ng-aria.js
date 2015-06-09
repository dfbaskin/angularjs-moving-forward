
import "bootstrap/css/bootstrap.css!";
import angular from 'angular';
import ngMessages from 'angular-messages';
import ngAria from 'angular-aria';

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

//__display__
angular
    .module('exampleApp', ['ngMessages', 'ngAria'])
//__display__
    .directive('userNameExists', [
        '$q',
        '$timeout',
        AsyncUserNameValidator
    ])
    .controller('exampleCtrl', [
        ExampleCtrl
    ]);

angular.bootstrap(document, ['exampleApp']);
