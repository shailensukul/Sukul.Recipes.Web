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

        // http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        RecipeServiceFactory.Shuffle = function shuffle(array) {
            var currentIndex = array.length
              , temporaryValue
              , randomIndex
            ;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

        RecipeServiceFactory.GetRecipe = function (recipeId) {
            var recipe = '/Data/Recipes/' + recipeId + '.Recipe.json'
            return $http.get(recipe);
        }

        RecipeServiceFactory.GetImageURL = function (recipeId, file) {
            return '/Data/Recipes/' + recipeId + '.Image.1.' + file.name.split('.').pop();
        }

        RecipeServiceFactory.UpdateRecipes = function (recipe) {
            // grab the file
            var recipesPath = '/Data/recipes.json';

            // grab teh recipes listing JSON file
            return $http.get(recipesPath)
                .success(function (recipes) {
                    if (recipes.length > 0) {
                        var i = recipes.length;
                        var found = false;
                        // Check to see if the recipe already exists in the list
                        while (i--) {
                            if (recipes[i].ID == recipe.ID) {
                                // recipe exits, do an update
                                found = true;
                                recipes[i].Name = recipe.Name;
                                recipes[i].Blurb = recipe.Blurb;
                                recipes[i].BlurbImage = recipe.BlurbImage;
                                break;
                            }
                        }
                        if (!found) {
                            // recipe does not exist. Do an insert
                            var newRecipe = {
                                "ID": recipe.ID,
                                "Name": recipe.Name,
                                "Link": "/Data/Recipes/" + recipe.ID + ".Recipes.json",
                                "Blurb": recipe.Blurb,
                                "BlurbImage": recipe.BlurbImage
                            }
                            recipes.push(newRecipe);
                        }
                        // Save the updated recipes list
                        recipesPath = 'http://recipes.sukul.org.s3.amazonaws.com' + '/Data/recipes.json';
                        $http.put(recipesPath, recipes, {
                            headers: { 'x-amz-acl': 'bucket-owner-full-control' }
                        }
                );
                    }
                })
                .error(function (data, status, headers, config) {
                    $scope.Error = true;
                    //_showValidationErrors($scope, data);
                    console.log(data);
                });
        }

        RecipeServiceFactory.SaveRecipeImage = function (recipeId, file) {
            var recipepath =
               'http://recipes.sukul.org.s3.amazonaws.com' +
               '/Data/Recipes/' + recipeId + '.Image.1.' + file.name.split('.').pop()
            return $http.put(recipepath,
                file, {
                    headers: { 'x-amz-acl': 'bucket-owner-full-control' }
                }
                );
        }

        RecipeServiceFactory.SaveRecipe = function (recipeId, recipe) {
            var recipepath =
                'http://recipes.sukul.org.s3.amazonaws.com' +
                '/Data/Recipes/' + recipeId + '.Recipe.json'
            RecipeServiceFactory.UpdateRecipes(recipe);
            return $http.put(recipepath,
                recipe, {
                    headers: { 'x-amz-acl': 'bucket-owner-full-control' }
                }
                );
        }

        return RecipeServiceFactory;
    }
})();