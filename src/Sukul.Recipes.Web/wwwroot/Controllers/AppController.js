(function () {
    'use strict';

    angular
        .module('AppControllers', ['ngRoute', 'ui.bootstrap', 'AppServices', 'ui.grid', 'ui.grid.selection'])
        .controller('HeaderController', HeaderController)
        .controller('BaseController', BaseController)
    ;
    function _ShowValidationErrors(err) {
        if (err.ExceptionAsString && err.ExceptionAsString != null) {
            $("#validationErrors").text(err.ExceptionAsString);
        }
        if (err.Message) {
            $("#validationErrors").text(err.Message);
        }
    }

    /* Base Controller*/
    BaseController.$inject = ['$scope', '$location'];
    function BaseController($scope, $location) {
        $scope.title = 'Base Controller';
        
    }

    /* Header Controller*/
    HeaderController.$inject = ['$scope', '$location'];
    function HeaderController($scope, $location) {
        $scope.title = 'Header Controller';
        $scope.isActive = function (viewLocation) {
            var active = (viewLocation === $location.url());
            return active;
        };
    }
})();
