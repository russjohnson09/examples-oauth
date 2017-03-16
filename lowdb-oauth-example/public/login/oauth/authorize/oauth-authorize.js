//https://gist.github.com/siberex/405ae3acf97b11b1cb44

var app = angular.module('oauth-authorize')
// .config(['$locationProvider', function($locationProvider) {
// 	$locationProvider.html5Mode({
// 		enabled: true
// 			// ,requireBase: false
// 	});
// }]);

// var AwesomeAppName = angular.module('awesomeApp', []);
// AwesomeAppName.config(['$locationProvider', function($locationProvider) {
// 	$locationProvider.html5Mode({
// 		enabled: true
// 			// ,requireBase: false
// 	});
// }]);


// AwesomeAppName.controller(
// 	'CtrlDoAwesomeness', ['$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {
// 		// Adding watcher
// 		$rootScope.$on("$locationChangeSuccess", function(event, next, current) {
// 			// Do stuff when location changed
// 			var url = decodeURIComponent($location.url());
// 			console.log("url: " + url);
// 			console.log("current location: " + current);
// 			console.log("location changed to: " + next);
// 		});
// 		$scope.ohMyButton = function(event) {
// 			console.log('Button clicked');
// 			$location.path('/some/another/location');
// 		};
// 	}]
// );

// function mainController($scope, $http) {
// 	$scope.user = {};

// 	console.log($location);


// 	$http.get('/v1/users/me').success(function(data) {
// 			$scope.user = data;
// 			console.log(data);
// 		})
// 		.error(function(data) {
// 			console.log('Error: ' + data);
// 			window.location = '/login';
// 		});

// }
