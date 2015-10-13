angular
.module('app')
.controller('dashboard',['$window','$scope','$location','chartServices',function($window,$scope,$location,chartServices){


	// for line chart
    /*
	var $minVal = 1000;
	Highcharts.setOptions({
		lang: {
			numericSymbols: null 
		}
	});


    

    $catLinechart = ["2014-05-06","2014-05-07","2014-05-08","2014-05-09","2014-05-10"];
	$dataLineChart = [{
		name : "C++",
		data : [10.20,5.20,40.2,80,10]
	},
	{
		name : "Node JS",
		data : [15,3,40.2,80,90]
	},{
		name : "PHP",
		data : [15,3,40.2,90,120]
	}];
	$scope.lineconfig.xAxis.categories = $catLinechart;
	$scope.lineconfig.series = $dataLineChart;
	$scope.lineconfig.yAxis = {
		min: 0,
		tickInterval: 50,
		lineWidth: 1,
		title: {
			text: ''

		}
	};
    */


    chartServices.getLine().success(function(sentimentDatas) {
        var $minVal = 1000;
        Highcharts.setOptions({
        	lang: {
        		numericSymbols: null 
        	}
        });
        
        var $cat = sentimentDatas.categories;
        var $data = sentimentDatas.data;
        $scope.newsConfig.xAxis.categories = $cat;
        $scope.newsConfig.series = $data;

        $scope.newsConfig.yAxis = {
        	min: 0,
        	tickInterval: 50,
        	lineWidth: 1,
        	title: {
        		text: ''

        	}
        };
        $scope.newsConfig.loading = false;
    });
    
    $scope.newsConfig = {
        options: {
            chart: {
                type: 'line'
            },
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                        	alert("di klik ");

                        }
                    }
                }
            }
        }
        ,xAxis : {}
        ,title: {
            text: ''
        },
        loading: true
    };

    console.log($scope.newsConfig);
	
}]); 