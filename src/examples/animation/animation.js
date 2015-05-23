
import angular from 'angular';

class ExampleCtrl {

    constructor() {
        this.items = ["One", "Two", "Three"];
        this.newItem = "Four";
    }

    addItem(item) {
        this.items.push(item);
        this.newItem = "";
    }

    removeItem(item) {
        var idx = this.items.indexOf(item);
        if(idx !== -1) {
            this.items.splice(idx, 1);
        }
    }
}

angular
    .module('exampleApp', [])
    .controller('exampleCtrl', [
        ExampleCtrl
    ]);

angular.bootstrap(document, ['exampleApp']);
