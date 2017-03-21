//https://gist.github.com/siberex/405ae3acf97b11b1cb44


var app = angular.module('oauth-authorize', []);


app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true
            // ,requireBase: false
    });
}]);

app.controller('mainController', function($rootScope, $scope, $location, $http) {

    queryparams = $location.search();
    
    $http.post('/login/oauth/authorize', queryparams).then(function successCallback(res) {
            console.log('success');
            console.log(res);
            console.log(res.status);
            console.log(res.data);
            // if (res.status === 201) {
            //     if (!params.redirect_uri) {
            //         params.redirect_uri = '/profile';
            //     }
            //     console.log('redirect to ' + params.redirect_uri)
            //     window.location = params.redirect_uri;
            // }
        },
        function errorCallback(res) {
            console.log(res.status);
                        console.log(res.data);

            window.location = '/login';
        });
        
        
    // console.log($scope);
    // console.log($location);
    // var queryparams = $location.search();
    // console.log(queryparams);
    // if (queryparams.client_id) {

    // }
    //redirect_uri
    //scope
    //state
});
