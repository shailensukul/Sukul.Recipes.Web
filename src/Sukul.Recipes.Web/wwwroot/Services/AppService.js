(function () {
    'use strict';

    angular
        .module('AppServices', [])
        .factory('RecipeService', RecipeService);

    RecipeService.$inject = ['$http', '$rootScope'];

    function RecipeService($http, $rootScope) {
        var RecipeServiceFactory = {}
        
        RecipeServiceFactory.GetRecipes = function () {
            return $http.get('/Data/recipes.json');
        }

        return RecipeServiceFactory;
    }
})();