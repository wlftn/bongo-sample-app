var busStopModule = angular.module('angularcourse-bus-stop', [])

/**
 * Defining a directive
 *
 * 1. Call exampleModule.directive('camelCasedSelector', definition)
 *
 *   `definition` can be complex, but the most common attrs are
 *      a. template OR templateUrl (specify a template or template url)
 *      b. controller (define a function to be used as a controller)
 *      c. controllerAs (a string - the name your markup can use to access the controller)
 *      d. restrict ('E' for an element, 'A' for an attribute)
 *      e. scope (essentially a list of parameters you'd like to pass in and out of the directive)
 *
 * 2. Use selector in markup.
 *   Note: `exampleDirectiveName` in javascript will become
 *         `example-directive-name` in markup. Forgetting this is a common source of head-scratching!
 */

busStopModule.directive('route', function () {
    return {
        restrict: 'E',

        // this links to an html template that can either be downloaded or preloaded.
        templateUrl: 'bongo/bus-stop/busRoute.html',
        // Our build script automatically preloads all html templates (and also compiles jade files to html, so
        // directives/bus-stop/busStop.jade is the source for this directives/bus-stop/busStop.html file.

        // you could also just declare the template inline
        // template: "<div>You could write HTML right here if you wanted to, useful for debugging</div>"

        controller: ['$scope', 'bongoService', function($scope, bongoService) {

            $scope.$watch('stopId', function(newStopId) {
                $scope.loading = true;
            });
            
            bongoService.stopList('iowa-city','10thst')
                    .then(function(stopList){
                        $scope.stops=stopList.data;
                
            });
            
        }]

    };

});

busStopModule.directive('busStop', function () {
    return {
        restrict: 'E',

        // this links to an html template that can either be downloaded or preloaded.
        templateUrl: 'bongo/bus-stop/busStop.html',
        // Our build script automatically preloads all html templates (and also compiles jade files to html, so
        // directives/bus-stop/busStop.jade is the source for this directives/bus-stop/busStop.html file.

        // you could also just declare the template inline
        // template: "<div>You could write HTML right here if you wanted to, useful for debugging</div>"

        // by declaring a scope property, we basically specify the parameters that should go in and out of the directive
        scope: {
            'stopId': '='
        },

        // this controller will automatically be instantiated for every instance of this directive. It's anonymous,
        // it doesn't need a name since it is defined right here, but you could also refer to a named controller
        // here if you wanted.
        controller: ['$scope', 'bongoService', 'favoriteService', 
            function($scope, bongoService, favoriteService) {

            $scope.makeFavorite = function () {
                $scope.isfavorite = !$scope.isfavorite;
                favoriteService.makeFavorite($scope.stopId) = !favoriteService.makeFavorite($scope.stopId);
            };

            $scope.$watch('stopId', function(newStopId) {
                $scope.loading = true;

                bongoService.stopInfo(newStopId).then(function(stop) {
                    $scope.loading = false;
                    $scope.stop = stop;
                });
            });

         
    

        }]
    };
});


/////FAVORITES DIRECTIVE/////////
busStopModule.directive('favorites', function () {
    return {
        restrict: 'E',
        templateUrl: 'bongo/bus-stop/favorites.html',
        

        controller: ['$scope', 'bongoService', 'favoriteService',
        function($scope, bongoService, favoriteService) {
            $scope.favorites = favoriteService.getFavorite ();

        }

        //bongoService.stopInfo(newStopId).then(function(stop) {
        //            $scope.stop = stop;
                
            //});

    
        ]
    };

})

busStopModule.service('favoriteService', function() {
    var favorites = {};

    // "this" refers to the service
    // call the following function as favoriteService.makeFavorite
    this.makeFavorite = function(stopId) {
        favorites[stopId] = true;
        console.log("Current Favorites...: ", favorites);
    };

    this.getFavorite = function() {
        return favorites;
    };

    //this.removeFavorite = function(stopId) {
    //    favorites[stopId] = true;
    //    console.log("Current Favorites...: ", favorites);
    //};



});

// A "SERVICE"!
//var favorites = {};
//function makeFavoriteService(stopId) {
    //favorites[stopId] = true;
    //console.log("CURRENT FAVORITES: ");
    //console.log(favorites);
    //save to local storage
    //save to your database server
//}

module.exports = busStopModule.name;