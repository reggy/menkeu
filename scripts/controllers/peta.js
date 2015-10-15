angular
.module('app')
.controller('peta',['superCache','$http','$window','$scope','$location','apiServices',function(superCache,$http,$window,$scope,$location,apiServices){
    
	var cache = superCache.get('geoJSON');
	var $theSubunits = {};
	
	// cache api topojson
	if (cache) {
		$theSubunits = cache;
		$scope.subunits = topojson.feature($theSubunits, $theSubunits.objects.PROVINSI_ADMINISTRATIVE_AREA);
	}else{
			// superCache.remove('another key');
		apiServices.getGeo().success(function(resGeoJson) {
			var asdf = superCache.put('geoJSON', resGeoJson);
			$theSubunits = superCache.get('geoJSON');
			$scope.subunits = topojson.feature($theSubunits, $theSubunits.objects.PROVINSI_ADMINISTRATIVE_AREA);
		});

	}

	apiServices.getMapBuzz().success(function(datas) {
		var myObjs = [];
		var $datas = datas.data;
		if($datas.length > 0){
			for(var i = 0; i < $datas.length; i++){
				$idProv = $datas[i].prov_id;
				$province_name = $datas[i].province_name;
				$count = $datas[i].count;
				$rank = $datas[i].rank;
				myObjs.push({
					idProv:$idProv,
					provName : $province_name,
					count: $count,
					rank : $rank
				});
			}

			// console.log("myObjs : ",myObjs);
			var Maps = new $.MapsD3();
			Maps.InitEvents(myObjs);
		}

	});
	
	


	// start map using d3js
		var home = {
			issue : {}
		};
		Object.defineProperty(home,"thevalue",{
			get : function(){
				return this.issue;
			},
			set : function(val){
				this.issue = val;
			}
		});

		$.MapsD3 = function (elementname) {
			this.elementname = elementname;
			this.element = $("#"+elementname);
		};

		$.MapsD3.prototype = {
			InitEvents: function (myObjs) {
				var that = this;
				d3.select("#maps").selectAll("svg").remove();
				that.loadMaps(myObjs);
			}
			,loadMaps : function(sektoralColorByProv){
				var isiPad = navigator.userAgent.match(/iPad/i) != null;
	            var whatMethod = '';
	            if(isiPad){
	                whatMethod = 'mouseover';
	            }else{
	                whatMethod = 'click';
	            }
	            var eleCheck = $(".mapsMiddle");

	            var scale = 700;
	            var centerMap = [14.4, 17.4];


	            var that = this;
	            var width = eleCheck.width(),
	            height = 500,
	            active = d3.select(null);
	            
	            var projection = d3.geo.albers()
	            .rotate([-120, 20])
	            .parallels([150, 160]);

	            projection.center(centerMap);
	            projection.scale(scale);

	            var path = d3.geo.path()
	            .projection(projection)
	            .pointRadius(2);

	            var svg = d3.select(".mapsMiddle").append("svg")
	            .attr("id","svgmaps")
	            .attr("width", width)
	            .attr("height", height);

	            if(eleCheck.marginLeftMaps !== "undefined"){
	                svg.style("margin-left",eleCheck.marginLeftMaps + "px");
	            }
	            function freset(mypath){
	                active.classed("active", false);
	                active = d3.select(null);
	                svg.selectAll("circle").remove();
	                $(".tipsy").remove();
	            }
	            home.thevalue = sektoralColorByProv;  // set
	            var homeTheValue = home.thevalue; //get

	            if($scope.subunits){
	            	svg.selectAll(".subunit")
	            	.data($scope.subunits.features)
	            	.enter().append("path")
	            	.attr("class", function(d) {
	            		return "subunit subunit_" + d.id;
	            	})
	            	.style("position","relative")
	            	.style("fill",function(d){
	            		var provId = d.properties.id_provinsi;
	                    var mycolor = homeTheValue.filter(function(d){
	                        return d.idProv == provId;
	                    });
	                    // var thecolor = '#299C1A';
	                    var thecolor = '#8D1A9C';
	                    return thecolor;
	            	})
	            	.attr("id",function(d){
	            		return "pakde";
	            	})
	            	.on(whatMethod, function(d, i) {
	            		that.hoverMaps(d,i);
	            	})
	            	.attr("d", path); 

	            	// for a text buzz on maps

	            	svg.selectAll(".city").data($scope.subunits.features)
	                .enter()
	                .append("text")
	                .style("font-weight", "bold")
	                .style("font-size","12px")
	                .attr("x", function(d,i){
	                    var bounds = path.bounds(d),x = (bounds[0][0] + bounds[1][0]) / 2;
	                    if(x === 425.7594276167623){ // banten 
	                        x = 385.7594276167623;
	                    }
	                    if(x === 446.45410115939376){ // jakarta 
	                        x = 439.45410115939376;
	                    }
	                    if(x === 525.1084162689209){ // jawa tengah 
	                        x = 510.1084162689209;
	                    }
	                    return x;

	                })
	                .attr("y", function(d,i){
	                    var bounds = path.bounds(d),y = (bounds[0][1] + bounds[1][1]) / 2;
	                    var dy = (y - 10);
	                    if(dy === 339.44848524234385){ //banten 
	                        dy = 356.44848524234385;
	                    }
	                    return dy;
	                })
	                .attr("dy", ".35em")
	                .text(function(d) {
	                    var idprov = d.properties.id_provinsi;
	                    var joinarr = homeTheValue.filter(function(d){
	                        return d.idProv == idprov;
	                    });
	                    var $count = joinarr[0].count;
	                    return $count;
	                });

	            } // end of if $scope.subunits
			
			} // end of loadMaps func
			,hoverMaps : function(d,i){
				var that = this;
				var homeIssue = home.issue;

				// console.log(d.properties);

	        	var nameProv = d.properties.nm_provinsi;
	        	var idprov = d.properties.id_provinsi;

	        	// alert("chart di klik !");

	        	apiServices.getMapBuzzByProvId().success(function(jsonListTbl) {
        			var $html = "";
        			var $header = "<tr><th>Issue</th><th>Count</th></tr>";
        			var $container = $("#listissuemaps");
        			var $datas = jsonListTbl.data;
        			if($datas.length > 0){
						var prcnt = 0;
						for(var i = 0; i < $datas.length; i++){
							$html += "<tr>";
							$html += "<td>"+$datas[i].label+"</td>";
							$html += "<td>"+$datas[i].count+"</td>";
							$html += "</tr>";
						}
					}
					$container.html($html);
        		});
        		// getMapBuzzByProvId

			} // end of hoverMaps func

		};


}]); 