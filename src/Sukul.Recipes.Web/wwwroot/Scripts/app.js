(function () {
    'use strict';
    var app = angular.module('SukulRecipesApp', ['ui.router', 'AppServices', 'AppControllers',
        'AppDirectives']);

    app.config(config);

    config.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    function config($locationProvider, $stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            // HOME STATES AND NESTED VIEWS ========================================
            .state('home', {
                name: 'home',
                url: '/',
                templateUrl: '/Views/Landing.html',
                controller: 'BaseController'
            })
            .state('recipe', {
                name: 'recipe',
                url: '/recipe/{recipeId}',
                templateUrl: '/Views/Recipe.html',
                controller: 'BaseController',
                parent: null
            })
            .state('poultrynutrition', {
                name: 'poultrynutrition',
                url: '/nutrition/poultry',
                templateUrl: '/Views/PoultryNutrition.html',
                controller: 'BaseController',
                parent: null
            })
            .state('redmeatnutrition', {
                name: 'redmeatnutrition',
                url: '/nutrition/redmeat',
                templateUrl: '/Views/RedMeatNutrition.html',
                controller: 'BaseController',
                parent: null
            })
            .state('seafoodnutrition', {
                name: 'seafoodnutrition',
                url: '/nutrition/seafood',
                templateUrl: '/Views/SeafoodNutrition.html',
                controller: 'BaseController',
                parent: null
            })
            .state('links', {
                name: 'links',
                url: '/links',
                templateUrl: '/Views/Links.html',
                controller: 'BaseController'
            })
        ;

        $locationProvider.html5Mode(true);

    }

    //config.$inject = ['$routeProvider', '$locationProvider'];

    //function config($routeProvider, $locationProvider) {
    //    $routeProvider
    //         .when('/', {
    //             templateUrl: '/Views/Landing.html',
    //             controller: "BaseController"
    //         })
    //        .otherwise(
    //        {
    //            redirectTo: '/'
    //        });
    //     $locationProvider.html5Mode(true);
    //}
})();