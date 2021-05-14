$(document).ready(function () {

  $('.color-choose input').on('click', function () {


    $('.active').removeClass('active');

    $(this).addClass('active');
  });





});
var path = window.location.pathname;
path = path[0] == '/' ? path.substr(1) : path;
var ctrl = path;

var app = angular.module('mbros_products', []);
app.controller("mbros_ctrl", function ($scope, $http) {
  $http.post(ctrl)
    .then(function (response) {


      $scope.imgsrc = response.data.imgsrc;

      $scope.product_name = response.data.product_name;
      $scope.product_name2 = response.data.product_name2;
      $scope.product_desc = response.data.product_desc;
      $scope.product_rate = response.data.product_rate;
    });


});


