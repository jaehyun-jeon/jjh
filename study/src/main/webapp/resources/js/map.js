/**
 * 전재현
 * 2020-10-13
 * openlayer3 기본 기능구현
 */

var baseMap; //map 객체

//지도 배경맵 셋팅
function openMap(){
	
	//마우스 위치 : 좌표값 표출 
	var mousePositionControl = new ol.control.MousePosition({
		coordinateFormat: ol.coordinate.createStringXY(4),
		projection: 'EPSG:4326',
		className: 'custom-mouse-position',
		target: document.getElementById('mouse-position'),
		undefinedHTML: '&nbsp;'
	});
	
	//배경맵 셋팅
	baseMap = new ol.Map({
		 controls: ol.control.defaults({
          attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
            collapsible: false
          })
        }).extend([mousePositionControl]),
		target: 'map',
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM({
					url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png'
				})
			})
		],
		logo : false,
		view: new ol.View({
			center: ol.proj.fromLonLat([126.97, 37.56]),
			zoom: 10
		})
	});
	
	baseMap.on('click', function (evt) {
		console.info(ol.coordinate.toStringXY(ol.proj.toLonLat(evt.coordinate),4));
		
		var coordinate = ol.coordinate.toStringXY(ol.proj.toLonLat(evt.coordinate),4);
		
		
		getclickMapSearchPoint(coordinate);
	});	
	
	openLayer();
}


function openLayer(){
	var viw_layer = new ol.layer.Tile({
	    source: new ol.source.TileWMS({
			url: 'http://localhost:8089/geoserver/study/wms',
		    params: {  'FORMAT': 'image/png',
		               'VERSION': '1.1.1',
		               tiled: true,
		               STYLES: '',
		               LAYERS: 'study:country_geom',
		      }
	    }), opacity : 1.0
	});
	
	baseMap.addLayer(viw_layer);
}

function getclickMapSearchPoint(coordinate){
	$.ajax({
		url:"/map/getclickMapSearchPoint.do"
		,type:"post"
		,data: {
			coordinate : coordinate
		}
		,async: false
		,dataType:"JSON"
		,success:function(result){		
			resultData =  result.result;
			console.log(resultData);
			console.log(resultData.length);
			
			if(resultData.length != 0){			
				
			    $('#light').css("display", "block");   
				$('#fade').css("display", "block");
				
				$("#span_pointId").html(resultData[0].id);
				$("#span_pointName").html(resultData[0].country_name);
				$("#span_pointValue").html(resultData[0].country_val);
				
			}
		}
		,error: function(xhr,status, error){
			alert(xhr  + " / " + status + " / " + error);
		}
	});
}