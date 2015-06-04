
import "bootstrap/css/bootstrap.css!";
import angular from 'angular';
import uiBootstrap from 'angular-bootstrap/ui-bootstrap-tpls';

//__display__
class ExampleCtrl {

    constructor() {
        this.dateFormat = 'dd-MMMM-yyyy';
        this.dateOptions = { };
        this.isDateEditorOpened = false;
        this.resetForm();
    }

    openDateEditor($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.isDateEditorOpened = true;
    }

    submitForm() {
        this.isCollapsed = false;
    }

    resetForm() {
        this.userName = "John Doe";
        this.birthDate = new Date();
        this.isCollapsed = true;
    }
}

angular
    .module('exampleApp', ['ui.bootstrap'])
    .controller('exampleCtrl', [
        ExampleCtrl
    ]);
//__display__

angular.bootstrap(document, ['exampleApp']);
