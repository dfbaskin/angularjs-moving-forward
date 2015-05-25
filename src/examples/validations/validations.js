
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

angular
    .module('exampleApp', [])
    .controller('exampleCtrl', [
        ExampleCtrl
    ]);

angular.bootstrap(document, ['exampleApp']);
