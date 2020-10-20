//지도검색결과
//map_tab에서 검색결과 클릭 시 해당 좌표로 이동을 위한 전역변수 설정
//익스 9에서는 console.log에서 에러를 발생시킴
//->해결법: console.log("") => window.console && console.log("")
var mapSechVectorLayer;
function sech_result(jsonStr){
	// 행안부 좌표체계 : 5179
	// 배경맵 좌표체계 : 5181
	// ol.proj.transform([x, y], 'EPSG:5179', 'EPSG:5181')로 좌표계 변환작업 필요
	proj4.defs("EPSG:5179","+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs"); 
	var sech_type = $("#search_type option:selected").val();
	var point_source  = new ol.source.Vector({});
	if(sech_type == 'addr_sech'){
		$(jsonStr.results.juso).each(function(index){
			
			var x = Number(this.entX);
			var y = Number(this.entY);
			
			var iconStyle =  new ol.style.Style({
				image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
			        //scale: 0.1,
			        src: $("#hid_contextPath").val() + '/resources/images/pointer_' + (index+1) +'.png'
			    }))
				
		    });
			
			
			var feature = new ol.Feature(new ol.geom.Point(ol.proj.transform([x, y], 'EPSG:5179', 'EPSG:5181')));
			feature.setStyle(iconStyle);
			point_source.addFeature(feature);
		});
	} else {
		
		$(jsonStr.result).each(function(index){
			var x = Number(this.x);
			var y = Number(this.y);
			
			var iconStyle =  new ol.style.Style({
				image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
			        //scale: 0.1,
			        src: $("#hid_contextPath").val() + '/resources/images/pointer_' + (index+1) +'.png'
			    }))
		    });
			
			var feature = new ol.Feature(new ol.geom.Point(ol.proj.transform([x, y], 'EPSG:5181', 'EPSG:5181')));
			feature.setStyle(iconStyle);
			point_source.addFeature(feature);
		});
		
		if(jsonStr.sech_data != 'pint_sech'){
			$(jsonStr.result).each(function(index){
				var format = new ol.format.WKT(); //포맷 설정
				
				var lineStyle = 
					new ol.style.Style({
						fill : new ol.style.Fill({
							color: '#FF0000'
						}),
						stroke:new ol.style.Stroke({
							color:'#FF0000',
							width: 4
						})
					});
				
				
				var feature = format.readFeature(this.geom);
				feature.setStyle(lineStyle);
				
				point_source.addFeature(feature);
			});
			
			
		}
	}
	
	
	
	
	mapSechVectorLayer = new ol.layer.Vector({
		source: point_source
	});
	
	
	map.addLayer(mapSechVectorLayer);
	
}


//지도검색중 선택결과로 이동
//map_tab.jsp에서 호출
function map_move(x, y){
	x = Number(x);
	y = Number(y);
	var sech_type = $("#search_type option:selected").val();
	var sech_data = $("#search_data option:selected").val();
	if(sech_type == 'addr_sech'){
		map.getView().setCenter(ol.proj.transform([x, y], 'EPSG:5179', 'EPSG:5181'));
	}else {
		map.getView().setCenter(ol.proj.transform([x, y], 'EPSG:5181', 'EPSG:5181'));
	}
	map.getView().setZoom(18);
}

//지도 줌인
function zoom_in(){
	map.getView().setZoom(map.getView().getZoom()+1);
}

//지도 줌아웃
function zoom_out(){
	map.getView().setZoom(map.getView().getZoom()-1);
}

//지도 해당 지자체 영역으로 이동
function center(){
	map.getView().setCenter(ol.proj.transform([x, y], 'EPSG:5181', 'EPSG:5181'));
	map.getView().setZoom(zoom);
	
	//면적 또는 거리 텍스트 지우기
    $('.ol-overlay-container').remove();
    
	//면적 또는 거리 형상 지우기
	var features = vector.getSource().getFeatures();
	
	if(features.length > 0){
		for(var i=0; i<features.length; i++){
			vector.getSource().removeFeature(features[i]);
		}
	}
}

//면적 또는 거리 재기
function toggleControl_m(fn_type){
	//면적 또는 거리 재기 포인트 좌표 지우기
	map.removeInteraction(draw);
	
	//면적 또는 거리 형상 지우기
	var features = vector.getSource().getFeatures();
	
	if(features.length > 0){
		for(var i=0; i<features.length; i++){
			vector.getSource().removeFeature(features[i]);
		}
	}
    
    //면적 또는 거리 텍스트 지우기
    $('.ol-overlay-container').remove();
    
    //면적 또는 거리 측정
	if(fn_type == 'line'){
		base_addInteraction('LineString');
		mapBaseBtSelectImg('base_line');
	}else{
		base_addInteraction('Polygon');
		mapBaseBtSelectImg('base_polygon');
	}
}

//작업취소
//길이, 면적측정 작업 취소
//보호구역 작업취소
function initMap(){
	//그리기 이벤트 제거
	map.removeInteraction(draw);
	
	//길이, 면적 측정 결과 지우기
	$('.ol-overlay-container').remove();
	
	var features = vector.getSource().getFeatures();
	
	if(features.length > 0){
		for(var i=0; i<features.length; i++){
			vector.getSource().removeFeature(features[i]);
		}
	}
	map.removeLayer(mapSechVectorLayer);
	mapBaseBtSelectImg('');
}


function mapBaseBtSelectImg(id){
	var mapBaseBtArr = ['base_line', 'base_polygon'];
	for(var i = 0; i < mapBaseBtArr.length; i++){
		if(id == mapBaseBtArr[i]){
			selectImg(document.getElementById(mapBaseBtArr[i]));
		}else{
			unSelectImg(document.getElementById(mapBaseBtArr[i]));
		}
	}
}