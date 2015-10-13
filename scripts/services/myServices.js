var app = angular.module('app');


// var $api_url = "http://localhost/kemenkeu/data/";
// var $api_url = "http://192.168.0.100/training/api/public/";
var $api_url = "http://192.168.0.101/training/api/public/";

app.factory('chartServices', function($http) {
	return {
		getProv : function(){
			var $datas = [{
				"id": 1,
				"name": "pdrov2"
			},
			{
				"id": 2,
				"name": "pdrov2"
			},
			{
				"id": 3,
				"name": "pdrov2"
			},
			{
				"id": 4,
				"name": "pdrov2"
			}
			];
			return $datas;
		},
		getPemda : function($idprov){
			var $datas = [{
				"id": 1,
				"name": "pemda1"
			},
			{
				"id": 2,
				"name": "pemda2"
			},
			{
				"id": 3,
				"name": "pemda3"
			},
			{
				"id": 4,
				"name": "pemda4"
			}
			];
			return $datas;
		},
		getLine : function($startdate,intval){
			// var url = $api_url + 'line_dum.json';
			// var url = $api_url + 'training/public/chart/commodities/2/'+$startdate+'/'+intval+'/1,2,3';
			var url = $api_url + 'chart/commodities/2/'+$startdate+'/'+intval+'/1,2,3';
            return $http.get(url);
		}
		,getPie : function(){
			var $url = $api_url + 'api/piechart';
			return $http.get($url);
		}
	};
	
});