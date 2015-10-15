angular
.module('app',[
	'ui.router',
	'app.directives.navDirectives',
	'highcharts-ng'
])
.config(['$urlRouterProvider','$stateProvider',function($urlRouterProvider,$stateProvider){

	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('pangan',{
		url : '/pangan'
		,templateUrl : 'templates/angulartemplate/pangan.html'
		,controller : "pangan"
	});


	$stateProvider
	.state('peta',{
		url : '/peta'
		,templateUrl: 'templates/angulartemplate/peta.html'
		,controller : "peta"
	});


	$stateProvider
	.state('tblgrid',{
		url : '/tblgrid'
		,templateUrl: 'templates/angulartemplate/grid.html'
		,controller : "grid"
	});

}]);