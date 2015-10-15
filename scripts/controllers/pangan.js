angular
.module('app')
.controller('pangan',['$window','$scope','$location','apiServices',
	function($window,$scope,$location,apiServices){
    
    $scope.startDate = '2015-09-01';
    $scope.endDate = '2015-09-14';

    $scope.idProv;
    $scope.idPangan;

    $scope.provItems;
    $scope.panganItems;

	apiServices.jenisPangan().then(function(panganDatas){
        $scope.panganItems = panganDatas.data.data;
    });

    apiServices.provinsi().then(function(provDatas){
        $scope.provItems = provDatas.data.data;
    });

    $('#reservation').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD'
        },
        startDate: $scope.startDate,
        endDate: $scope.endDate
    });

    $('#reservation').on('apply.daterangepicker', function(ev, picker) {
        var $startDate = picker.startDate.format('YYYY-MM-DD');
        var $endDate = picker.endDate.format('YYYY-MM-DD');
        $scope.$apply(function() {
            $scope.startDate = $startDate;
            $scope.endDate = $endDate;
        });
    });



    angular.element("#provOpt").on("change",function(e){
        var $idProv = angular.element(this).val();
        $scope.$apply(function() {
            $scope.idProv = $idProv;
        });
    });

    angular.element("#panganOpt").on("change",function(e){
        var $idPangan = angular.element(this).val();
        $scope.$apply(function() {
            $scope.idPangan = $idPangan;
        });
    });



    $scope.updateChart = function(){

    	$scope.startDate;
    	$scope.endDate;
    	$scope.idProv;
    	$scope.idPangan;

    	
    	if($scope.idProv === undefined || $scope.idProv === "0"){
            alert("provinsi harus di pilih");
        }else if($scope.idPangan === undefined || $scope.idPangan === "0"){
            alert("jenis pangan harus di pilih");
        }else{
            
            apiServices.piechart().success(function(pieDatas){

                var $datas = []
                ,$data = []
                ,$result = [];
                var dataSum = 0;

                if(pieDatas.data){
                    $datas = pieDatas.data;
                    for(var i = 0; i < $datas.length; i++){
                        $data[i] = {
                            name : $datas[i].label,
                            y : parseFloat($datas[i].count)
                        };
                        dataSum += parseFloat($datas[i].count);
                    }
                    $result = [{
                        type : 'pie',
                        data : $data
                    }];
                    // console.log("result : ",$result);
                    $scope.chart3.series = $result;
                }
            });


        }
    	
    	

    };


    $scope.chart1 = {
        options: {
            chart: {
                type: 'line'
            },
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {

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


    $scope.chart2 = {
        options: {
            chart: {
                type: 'bar',
            }
            ,plotOptions: {
                bar: {
                    cursor:"pointer",
                    dataLabels: {
                        enabled: false
                    },
                    point:{
                      events:{
                        click:function(){}
                      }
                    }
                }
            }
        },
        xAxis : {
            title: {
                text: null
            }
        },
        title: {
            text: ''
        },
        loading: false
    };

    $scope.chart3 = {
        options: {
            chart: {
                type: 'pie',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    point : {
                        events: {
                            click: function(e) {

                            }
                        }
                    },
                    size: '80%',
                    dataLabels: {
                        enabled: true,
                        distance: -45,
                        color: '#ffffff',
                        style: {
                            fontWeight: 'normal',
                            fontSize: 18
                        },
                        formatter: function() {

                            var $html = "<div class='text-center'>";
                            if(this.point.color=='#f5ee31'){
                                $html += '<span style="color:#000000;display:block;clear:both;">'+this.key+'</span><br/>';
                                $html += '<span style="color:#000000;display:block;clear:both;">' + Highcharts.numberFormat(this.percentage) +' %</span>';  
                            }else{
                                $html += '<span>'+this.key+'</span><br/>';
                                $html += '<span>' + Highcharts.numberFormat(this.percentage) +' %</span>';  
                            }
                            $html += '</div>';
                            return $html;

                        }
                    },
                    showInLegend: true
                }
            }
        },
        title: {
            text: ''
        },
        loading: false
    };



}]); 