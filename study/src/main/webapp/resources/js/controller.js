/**
 * 
 */
function getChartData(){
	var resultData;
	$.ajax({
		url:"/chart/getChartData.do"
		,type:"post"
		,data: {
			
		}
		,async: false
		,dataType:"JSON"
		,success:function(result){		
			resultData =  result.result;
		}
		,error: function(xhr,status, error){
			alert(xhr  + " / " + status + " / " + error);
		}
	});
	
	return resultData;
}

