var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
	$scope.formData = {};
	
	$scope.todos = [];

	$scope.login = function() {
		console.log($scope.formData);
		$http.post('/v1/login', $scope.formData).then(function successCallback(res) {
			console.log('success');
			console.log(res);
			console.log(res.status);
			console.log(res.data);
			if (res.status === 201) {
				console.log('redirect to /profile')
				window.location = '/profile';
			}
		},
		function errorCallback(res) {
			console.log(res.status);
			
			
		});
			// .success(function(data) {
			// 	$scope.formData = {}; // clear the form so our user is ready to enter another
			// 	$scope.todos = data;
			// 	console.log(data);
			// })
			// .error(function(data) {
			// 	console.log('Error: ' + data);
			// });
	}

	// $scope.login = function() {
	// 	console.log($scope.formData);
	// 	$http.post('/v1/login', $scope.formData)
	// 		.success(function(data) {
	// 			$scope.formData = {}; // clear the form so our user is ready to enter another
	// 			$scope.todos = data;
	// 			console.log(data);
	// 		})
	// 		.error(function(data) {
	// 			console.log('Error: ' + data);
	// 		});
	// }

}
