
import "bootstrap/css/bootstrap.css!";
import angular from 'angular';
import 'angular-ui-router';
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
            url: '../ng-router/USDA-Plants-db.txt',
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

class PlantDetailsCtrl {
    constructor($state, plantData) {
        var self = this;
        plantData.fetchPlantData().then(function(data) {
            self.plant = _.find(data.plants, function(p) {
                return p.symbol === $state.params.plantId;
            });
        });
    }
}

class PlantFamiliesCtrl {
    constructor($state, plantData) {
        var self = this;
        self.$state = $state;
        plantData.fetchPlantData().then(function(data) {
            self.data = data;
        });
    }
    get familySearchText() {
        return this.$state.current.data.familySearchText;
    }
    set familySearchText(value) {
        this.$state.current.data.familySearchText = value;
    }
    get isFamilySearchActive() {
        return this.$state.is("families");
    }
    goToFamilyState() {
        this.$state.go('families');
    }
}

class FamilyDetailsCtrl {
    constructor($state, plantData) {
        var self = this;
        $state.current.data.familySearchText = $state.params.familyName;
        plantData.fetchPlantData().then(function(data) {
            self.family = _.find(data.families, function(f) {
                return f.name === $state.params.familyName;
            });
        });
    }
}

angular
    .module('exampleApp', ['ui.router'])
    .service('plantData', ['$http', PlantsDataService])
    .controller('exampleCtrl', ['$location', 'plantData', ExampleCtrl])
    .controller('plantsCtrl', ['plantData', PlantsCtrl])
    .controller('plantFamiliesCtrl', ['$state', 'plantData', PlantFamiliesCtrl])
    .controller('plantDetailsCtrl', ['$state', 'plantData', PlantDetailsCtrl])
    .controller('familyDetailsCtrl', ['$state', 'plantData', FamilyDetailsCtrl])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        ($stateProvider, $urlRouterProvider, $locationProvider) => {
            $urlRouterProvider.otherwise("/plants");
            $stateProvider
                .state('plants', {
                    url: "/plants",
                    templateUrl: 'ui-router-plants.html',
                    controller: 'plantsCtrl',
                    controllerAs: 'plants'
                })
                .state('plant-details', {
                    url: "/plants/:plantId",
                    templateUrl: 'ui-router-plant-detail.html',
                    controller: 'plantDetailsCtrl',
                    controllerAs: 'details'
                })
                .state('families', {
                    url: "/families",
                    templateUrl: 'ui-router-families.html',
                    controller: 'plantFamiliesCtrl',
                    controllerAs: 'families',
                    data: {
                        searchText: ""
                    }
                })
                .state('families.family', {
                    url: "/families/:familyName",
                    templateUrl: 'ui-router-family-detail.html',
                    controller: 'familyDetailsCtrl',
                    controllerAs: 'family'
                })
                .state('bing', {
                    url: "/bing/:plantId",
                    templateProvider: [
                        '$stateParams',
                        'plantData',
                        ($stateParams, plantData) => {
                            return plantData
                                .fetchPlantData()
                                .then(function(data) {
                                    var plant = _.find(data.plants, function(p) {
                                        return p.symbol === $stateParams.plantId;
                                    });
                                    if(!plant) {
                                        return "<p>Not Found.</p>";
                                    }
                                    return [
                                        '<iframe src="https://www.bing.com/images/search?q=',
                                        encodeURI(plant.scientificName),
                                        '"></iframe>'
                                    ].join("");
                                });
                        }
                    ]
                })
                .state('usda', {
                    url: "/usda/:plantId",
                    templateProvider: [
                        '$stateParams',
                        $stateParams => {
                            return [
                                '<iframe src="http://www.plants.usda.gov/core/profile?symbol=',
                                $stateParams.plantId,
                                '"></iframe>'
                            ].join("");
                        }
                    ]
                });
            $locationProvider.html5Mode(true);
        }])
//__display__
    .run(['$rootScope', '$log', ($rootScope, $log) => {
        $rootScope.$on("$stateChangeSuccess", $log.info.bind($log));
        $rootScope.$on("$stateChangeError", $log.error.bind($log));
    }]);

angular.bootstrap(document, ['exampleApp']);
