
import "angular-material/angular-material.css!";
import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import ngMaterial from 'angular-material';

//__display__
class ExampleCtrl {

    constructor() {
        this.nextItemId = 0;
        this.items = [];
        ["one", "two", "three"].forEach(item => this.addItem(item));
    }

    get areItemsSelected() {
        return this.items.reduce((someSelected, item) => someSelected || item.isSelected, false);
    }

    addItem(text) {
        this.items.push({
            id: this.nextItemId += 1,
            text: text,
        });
        this.newItem = "";
    }

    removeSelectedItems() {
        this.items = this.items.filter(item => !item.isSelected);
    }
}

angular
    .module('exampleApp', ['ngMaterial'])
    .config([
        '$mdIconProvider',
        function($mdIconProvider) {
            $mdIconProvider
                .icon('delete', '/img/design/ic_delete_24px.svg');
        }
    ])
    .controller('exampleCtrl', [
        ExampleCtrl
    ]);
//__display__

angular.bootstrap(document, ['exampleApp']);
