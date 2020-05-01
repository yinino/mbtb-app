var view_single_record = angular.module("view_single_record_app", []);

view_single_record.controller("view_single_record_controller", ['$scope', '$window', '$http', function ($scope, $window, $http) {

    // binding data to angular variable from ejs view
    $scope.details = $window.mbtb_detailed_data;

    // on-click for delete button
    $scope.delete_button = function () {
      if (confirm("This action will delete data. Are you sure?")) {
        let url = '/delete_data/' + $scope.details.prime_details_id + '/';

        // DELETE request to sails controller
        $http({
          method: 'DELETE',
          url: url
        }).then(function successCallback(response) {
          if (response.data === 'Success'){
            $window.location.href = '/admin_view_data';
          }
          else {
            alert("Something went wrong, Please try again.");
          }
        });
      }
  }

  }]);

// For image files navigation
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

// This method gets the file name from ejs view (data-file-name) attribute and send a request to sails controller for image url
function displayImage(image) {
  var filename = image.getAttribute('data-file-name');

  $.get({
    url: '/get_image',
    data: {filename: filename},
    success: function(response){

      // image source
      let image_item = [{
        src: response.file_url
      }];

      // options for image viewer - set toolbar buttons
      let image_options = {
        footToolbar: ['fullscreen', 'zoomIn','zoomOut', 'actualSize','rotateRight']
      };

      // wait period to fetch and load image to manage async task - otherwise will give 404 on first attempt
      // even with async: false
      setTimeout(function () {
        var viewer = new PhotoViewer(image_item, image_options);
      }, 2000);

    },

    })
    .fail(function () {
      alert("Something went wrong in rendering image, Please try again!");
      location.reload();
    });

}
