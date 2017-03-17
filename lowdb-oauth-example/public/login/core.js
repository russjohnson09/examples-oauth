var app = angular.module('login', []);

app.config(['$locationProvider', function($locationProvider) {
	$locationProvider.html5Mode({
		enabled: true
			// ,requireBase: false
	});
}]);

app.controller('mainController',function($rootScope, $scope, $location, $http) {
	$scope.formData = {};
	
	$scope.todos = [];
	
	var params = $location.search();
	
	console.log(params);

	$scope.login = function() {
		console.log($scope.formData);
		$http.post('/v1/login', $scope.formData).then(function successCallback(res) {
			console.log('success');
			console.log(res);
			console.log(res.status);
			console.log(res.data);
			if (res.status === 201) {
				if (!params.redirect_uri) {
					params.redirect_uri = '/profile';
				}
				console.log('redirect to '+params.redirect_uri)
				window.location = params.redirect_uri;
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
);
