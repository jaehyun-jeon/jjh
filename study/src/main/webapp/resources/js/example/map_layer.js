/**
 * 레이어 관련 기능
 */


var auth = Number(document.getElementById("auth").value);
/*
 * 보호구역 레이어  
 * 190529 오승민 포인트가 폴리곤 위로 올라가게 해달라고해서 순서변경
 * 190702 오승민 최고속도에서 보호구역을 맨뒤에 보이게 해야해서 function paLayerCall에서 호출
 */
var pa_1_3;		//어린이 구역 레이어
var pa_2_3;		//노인 구역 레이어
var pa_3_3;		//장애인 구역 레이어

var pa_1_5;		//어린이 통합 구역 레이어
var pa_2_5;		//노인 통합 구역 레이어
var pa_3_5;		//장애인 통합 구역 레이어

var pa_1_1;		//어린이 지정 대상 레이어
var pa_2_1;		//노인 지정 대상 레이어
var pa_3_1;		//장애인 지정 대상 레이어

var pa_1_2;		//어린이 지정 레이어
var pa_2_2;		//노인 지정 레이어
var pa_3_2;		//장애인 지정 레이어

var pa_1_4;		//어린이 통합 지정 레이어
var pa_2_4;		//노인 통합 지정 레이어
var pa_3_4;		//장애인 통합 지정 레이어

var viw_road_link; 		//도로명주소
var viw_std_link;		//표준링크
var viw_std_link_ex;	//고속도로
var viw_road_link_ex;	//고속도로


/*
 * 레이어 호출!
 */
if(checkURL($("#hid_contextPath").val() + "/map/spd/mapManage_spd.do")){
	paLayerCall();
	
	var cm_area = callLayer('viw_cm_use_area_map', 'N', 0.3);		//용도지역도

	var cm_pol = callLayerPol('viw_cm_org_pol');		//경찰청 경계
	var cm_mma = callLayerPol('viw_cm_org_mma', 'Y');	//경찰서 경계

	var cm_spd_sign = callLayer('viw_cm_spd_sign');		//속도표지판
	
	spdSayerCall();
	
	var viw_link_spd_null = callLayer('viw_link_spd_null', 'Y');	//속도미등록구간
	
}else if(checkURL($("#hid_contextPath").val() + "/map/pa/mapManage_pa.do")){
	spdSayerCall();
	paLayerCall();
	var pa_0 = callLayer('viw_pa_assign_geo_new');	//신규 추가 지정 레이어
	pa_0.setVisible(true);
}


$(window).load(function(){
	layer_init();
});

/*
 * 190702 오승민 최고속도에서 보호구역을 맨뒤에 보이게 해야해서 function으로 변경
 */
function paLayerCall(){
	pa_1_3 = callLayer('viw_pa_assign_geo_f13', 'N', 0.7);		//어린이 구역 레이어
	pa_2_3 = callLayer('viw_pa_assign_geo_f23', 'N', 0.7);		//노인 구역 레이어
	pa_3_3 = callLayer('viw_pa_assign_geo_f33', 'N', 0.7);		//장애인 구역 레이어

	pa_1_5 = callLayer('viw_pa_assign_geo_f15');		//어린이 통합 구역 레이어
	pa_2_5 = callLayer('viw_pa_assign_geo_f25');		//노인 통합 구역 레이어
	pa_3_5 = callLayer('viw_pa_assign_geo_f35');		//장애인 통합 구역 레이어

	pa_1_1 = callLayer('viw_pa_assign_geo_f11');		//어린이 지정 대상 레이어
	pa_2_1 = callLayer('viw_pa_assign_geo_f21');		//노인 지정 대상 레이어
	pa_3_1 = callLayer('viw_pa_assign_geo_f31');		//장애인 지정 대상 레이어

	pa_1_2 = callLayer('viw_pa_assign_geo_f12');		//어린이 지정 레이어
	pa_2_2 = callLayer('viw_pa_assign_geo_f22');		//노인 지정 레이어
	pa_3_2 = callLayer('viw_pa_assign_geo_f32');		//장애인 지정 레이어

	pa_1_4 = callLayer('viw_pa_assign_geo_f14');		//어린이 통합 지정 레이어
	pa_2_4 = callLayer('viw_pa_assign_geo_f24');		//노인 통합 지정 레이어
	pa_3_4 = callLayer('viw_pa_assign_geo_f34');		//장애인 통합 지정 레이어
}


/*
 * 최고속도 레이어 호출 
 */
function spdSayerCall(){
	viw_std_link_ex = callLayer('viw_std_link_ex', 'Y');
	viw_road_link_ex = callLayer('viw_road_link_ex', 'Y');
	viw_road_link = callLayer('viw_road_link');
	viw_std_link = callLayer('viw_std_link');
}


/*
 * JJH 레이어 on/off (커스텀)
 * 설명 : onoff 체크박스로 구현할경우 체크박스에 onclick 이벤트 걸어 함수 호출, 호출 시 매게변수로 this 넣어주면됨, 체크박스 value로 각자 on/off 구분해서 사용하면됨
 *      1) 첫번째 if는 체크 햇을때 풀었을때 판단하는 if
 *      2) 두번째 if는 어떤 체크박스 선택했는지 if
 *      3) if문 안에 변수(레이어생성 시 선언한 레이어변수).setVisibility(true) (ol2에서 레이어 on/off하는 함수 true면 보이고 false면 안보임 ol3는 함수 다를수도있음)
 *      
 *      190305 오승민 수정 
 *      -> check box 값으로 된 변수 매칭하여 on/off
 */
function chk_layerOnOff(layer){
	var id = String(layer.value);
	if(layer.checked){//.setVisibility(true)
		if(id == 'viw_std_link'){
			if(auth <= 3){
				viw_std_link_ex.setVisible(true);
			}
		}
		if(id == 'viw_road_link'){
			if(auth <= 3){
				viw_road_link_ex.setVisible(true);
			}
		}
		if(id == '_spd'){
			viw_std_link.setVisible(true);
			viw_road_link.setVisible(true);
			if(auth <= 3){
				viw_std_link_ex.setVisible(true);
				viw_road_link_ex.setVisible(true);
			}
		}else if(id == 'pa_point_all'){
			pa_1_1.setVisible(true);
			pa_1_2.setVisible(true);
			pa_1_4.setVisible(true);
			pa_2_1.setVisible(true);
			pa_2_2.setVisible(true);
			pa_2_4.setVisible(true);
			pa_3_1.setVisible(true);
			pa_3_2.setVisible(true);
			pa_3_4.setVisible(true);
		}else if(id == 'pa_polygon_all'){
			pa_1_3.setVisible(true);
			pa_1_5.setVisible(true);
			pa_2_3.setVisible(true);
			pa_3_5.setVisible(true);
			pa_3_3.setVisible(true);
			pa_3_5.setVisible(true);
		}else{
			eval(id).setVisible(true);
		}
		
	}else{ //.setVisibility(false)
		if(id == 'viw_std_link'){
			if(auth <= 3){
				viw_std_link_ex.setVisible(false);
			}
		}
		if(id == 'viw_road_link'){
			if(auth <= 3){
				viw_road_link_ex.setVisible(false);
			}
		}
		if(id == '_spd'){
			viw_std_link.setVisible(false);
			viw_road_link.setVisible(false);
			if(auth <= 3){
				viw_std_link_ex.setVisible(false);
				viw_road_link_ex.setVisible(false);
			}
		}else if(id == 'pa_point_all'){
			pa_1_1.setVisible(false);
			pa_1_2.setVisible(false);
			pa_1_4.setVisible(false);
			pa_2_1.setVisible(false);
			pa_2_2.setVisible(false);
			pa_2_4.setVisible(false);
			pa_3_1.setVisible(false);
			pa_3_2.setVisible(false);
			pa_3_4.setVisible(false);
		}else if(id == 'pa_polygon_all'){
			pa_1_3.setVisible(false);
			pa_1_5.setVisible(false);
			pa_2_3.setVisible(false);
			pa_3_5.setVisible(false);
			pa_3_3.setVisible(false);
			pa_3_5.setVisible(false);
		}else{
			eval(id).setVisible(false);
		}
	}
}




/*
 * 190218 오승민 레이어 불러오기 추가
 */
function callLayer(layer_nm, etc, opacity){
	var sd_cd = '';
	opacity = opacity == 'undefined' ? 1.0 : opacity;
	/*             보호구역        최고속도
	 * 시스템 관리자 :   all      all
	 * 관리자           :   all      all
	 * 지자체           :   지역              지역
	 * 경찰청          :   all      all
	 * 지방청           :   지역              지역
	 * 경찰서           :   지역              지역
	 * 미승인           : none      none
	 */
	if(etc != 'Y'){
		if(auth < 3 || auth == 5){
			sd_cd = '_all'; 
		}else{
			sd_cd = '_' + Number(document.getElementById("sd_cd").value);
		}
	}
	
	
	var viw_layer = new ol.layer.Tile({
	    visible: false,
	    source: new ol.source.TileWMS({
			url: getGeoServerPath(),
//				url: 'http://115.68.163.11:58080/geoserver/tcd/wms',
		    params: {  'FORMAT': 'image/png',
		               'VERSION': '1.1.1',
		               tiled: true,
		               STYLES: '',
		               LAYERS: 'tcd:' + layer_nm + sd_cd,
		      }
	    }), opacity : opacity
	});
	
	map.addLayer(viw_layer);
	
	return viw_layer;
}



/*
 * 190608 오승민 레이어 불러오기 추가 - 경찰 코드로 불러올때
 */
function callLayerPol(layer_nm, etc){
	var mma_cd = '';
	/*             보호구역        최고속도
	 * 시스템 관리자 :   all      all
	 * 관리자           :   all      all
	 * 지자체           :   지역              지역
	 * 경찰청          :   all      all
	 * 지방청           :   지역              지역
	 * 경찰서           :   지역              지역
	 * 미승인           : none      none
	 */
	if(etc != 'Y'){
		if(auth < 3){
			mma_cd = '_all'; 
		}else{
			mma_cd = '_' + Number(document.getElementById("mma_cd").value);
		}
	}
	
	var viw_layer = new ol.layer.Tile({
	    visible: false,
	    source: new ol.source.TileWMS({
			url: getGeoServerPath(),
		    params: {  'FORMAT': 'image/png',
		               'VERSION': '1.1.1',
		               tiled: true,
		               STYLES: '',
		               LAYERS: 'tcd:' + layer_nm + mma_cd,
		      }
	    })
	});
	
	map.addLayer(viw_layer);

	return viw_layer;
}



/*
 * 190219 정소영 레이어초기화
 */
function layer_init(){
	$('input:checkbox[name="layer_ck"]').each(function(index) {
		chk_layerOnOff(this);
	});
}


/*
 * 190305 오승민 선택된 보호구역 레이어 refresh
 *  type -> point : 지정, 지정대상
 *          polygon : 구역
 *          unitPi : 통합 지정
 *          unitPl : 통합 구역 
 */
function paLayerRefresh(type){
	$('input:checkbox[name="layer_ck"]').each(function(index) {
		if(this.checked){ 
			if(type == 'point'){
				if(this.value.substr(5) == '1' || this.value.substr(5) == '2' || this.value.substr(5) == '4'){
					eval(this.value).getSource().updateParams({"time": Date.now()});
				}
			}else if(type == 'polygon'){
				if(this.value.substr(5) == '3' || this.value.substr(5) == '5'){
					eval(this.value).getSource().updateParams({"time": Date.now()});
				}
			}
		}
	});
	if(type == 'point'){
		pa_0.getSource().updateParams({"time": Date.now()});
	}
}

