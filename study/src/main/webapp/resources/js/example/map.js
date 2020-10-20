/**
 * 지도 및 레이어 셋팅
 */

proj4.defs("EPSG:5181","+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs"); //kakao 5181 proj4 설정
ol.proj.setProj4 = proj4;
proj4.defs("EPSG:4326","+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs");

var x = Number(document.getElementById("x").value);
var y = Number(document.getElementById("y").value);
var auth = Number(document.getElementById("auth").value);
var zoom;
var mapDaum;
var x4326 = ol.proj.transform([x, y], 'EPSG:5181', 'EPSG:4326')[0];
var y4326 = ol.proj.transform([x, y], 'EPSG:5181', 'EPSG:4326')[1];

/*
 * 
 * 전국 zoom / 시도 zoom 구분
 * 
 * */
if(auth < 3 || auth == 5){
	zoom = 3;
}else{
	if($("#sgg_nm").val() == ''){
		zoom = 6;
	}else{
		zoom = 9;
	}
}




var view =  new ol.View({
	projection :'EPSG:5181',
	center: [x, y],
	resolutions: [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25],     //zoom 범위설정으로 꼭 필요!
	zoom: zoom,
	minZoom: 1,
	maxZoom: 14
});


var map = new ol.Map({
	target: 'map',
//	layers: [
//		naverTileLayer
//	],
	view: view,
	controls: ol.control.defaults({ attribution: false }).extend(
            [ //new ol.control.ZoomSlider({duration: -1000}), 
              //new ol.control.ScaleLine(),
             /* new ol.control.MousePosition({
                  coordinateFormat: ol.coordinate.createStringXY(4),
                  undefinedHTML: '&nbsp;'
              }),*/
//              new ol.control.ScaleLine()
             // new ol.control.ScaleLine({className: 'ol-scale-line', target: document.getElementById('scale-line')})
            ]),
    // 지도 조절시 부드러운 움직임을 없앤다
    interactions: ol.interaction.defaults({
    	doubleClickZoom :false,
            dragPan: false,
            mouseWheelZoom: false
          }).extend([
            new ol.interaction.DragPan({kinetic: false}),
            new ol.interaction.MouseWheelZoom({duration: 0})
          ])
});

var mapDaum = new daum.maps.Map(document.getElementById('mapDaum'), {
    center: new daum.maps.LatLng(y4326, x4326),     //kakao 용 
    level: 15 - zoom,                               //openlayers와 zoom level 차이 적용 (kakao지도와 규격이 다름)
//    draggable: false,
//    scrollwheel: false,
//    disableDoubleClick: true,
//    disableDoubleClickZoom: true
});

mapDaum.setCopyrightPosition(daum.maps.CopyrightPosition.BOTTOMRIGHT, true);
map.addOverlayMapTypeId(kakao.maps.MapTypeId.HYBRID); 	
// 스카이뷰 : kakao.maps.MapTypeId.SKYVIEW
// 하이브리드 : kakao.maps.MapTypeId.HYBRID


daum.maps.disableBusSymbol();


//openlayers 줌레벨 변경 시 kakao지도에 zoom 값 반영
view.on('change:resolution', function() {
 if (view.getZoom() != undefined) {
     mapDaum.setLevel(15 - view.getZoom());
     var c = ol.proj.transform(view.getCenter(), 'EPSG:5181', 'EPSG:4326');
     mapDaum.setCenter(new daum.maps.LatLng(c[1], c[0]));
 }
});

//openlayers 이동 시 kakao지도에 center값 반영
view.on('change:center', function() {
 var c = ol.proj.transform(view.getCenter(), 'EPSG:5181', 'EPSG:4326');
  mapDaum.setCenter(new daum.maps.LatLng(c[1], c[0]));
});

$(window).resize(function() { 
	var c = ol.proj.transform(view.getCenter(), 'EPSG:5181', 'EPSG:4326');
	mapDaum.setCenter(new daum.maps.LatLng(c[1], c[0]));
});

//
//function scaleOnChange() {
//    scaleLineControl.setUnits('metric');
//}
//unitsSelect.addEventListener('change', scaleOnChange);
