// Declare app level module which depends on filters, and services
angular.module('sarah', ['ngMaterial', 'ngRoute']).config(['$routeProvider', '$locationProvider', '$mdThemingProvider', function($routeProvider, $locationProvider, $mdThemingProvider) {
	$routeProvider.when('/', {
		templateUrl: '/js/app/views/index.html',
		controller: 'IndexCtrl',
		controllerAs: 'ctrl'
	}).when('/lights', {
		templateUrl: '/js/app/views/lights.html',
		controller: 'LightsCtrl',
		controllerAs: 'ctrl'
	}).when('/music', {
		templateUrl: '/js/app/views/music.html',
		controller: 'MusicCtrl',
		controllerAs: 'ctrl'
	}).otherwise({
		redirectTo: '/'
	});

	$mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
}]).controller('MenuCtrl', function($scope, $timeout, $mdSidenav, $log) {
	var sidenav = $mdSidenav('left');
	$scope.navOpen = sidenav.isLockedOpen() || sidenav.isOpen();

	$scope.toggle = function() {
		sidenav.toggle().then(function() {
			var sidenav = $mdSidenav('left');
			$scope.navOpen = sidenav.isLockedOpen() || sidenav.isOpen();
		});
	};
}).controller('LightsCtrl', LightsCtrl)
		.controller('MusicCtrl', MusicCtrl)
		.controller('IndexCtrl', IndexCtrl);

angular.bootstrap(document, ['sarah']);
