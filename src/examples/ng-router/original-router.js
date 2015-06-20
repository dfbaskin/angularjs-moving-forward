
import "bootstrap/css/bootstrap.css!";
import angular from 'angular';
import 'angular-route';
import _ from 'lodash';

//__display__
class PlantsDataService {

    constructor($http) {
        this.$http = $http;
    }

    fetchPlantData() {
        // Original file from http://www.plants.usda.gov/dl_all.html
        var self = this;
        return this.$http({
            method: 'GET',
            url: 'USDA-Plants-db.txt',
            cache: true
        }).then(function(result) {
            var plantData = self._transformPlantData(result.data);
            var familyData = self._groupPlantFamilies(plantData);
            return {
                plants: plantData,
                families: familyData
            };
        });
    }

    _transformPlantData(data) {
        return _(data.split(/\r*\n/))
            .drop(1)
            .map(function(ln) {
                var fields = _.map(ln.split(/","/), function(f) { return _.trim(f, '"'); });
                return {
                    symbol: fields[0],
                    synonymSymbol: fields[1] || null,
                    scientificName: fields[2],
                    commonName: fields[3] || null,
                    family: fields[4] || null
                };
            })
            .value();
    }

    _groupPlantFamilies(plantData) {
        return this.plantFamilies = _(plantData)
            .filter(function(d) {
                return d.family;
            })
            .groupBy(function(d) {
                return d.family;
            })
            .map(function(v, k) {
                return {
                    name: k,
                    plants: v
                };
            })
            .value();
    }
}

class ExampleCtrl {
    constructor($location, plantData) {
        var self = this;
        self.$location = $location;
        plantData.fetchPlantData().then(function(data) {
            self.data = data;
        });
    }
    get currentRoute() {
        return this.$location.path();
    }
}

class PlantsCtrl {
    constructor(plantData) {
        var self = this;
        plantData.fetchPlantData().then(function(data) {
            self.data = data;
        });
    }
}

class PlantFamiliesCtrl {
    constructor(plantData) {
        var self = this;
        plantData.fetchPlantData().then(function(data) {
            self.data = data;
        });
    }
}

class PlantDetailsCtrl {
    constructor($routeParams, plantData) {
        var self = this;
        plantData.fetchPlantData().then(function(data) {
            self.plant = _.find(data.plants, function(p) {
                return p.symbol === $routeParams.plantId;
            });
        });
    }
}

angular
    .module('exampleApp', ['ngRoute'])
    .service('plantData', ['$http', PlantsDataService])
    .controller('exampleCtrl', ['$location', 'plantData', ExampleCtrl])
    .controller('plantsCtrl', ['plantData', PlantsCtrl])
    .controller('plantFamiliesCtrl', ['plantData', PlantFamiliesCtrl])
    .controller('plantDetailsCtrl', ['$routeParams', 'plantData', PlantDetailsCtrl])
    .config([
        '$routeProvider',
        '$locationProvider',
        function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/plants', {
                    templateUrl: 'original-router-plants.html',
                    controller: 'plantsCtrl',
                    controllerAs: 'plants'
                })
                .when('/plants/:plantId', {
                    templateUrl: 'original-router-plant-detail.html',
                    controller: 'plantDetailsCtrl',
                    controllerAs: 'details'
                })
                .when('/families', {
                    templateUrl: 'original-router-families.html',
                    controller: 'plantFamiliesCtrl',
                    controllerAs: 'families'
                })
                .otherwise('/plants');
            $locationProvider.html5Mode(true);
        }]);
//__display__

angular.bootstrap(document, ['exampleApp']);
