var app = angular.module('app');

var $api_url = "http://localhost/kemenkeu/data/";

app.factory('apiServices', function($http) {
	return {
		jenisPangan: function() {
			// dd_jenis_pangan.json
			var url = $api_url + 'dd_jenis_pangan.json';
            return $http.get(url);
		}
		,provinsi : function(){
			var url = $api_url + 'dd_prov_sample.json';
            return $http.get(url);
		}

		,piechart : function(){
			var url = $api_url + 'piechart.json';
            return $http.get(url);
		}

		,linechart : function(){
			var url = $api_url + 'linechart.json';
            return $http.get(url);
		}

		,barchart : function(){
			var url = $api_url + 'barchart.json';
            return $http.get(url);
		}
	};
});