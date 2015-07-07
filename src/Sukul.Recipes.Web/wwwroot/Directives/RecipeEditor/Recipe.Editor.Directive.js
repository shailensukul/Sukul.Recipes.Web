(function () {
    'use strict';

    var app = angular.module('AppDirectives');
    app.directive('ssrecipeeditor', function ($compile) {
        return {
            restrict: 'E', //element
            scope: {
                //carrier: '='
            },
            templateUrl: '/Directives/RecipeEditor/Recipe.Editor.html',
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
        vm.title = 'Recipe Editor Directive Controller';

        $scope.AddIngredient = function () {
            $(".ingredient").clone().appendTo("#Ingredients");
        }
        $scope.AddInstruction = function () {
            $(".instruction").clone().appendTo("#Instructions");
        }

        $scope.GetJSON = function () {
            var output = "{\n"
            output += "\"Name\": \"" + $("#name").val() + "\"\n";
            output += "}\n"

            $("#output").val(output);
        }
    }
})();