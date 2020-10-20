/**
 * 전재현
 * 2020-10-13
 * 공통차트 테스트
 */

am4core.ready(function() {
	am4core.addLicense("CH237726473");

	am4core.useTheme(am4themes_animated);
	am4core.useTheme(am4themes_spiritedaway);

	var chart = am4core.create("chartDiv", am4charts.XYChart);
	
	chart.data = getChartData();
	
	//가로
	var cateAxis = chart.xAxes.push(new am4charts.CategoryAxis());
	cateAxis.dataFields.category = "country_name";
	cateAxis.renderer.grid.template.location = 0;
	cateAxis.renderer.minGridDistance = 50;
	cateAxis.tooltip.disabled = true;
	
	//세로
	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
	valueAxis.renderer.minGridDistance = 30;
	valueAxis.cursorTooltipEnabled = false;

	//차트 막대 모양 결정
	var oneSeries = chart.series.push(new am4charts.ColumnSeries());
	oneSeries.sequencedInterpolation = true;
    oneSeries.dataFields.valueY = "country_val";
	oneSeries.dataFields.categoryX = "country_name";
	oneSeries.tooltipText = "[{categoryX}: bold]{valueY}[/]";
	oneSeries.columns.template.strokeWidth = 0;
	oneSeries.yAxis = valueAxis;
	oneSeries.tooltip.pointerOrientation = "vertical";
	
	oneSeries.columns.template.column.cornerRadiusTopLeft = 10;
	oneSeries.columns.template.column.cornerRadiusTopRight = 10;
	oneSeries.columns.template.column.fillOpacity = 0.8;
	
	//색상 그라데이션
	oneSeries.columns.template.adapter.add("fill", function(fill, target) {
	  return chart.colors.getIndex(target.dataItem.index);
	})

	//범례 (범례는 그라데이션으로 표시가 안됨?)
	chart.legend = new am4charts.Legend();
	chart.legend.position = "bottom";
	
	/*var valueBullet = erateSeries.bullets.push(new am4charts.CircleBullet());
	valueBullet.circle.fill = am4core.color("#fff");
	valueBullet.circle.strokeWidth = 2;*/
	
	chart.cursor = new am4charts.XYCursor();
	chart.cursor.behavior = "panX";
	
	//차트 스크롤바 생성
	chart.scrollbarX = new am4core.Scrollbar();
	chart.scrollbarY = new am4core.Scrollbar();
});