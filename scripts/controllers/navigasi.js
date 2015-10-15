angular
	.module('app')
	.controller('navigasi',['$scope','navServices',function($scope,navServices){
		$scope.menuitems = navServices.navigasi(); 
		// navServices adalah nama class dari servis navigasi
		// navigasi adalah fungsi
	}]);