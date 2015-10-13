angular
.module('app',[
	'ui.router',
	'highcharts-ng'
])
.config(['$urlRouterProvider','$stateProvider',function($urlRouterProvider,$stateProvider){

	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('dashboard',{
		url : '/dashboard'
		// ,templateUrl : 'templates/angulartemplate/dashboard.html'
		,template : '<h1>ini dashboard </h1>'
		,controller : "dashboard"
	});


	$stateProvider
	.state('pie',{
		url : '/pie'
		// ,templateUrl : 'templates/angulartemplate/dashboard.html'
		,template: "<h1> ini Pie</h1>"
		,controller : "dashboard"
	});


	$stateProvider
	.state('bar',{
		url : '/bar'
		// ,templateUrl : 'templates/angulartemplate/dashboard.html'
		,template: "<h1> ini Bar</h1>"
		,controller : "dashboard"
	});

}]);