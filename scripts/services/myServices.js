var app = angular.module('app');


// var $api_url = "http://localhost/kemenkeu/data/";
var $api_url = "http://103.30.84.5/";

app.factory('chartServices', function($http) {
	return {
		getLine : function(){
			// var url = $api_url + 'line_dum.json';
			var url = $api_url + 'training/public/chart/commodities/2/2015-09-24/7/1,2,3';
            return $http.get(url);
		}
		,getPie : function(){
			var $url = $api_url + 'api/piechart';
			return $http.get($url);
		}
	};
	
});