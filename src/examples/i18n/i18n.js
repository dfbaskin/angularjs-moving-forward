
import "bootstrap/css/bootstrap.css!";

import angular from 'angular';

class ExampleCtrl {

    constructor($interval, $locale, $window) {

        this.$locale = $locale;
        this.$window = $window;

        this.languages = [
            { name: 'English', isoCode: 'en-US' },
            { name: 'Spanish', isoCode: 'es-ES' },
            { name: 'French', isoCode: 'fr-FR' }
        ];

        switch(this.currentLocale.id) {
            case 'es-es':
                this.selectedLanguage = this.languages[1];
                break;
            case 'fr-fr':
                this.selectedLanguage = this.languages[2];
                break;
            default:
                this.selectedLanguage = this.languages[0];
                break;
        }
        this.amount = 1234567.89;
        this.count = 1;

        this.setCurrentDateTime();
        $interval(() => this.setCurrentDateTime(), 1000);
    }

    setCurrentDateTime() {
        this.currentDateTime = new Date();
    }

    get currentLocale() {
        return this.$locale;
    }

    changeLanguage() {
        this.$window.location = './i18n-' + this.selectedLanguage.isoCode.toLowerCase() + '.html';
    }
}

angular
    .module('exampleApp', [])
    .controller('exampleCtrl', [
        '$interval',
        '$locale',
        '$window',
        ExampleCtrl
    ]);

angular.bootstrap(document, ['exampleApp']);
