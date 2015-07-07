(function () {
    'use strict';
    var app = angular.module('SukulRecipesApp', ['ui.router', 'djds4rce.angular-socialshare', 'AppServices', 'AppControllers',
        'AppDirectives']);

    app.config(config);
    app.run(run);

    $(window).on('hashchange', function () {
            ga('send', 'pageview', {
                'page': location.pathname + location.search + location.hash
            });
    })
    
    run.$inject = ['$FB']
    function run($FB) {
        $FB.init('690126764452239');
    }

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
            .state('about', {
                name: 'about',
                url: '/about',
                templateUrl: '/Views/Profile.html',
                controller: 'BaseController',
                parent: null
            })
            .state('recipe', {
                name: 'recipe',
                url: '/recipe/{recipeId}',
                templateUrl: '/Views/Recipe.html',
                controller: 'BaseController',
                parent: null
            })
            .state('recipeeditor', {
                name: 'recipeeditor',
                url: '/recipeeditor',
                templateUrl: '/Views/RecipeEditor.html',
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
        $locationProvider.hashPrefix('!');
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