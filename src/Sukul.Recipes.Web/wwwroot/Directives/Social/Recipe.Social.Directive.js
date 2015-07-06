(function () {
    'use strict';

    var app = angular.module('AppDirectives');
    app.directive('ssrecipesocial', function ($compile) {
        return {
            restrict: 'E', //element
            scope: {
                //carrier: '='
            },
            templateUrl: '/Directives/Social/Recipe.Social.html',
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
        vm.title = 'Recipe Social Directive Controller';
            
    }
})();