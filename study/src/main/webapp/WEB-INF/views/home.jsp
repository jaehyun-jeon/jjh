<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>dev_study</title>
	
	<link rel="stylesheet" href="/resources/css/ol.css" type="text/css">
	
	<script src = "/resources/lib/jquery-3.5.1.js"></script>
	<script src = "/resources/lib/ol.js"></script>
	<script src="https://cdn.amcharts.com/lib/4/core.js"></script>
	<script src="https://cdn.amcharts.com/lib/4/charts.js"></script>
	<script src="https://cdn.amcharts.com/lib/4/themes/animated.js"></script>
	<script src="https://cdn.amcharts.com/lib/4/themes/spiritedaway.js"></script>
	<script src="https://cdn.amcharts.com/lib/4/plugins/timeline.js"></script>
	<script src="https://cdn.amcharts.com/lib/4/plugins/bullets.js"></script>
	
	<script src = "/resources/js/map.js"></script>
	<script src = "/resources/js/chart.js"></script>
	<script src = "/resources/js/controller.js"></script>
	
	<style type="text/css">
	#map{
		border: 1px dotted black;
		height: 400px;
	}
	.black_overlay{
	    display: none;
	    position: absolute;
	    top: 0%;
	    left: 0%;
	    width: 100%;
	    height: 100%;
	    background-color: black;
	    z-index:1001;
	    -moz-opacity: 0.8;
	    opacity:.80;
	    filter: alpha(opacity=80);
	}
	
	.white_content {
	    display: none;
	    position: absolute;
	    top: 25%;
	    left: 25%;
	    width: 50%;
	    height: 50%;
	    padding: 16px;
	    border: 16px solid #000000;
	    background-color: white;
	    z-index:1002;
	    overflow: auto;
	}
	
	</style>
</head>
<body onload="openMap()" >
	<P>  The time on the server is ${serverTime}. </P>
	
	<div id = "map"></div>
	<div id="mouse-position"></div>
	<br/><br/>
	<div id="chartDiv"></div>
	<br/>
	<div id="timeDiv"></div>
	
	<!-- Modal -->
	<div id="light" class="white_content">
		ID : <span id="span_pointId"></span><br/>
		COUNTRY_NAME : <span id="span_pointName"></span><br/>
		COUNTRY_VALUE : <span id="span_pointValue"></span><br/>
		<a href = "javascript:void(0)" onclick = "document.getElementById('light').style.display='none';document.getElementById('fade').style.display='none'">닫기</a>
	</div>
    <div id="fade" class="black_overlay"></div>
</body>
</html>
