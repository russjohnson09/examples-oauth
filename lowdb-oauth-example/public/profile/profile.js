var scotchTodo = angular.module('profile', []);

function mainController($scope, $http) {
	$scope.formData = {};


	$scope.user = {};

	$http.get('/v1/users/me').success(function(data) {
			$scope.user = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
			window.location = '/login';
		});

}
