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
            templateUrl: 'Directives/NavBar/NavBar.html',
            controller: NavbarController
        }
    });

    NavbarController.$inject = ['$scope', '$location', '$window'];
    function NavbarController($scope, $location, $window) {
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

        // Back button
        $("#btnBack").click(function () {
            $window.history.back();
        })

        // Fix for collapsing NavBar menu on click
        $('.navbar-collapse ul li a').on('click', function () {
            $(".btn-navbar").click(); //bootstrap 2.x
            $(".navbar-toggle").click() //bootstrap 3.x by Richard
        });
    }
})();