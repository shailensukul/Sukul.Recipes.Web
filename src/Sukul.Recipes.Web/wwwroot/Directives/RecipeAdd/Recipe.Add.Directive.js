(function () {
    'use strict';

    var app = angular.module('AppDirectives');
    app.directive('ssrecipeadd', function ($compile) {
        return {
            restrict: 'E', //element
            scope: {
                //carrier: '='
            },
            templateUrl: '/Directives/RecipeAdd/Recipe.Add.html',
            replace: true,
            //require: 'ngModel',
            link: function ($scope, elem, attr, ctrl) {
                console.debug($scope);
                //var textField = $('input', elem).attr('ng-model', 'myDirectiveVar');
                // $compile(textField)($scope.$parent);
            },
            controller: Controller
        };
    });

    Controller.$inject = ['$scope', '$state', '$stateParams', 'Upload', 'RecipeService'];
    function Controller($scope, $state, $stateParams, Upload, RecipeService) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'Recipe Add Directive Controller';

        $scope.uploadPic = function (files) {
            $scope.formUpload = true;
            if (files != null) {
                RecipeService.SaveRecipeImage($scope.recipe.ID, files[0])
                .success(function (data) {
                    $scope.recipe.BlurbImage = RecipeService.GetImageURL($scope.recipe.ID, files[0]);
                    $scope.Error = false;
                })
                .error(function (data, status, headers, config) {
                    $scope.Error = true;
                    //_showValidationErrors($scope, data);
                    console.log(data);
                });
            }
        };

        $scope.AddIngredient = function () {
            if ($scope.recipe && $scope.recipe.Ingredients) {
                $scope.recipe.Ingredients.push("");
            }
        }

        $scope.RemoveIngredient = function () {
            if ($scope.recipe && $scope.recipe.Ingredients) {
                if ($scope.recipe.Ingredients.length > 0) {
                    $scope.recipe.Ingredients.splice(-1);
                }
            }
        }

        $scope.AddInstruction = function () {
            if ($scope.recipe && $scope.recipe.Instructions) {
                $scope.recipe.Instructions.push("");
            }
        }

        $scope.RemoveInstruction = function () {
            if ($scope.recipe && $scope.recipe.Instructions) {
                if ($scope.recipe.Instructions.length > 0) {
                    $scope.recipe.Instructions.splice(-1);
                }
            }
        }

        $scope.Save = function () {
            $scope.Error = false;

            RecipeService.SaveRecipe($scope.recipe.ID, $scope.recipe)
                .success(function (data) {
                    $scope.Error = false;
                    $state.go('recipe', { 'recipeId' : $scope.recipe.ID });
                })
                .error(function (data, status, headers, config) {
                    $scope.Error = true;
                    //_showValidationErrors($scope, data);
                    console.log(data);
            });
        }

        var AddRecipe = function () {
            $scope.recipe = {
                "ID": "NewRecipe",
                "Name": "",
                "PostDate": "2015-08-17T18:25:43.511Z",
                "BlurbImage": "/Data/Recipes/NewRecipe.Image.1.jpg",
                "Blurb": "",
                "Ingredients": [""],
                "Instructions": [""]
            };
        }
        AddRecipe();
    }
})();