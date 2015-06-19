(function () {
    'use strict';

    var app = angular.module('AppDirectives');
    app.directive('ssrecipelist', function ($compile) {
        return {
            restrict: 'E', //element
            scope: {
                //carrier: '='
            },
            templateUrl: '/Directives/RecipesList/Recipes.List.html',
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

    Controller.$inject = ['$scope', 'RecipeService'];
    function Controller($scope, RecipeService) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'Recipes List Directive Controller';

        var GetRecipes = function () {
            RecipeService.GetRecipes().success(function (data) {
                $scope.recipes = data;
            }).error(function (data, status, headers, config) {
                //_showValidationErrors($scope, data);
                console.log(data);
            });
        }
        GetRecipes();
    }
})();