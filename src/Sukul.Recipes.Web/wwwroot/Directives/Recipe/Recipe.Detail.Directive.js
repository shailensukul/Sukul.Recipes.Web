(function () {
    'use strict';

    var app = angular.module('AppDirectives');
    app.directive('ssrecipedetail', function ($compile) {
        return {
            restrict: 'E', //element
            scope: {
                //carrier: '='
            },
            templateUrl: '/Directives/Recipe/Recipe.Detail.html',
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

    Controller.$inject = ['$scope', '$stateParams', 'RecipeService'];
    function Controller($scope, $stateParams, RecipeService) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'Recipe Detail Directive Controller';

        var GetRecipe = function () {
            RecipeService.GetRecipe($stateParams.recipeId).success(function (data) {
                $scope.recipe = data;
            }).error(function (data, status, headers, config) {
                //_showValidationErrors($scope, data);
                console.log(data);
            });
        }
        GetRecipe();
    }
})();