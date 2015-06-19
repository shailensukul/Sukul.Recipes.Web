(function () {
    'use strict';
    var app = angular.module('SukulRecipesApp', ['ngRoute', 'AppServices', 'AppControllers',
        'AppDirectives', 'chieffancypants.loadingBar', 'ngAnimate', 'ui.grid']);

    app.config(config);

    config.$inject = ['$routeProvider', '$locationProvider'];

    function config($routeProvider, $locationProvider) {
        $routeProvider
             .when('/', {
                 templateUrl: '/Views/Landing.html',
                 controller: "BaseController"
             })
            .otherwise(
            {
                redirectTo: '/'
            });
         $locationProvider.html5Mode(true);
    }
})();