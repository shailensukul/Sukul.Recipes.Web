(function () {
    'use strict';

    /**
 * Angled Navbar Directive
 *
 * @requires: ngSanitize, Bootstrap 3 (jQuery & Bootstrap's JS - responseive features require the inclusion of the Bootstrap JS)
 **/

    var app = angular.module('AppDirectives');
    app.directive('ttnavbar', function () {
        return {
            restrict: 'E',
            scope: {
            },
            templateUrl: 'Directives/navbar/navbar.html',
            controller: NavbarController
        }
    });

    NavbarController.$inject = ['$scope', '$location'];
    function NavbarController($scope, $location) {
        $scope.SearchKeyword = "";
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $scope.Search = function (event) {
            $location.path('/search').search("search", $scope.SearchKeyword);
            event.preventDefault();

        }

        $scope.isActive = function (viewLocation) {
            var active = (viewLocation === $location.url());
            return active;
        };
    }
})();