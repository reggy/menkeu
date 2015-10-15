// pemanggilan module app.js
// menambahkan servis terhadap app.js
var app = angular.module('app');

app.factory('navServices', function($http) {
	return {
		navigasi: function() {
			var $datas = [
				{
					parent:"Navigasi",
					parentIcon : "fa fa-dashboard",
					child : [
					{
		            	navName : "Pangan",
		            	navId : "resTrend",
		            	navIcon : "fa fa-circle-o",
		            	navLink : "pangan"
		            },
		            {
		            	navName : "Peta Isu",
		            	navId : "sentWork",
		            	navIcon : "fa fa-circle-o",
		            	navLink : "peta"
		            },
		            {
                        navName : "Tabel Grid",
                        navId : "ontho",
                        navIcon : "fa fa-circle-o",
                        navLink : "tblgrid"
                    }
					]
				}
			];
			return $datas;
		}
	};
});