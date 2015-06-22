(function () {
    'use strict';

    angular
        .module('AppControllers', ['ui.bootstrap', 'AppServices'])
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
    BaseController.$inject = ['$scope'];
    function BaseController($scope) {
        $scope.title = 'Base Controller';
        
    }

    /* Header Controller*/
    HeaderController.$inject = ['$scope'];
    function HeaderController($scope) {
        $scope.title = 'Header Controller';
        //$scope.isActive = function (viewLocation) {
        //    var active = (viewLocation === $location.url());
        //    return active;
        //};
    }
})();
