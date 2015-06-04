
import angular from 'angular';

//__display__
class ExampleCtrl {

    constructor() {
        this.nextItemId = 0;
        this.items = [];
        ["one", "two", "three"].forEach(item => this.addItem(item));
    }

    addItem(text) {
        this.items.push({
            id: this.nextItemId += 1,
            text: text,
        });
        this.newItem = "";
    }

    removeItem(item) {
        var idx = this.items.indexOf(item);
        if(idx !== -1) {
            this.items.splice(idx, 1);
        }
    }
}
//__display__

angular
    .module('exampleApp', [])
    .controller('exampleCtrl', [
        ExampleCtrl
    ]);

angular.bootstrap(document, ['exampleApp']);
