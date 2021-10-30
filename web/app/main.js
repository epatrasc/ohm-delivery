const fetchOhm = ($http, $context) => {
  $http.get(`/ohms/${$context.trackingId}`)
    .then((result) => {
      $context.ohm = result.data;
      $context.errorMessage = undefined;
    }, (error) => {
      $context.ohm = undefined;
      $context.errorMessage = error.data;
    });
}
angular
  .module("ohm-delivery", [])
  .controller("tracking", function ($scope, $http) {
    $scope.sendData = function () {
      return fetchOhm($http, this)
    };

    $scope.onedit = function () {
      if (!this.trackingId) {
        this.ohm = undefined;
        this.errorMessage = undefined;
        return;
      };

      return fetchOhm($http, this)
    }
  });