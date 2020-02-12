let view_single_archive_tissue_request = angular.module("view_single_archive_tissue_request_app", []);

view_single_archive_tissue_request.controller("view_single_archive_tissue_request_controller", ['$scope', '$window', '$http', function ($scope, $window, $http) {

  // binding data to angular varible from ejs view
  $scope.details = $window.archive_tissue_request_data;

  // on-click for approve button
  $scope.revert_single_tissue_req_button = function () {

    let url = '/revert_archive_tissue_requests/';
    let requests_ids = [$scope.details.tissue_requests_id];

    // post request to sails controller
    $http({
      method: 'POST',
      url: url,
      data: {requests_ids: requests_ids},
    }).then(function successCallback(response) {
      if (response.data === 'approved'){
        // display alert on success and reload window
        alert("Your selected request is reverted.");
        $window.location.href = '/get_archive_tissue_requests';
      }
      else {
        alert("Something went wrong, Please try again.");
      }
    });

  }

}]);


