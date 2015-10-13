angular
.module('app')
.controller('dashboard',['$window','$scope','$location','chartServices',function($window,$scope,$location,chartServices){

    $scope.startDate = '2015-09-30';
    $scope.interval = 10;
    $scope.pemdaItems;
    $scope.idProv;



    // chartServices.getProv().then(function(topicDatas){
        
        // 
    // });
    // var $topicdatas = chartServices.getProv();
    // console.log("topicdatas : ",$topicdatas);
    $scope.provItems = chartServices.getProv();

    // 
    

    $scope.$watchGroup(['pemdaItems'], function(newVal) {
        // 
    });

    chartServices.getLine($scope.startDate,$scope.interval).success(function(sentimentDatas) {
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

    angular.element("#provinsiOpt").on("change",function(e){
        var $idProv = angular.element(this).val();
        // console.log("$idProv : ",$idProv);
        $scope.$apply(function() {
            // $scope.pemdaItems = $idTopic;
            $scope.pemdaItems = chartServices.getPemda();
        });

    });

    angular.element("#buttonsubmit").on("click",function(){
        var $pemdaopt = angular.element("#pemdaOpt");
        var $provopt = angular.element("#provinsiOpt");

        console.log("$pemdaopt : ",$pemdaopt.val());
        console.log("$provopt : ",$provopt.val());


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

    // $(".chosen-select").chosen({disable_search_threshold: 10});
	
}]); 